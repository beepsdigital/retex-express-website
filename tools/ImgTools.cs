using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Runtime.InteropServices;

// Small GDI+ helper used by tools/images.ps1 (compiled at runtime with Add-Type).
// Keeps the asset pipeline dependency-free on Windows.
public static class ImgTools {
  public static Bitmap Load(string path) { using (var img = Image.FromFile(path)) { return new Bitmap(img); } }

  static byte[] GetBytes(Bitmap bmp, out int stride) {
    var data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    stride = data.Stride; var buf = new byte[stride * bmp.Height]; Marshal.Copy(data.Scan0, buf, 0, buf.Length); bmp.UnlockBits(data); return buf;
  }
  static Bitmap FromBytes(byte[] buf, int w, int h, int stride) {
    var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    var data = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
    Marshal.Copy(buf, 0, data.Scan0, buf.Length); b.UnlockBits(data); return b;
  }

  // Bounding box of pixels whose darkest channel is below `threshold` (i.e. not near-white).
  public static Rectangle ContentBounds(Bitmap bmp, int threshold) {
    int w = bmp.Width, h = bmp.Height, stride; var buf = GetBytes(bmp, out stride); int minX = w, minY = h, maxX = -1, maxY = -1;
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      int i = y * stride + x * 4; int mn = Math.Min(buf[i], Math.Min(buf[i + 1], buf[i + 2]));
      if (mn < threshold) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
    if (maxX < 0) return new Rectangle(0, 0, w, h); return new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
  }

  public static Bitmap Crop(Bitmap src, int x, int y, int w, int h) {
    var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(b)) { g.DrawImage(src, new Rectangle(0, 0, w, h), new Rectangle(x, y, w, h), GraphicsUnit.Pixel); }
    return b;
  }

  public static Bitmap Resize(Bitmap src, int w, int h) {
    var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(b)) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic; g.SmoothingMode = SmoothingMode.HighQuality;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality; g.CompositingQuality = CompositingQuality.HighQuality;
      using (var ia = new ImageAttributes()) { ia.SetWrapMode(WrapMode.TileFlipXY); g.DrawImage(src, new Rectangle(0, 0, w, h), 0, 0, src.Width, src.Height, GraphicsUnit.Pixel, ia); }
    }
    return b;
  }

  // Turns near-white pixels transparent with a soft edge between `lo` and `hi` (darkest-channel values).
  public static Bitmap WhiteToAlpha(Bitmap src, int lo, int hi) {
    int w = src.Width, h = src.Height, stride; var buf = GetBytes(src, out stride);
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      int i = y * stride + x * 4; int mn = Math.Min(buf[i], Math.Min(buf[i + 1], buf[i + 2]));
      int a = mn <= lo ? 255 : (mn >= hi ? 0 : (int)(255.0 * (hi - mn) / (hi - lo))); buf[i + 3] = (byte)a;
    }
    return FromBytes(buf, w, h, stride);
  }

  // Single-colour silhouette (e.g. white logo for dark footers); alpha derived from darkness.
  public static Bitmap ToMono(Bitmap src, int r, int g, int b, double gain) {
    int w = src.Width, h = src.Height, stride; var buf = GetBytes(src, out stride);
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      int i = y * stride + x * 4; int mn = Math.Min(buf[i], Math.Min(buf[i + 1], buf[i + 2]));
      int a = (int)Math.Min(255, (255 - mn) * gain); buf[i] = (byte)b; buf[i + 1] = (byte)g; buf[i + 2] = (byte)r; buf[i + 3] = (byte)a;
    }
    return FromBytes(buf, w, h, stride);
  }

  public static Bitmap Flatten(Bitmap src, Color bg) {
    var b = new Bitmap(src.Width, src.Height, PixelFormat.Format24bppRgb);
    using (var g = Graphics.FromImage(b)) { g.Clear(bg); g.DrawImage(src, 0, 0); }
    return b;
  }

  public static Bitmap Canvas(int w, int h, Color bg) {
    var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(b)) { g.Clear(bg); }
    return b;
  }

  public static GraphicsPath RoundedRect(Rectangle r, int radius) {
    var p = new GraphicsPath(); int d = radius * 2;
    p.AddArc(r.X, r.Y, d, d, 180, 90); p.AddArc(r.Right - d, r.Y, d, d, 270, 90);
    p.AddArc(r.Right - d, r.Bottom - d, d, d, 0, 90); p.AddArc(r.X, r.Bottom - d, d, d, 90, 90); p.CloseFigure(); return p;
  }

  public static void SavePng(Bitmap b, string path) { b.Save(path, ImageFormat.Png); }
  public static void SaveJpg(Bitmap b, string path, long q) {
    ImageCodecInfo codec = null; foreach (var c in ImageCodecInfo.GetImageEncoders()) if (c.MimeType == "image/jpeg") codec = c;
    var p = new EncoderParameters(1); p.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, q); b.Save(path, codec, p);
  }
}
