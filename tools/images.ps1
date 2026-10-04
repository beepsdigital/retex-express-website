# Generates every image in src/assets/img from source-assets/.
# Run from the project root:  powershell -ExecutionPolicy Bypass -File tools\images.ps1
# Requires Windows PowerShell 5.1+ (uses GDI+ via System.Drawing). No other dependencies.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "source-assets"
$out = Join-Path $root "src\assets\img"
New-Item -ItemType Directory -Force $out | Out-Null

Add-Type -TypeDefinition (Get-Content (Join-Path $PSScriptRoot "ImgTools.cs") -Raw) -ReferencedAssemblies System.Drawing
Add-Type -AssemblyName System.Drawing

$BrandBlue = [System.Drawing.Color]::FromArgb(42, 27, 232)
$BrandPink = [System.Drawing.Color]::FromArgb(243, 26, 90)
$Navy      = [System.Drawing.Color]::FromArgb(15, 20, 70)
$White     = [System.Drawing.Color]::White

function Save-Jpg($bmp, $name, $q) { $flat = [ImgTools]::Flatten($bmp, $White); [ImgTools]::SaveJpg($flat, (Join-Path $out $name), [long]$q); $flat.Dispose(); Write-Host ("  {0}  {1}x{2}" -f $name, $bmp.Width, $bmp.Height) }
function Save-Png($bmp, $name) { [ImgTools]::SavePng($bmp, (Join-Path $out $name)); Write-Host ("  {0}  {1}x{2}" -f $name, $bmp.Width, $bmp.Height) }

# ---------- Logo ----------
Write-Host "Logo"
$logoSrc = [ImgTools]::Load((Join-Path $src "logo-original.jpg"))
$b = [ImgTools]::ContentBounds($logoSrc, 235)
$pad = 20
$logoCrop = [ImgTools]::Crop($logoSrc, $b.X - $pad, $b.Y - $pad, $b.Width + 2 * $pad, $b.Height + 2 * $pad)
$ratio = $logoCrop.Height / $logoCrop.Width
$logo480 = [ImgTools]::Resize($logoCrop, 480, [int][Math]::Round(480 * $ratio))   # opaque, white background
$logo960 = [ImgTools]::Resize($logoCrop, 960, [int][Math]::Round(960 * $ratio))
Save-Png ([ImgTools]::WhiteToAlpha($logo480, 200, 250)) "logo.png"
Save-Png ([ImgTools]::WhiteToAlpha($logo960, 200, 250)) "logo-2x.png"
Save-Png ([ImgTools]::ToMono($logo480, 255, 255, 255, 1.25)) "logo-white.png"

# ---------- Flyer crops ----------
Write-Host "Flyer crops"
$fl = [ImgTools]::Load((Join-Path $src "flyer-original.png"))
Save-Jpg ([ImgTools]::Crop($fl, 0, 585, 1024, 255)) "hero-band.jpg" 86
Save-Jpg ([ImgTools]::Crop($fl, 580, 195, 444, 230)) "plane.jpg" 84
Save-Jpg ([ImgTools]::Crop($fl, 40, 670, 300, 170)) "boxes.jpg" 84
Save-Jpg ([ImgTools]::Crop($fl, 720, 590, 304, 258)) "ship.jpg" 84
Save-Jpg ([ImgTools]::Crop($fl, 300, 600, 460, 245)) "truck.jpg" 84
Save-Jpg ([ImgTools]::Crop($fl, 560, 420, 464, 180)) "world-map.jpg" 84
Save-Jpg $fl "flyer.jpg" 78
Save-Jpg ([ImgTools]::Resize($fl, 480, 720)) "flyer-480.jpg" 80

# ---------- Open Graph image 1200x630 ----------
Write-Host "Open Graph"
$og = [ImgTools]::Canvas(1200, 630, $White)
$g = [System.Drawing.Graphics]::FromImage($og)
$g.SmoothingMode = "HighQuality"; $g.InterpolationMode = "HighQualityBicubic"; $g.TextRenderingHint = "AntiAliasGridFit"
$band = [ImgTools]::Crop($fl, 0, 585, 1024, 255)
$bandH = [int](1200 * 255 / 1024)
$g.DrawImage($band, 0, 630 - $bandH, 1200, $bandH)
# Top area is 630 - bandH (~331px): logo 420px wide (~185px tall) + two text lines must fit above the band.
$logoW = 420; $logoH = [int]($logoW * $ratio)
$logoT = [ImgTools]::WhiteToAlpha($logo960, 200, 250)
$logoTop = 34
$g.DrawImage($logoT, [int]((1200 - $logoW) / 2), $logoTop, $logoW, $logoH)
$fontA = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Bold)
$fontB = New-Object System.Drawing.Font("Segoe UI", 17, [System.Drawing.FontStyle]::Regular)
$fmt = New-Object System.Drawing.StringFormat; $fmt.Alignment = "Center"
$navyBrush = New-Object System.Drawing.SolidBrush($Navy)
$slateBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(71, 84, 103))
$yA = [float]($logoTop + $logoH + 4); $yB = [float]($logoTop + $logoH + 50)
$rectA = [System.Drawing.RectangleF]::new([float]0, $yA, [float]1200, [float]50)
$rectB = [System.Drawing.RectangleF]::new([float]0, $yB, [float]1200, [float]40)
$g.DrawString("Courier  |  Cargo  |  Logistics", $fontA, $navyBrush, $rectA, $fmt)
$g.DrawString("Riyadh to the GCC, Jordan, Egypt, China and worldwide  -  door to door", $fontB, $slateBrush, $rectB, $fmt)
$barY = 630 - $bandH - 8
$g.FillRectangle((New-Object System.Drawing.SolidBrush($BrandBlue)), 0, $barY, 600, 8)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($BrandPink)), 600, $barY, 600, 8)
$g.Dispose()
Save-Jpg $og "og-image.jpg" 86

# ---------- Icons ----------
Write-Host "Icons"
function New-Mark($size) {
  $bmp = [ImgTools]::Canvas($size, $size, [System.Drawing.Color]::Transparent)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "HighQuality"; $g.TextRenderingHint = "AntiAliasGridFit"
  $radius = [int]($size * 0.22)
  $full = [System.Drawing.Rectangle]::new(0, 0, $size, $size)
  $path = [ImgTools]::RoundedRect($full, $radius)
  $g.FillPath((New-Object System.Drawing.SolidBrush($BrandBlue)), $path)
  # pink corner accent (echoes the "Ex" in the wordmark)
  $ax = [int]($size * 0.62); $aw = [int]($size * 0.5); $ar = [int]($size * 0.12)
  $accentRect = [System.Drawing.Rectangle]::new($ax, $ax, $aw, $aw)
  $accent = [ImgTools]::RoundedRect($accentRect, $ar)
  $g.SetClip($path)
  $g.FillPath((New-Object System.Drawing.SolidBrush($BrandPink)), $accent)
  $g.ResetClip()
  $fontSize = [float]($size * 0.5)
  $font = [System.Drawing.Font]::new("Arial Black", $fontSize, ([System.Drawing.FontStyle]::Bold -bor [System.Drawing.FontStyle]::Italic), [System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat; $fmt.Alignment = "Center"; $fmt.LineAlignment = "Center"
  $textRect = [System.Drawing.RectangleF]::new([float]($size * 0.02), [float]0, [float]$size, [float]$size)
  $g.DrawString("R", $font, [System.Drawing.Brushes]::White, $textRect, $fmt)
  $g.Dispose()
  return $bmp
}
Save-Png (New-Mark 512) "icon-512.png"
Save-Png ([ImgTools]::Resize((New-Mark 512), 192, 192)) "icon-192.png"
Save-Png ([ImgTools]::Resize((New-Mark 512), 180, 180)) "apple-touch-icon.png"
Save-Png ([ImgTools]::Resize((New-Mark 512), 32, 32)) "favicon-32.png"
Save-Png ([ImgTools]::Resize((New-Mark 512), 16, 16)) "favicon-16.png"
Write-Host "Done."
