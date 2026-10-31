"""Lift the paper texture and lighting out of the logo so it can be multiplied onto the page.

Fits a smooth surface to the paper-coloured pixels and divides it out: paper becomes white,
every mark of the logo keeps its colour. Output: src/assets/logo-blend.png (original untouched).
Run: python3 scripts/flatten-logo.py
"""
import numpy as np
from PIL import Image, ImageFilter

src = 'src/assets/logo.png'
im = np.asarray(Image.open(src).convert('RGB')).astype(float)
H, W, _ = im.shape
yy, xx = np.mgrid[0:H, 0:W]
R, G, B = im[..., 0], im[..., 1], im[..., 2]
with np.errstate(divide='ignore', invalid='ignore'):
    sel = (R > 175) & (R < 248) & (G / R > 0.85) & (G / R < 0.96) & (B / R > 0.70) & (B / R < 0.88)
sel &= ~(((xx - 372) ** 2 + (yy - 127) ** 2) < 85 ** 2)  # leave the cream globe disc out of the fit
sel = np.asarray(Image.fromarray((sel * 255).astype('uint8')).filter(ImageFilter.MinFilter(9))) > 0

def terms(x, y):
    return np.stack([np.ones_like(x), x, y, x * x, x * y, y * y, x ** 3, y ** 3, x * x * y, x * y * y], -1)

A = terms(xx[sel] / W, yy[sel] / H)
Af = terms(xx / W, yy / H)
bg = np.zeros_like(im)
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, im[..., c][sel], rcond=None)
    bg[..., c] = Af @ coef
Image.fromarray(np.clip(im / bg * 255, 0, 255).astype('uint8')).save('src/assets/logo-blend.png')
