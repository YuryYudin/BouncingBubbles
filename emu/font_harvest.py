#!/usr/bin/env python3
"""Harvest TOS 8x16 font glyphs from hatari screenshots of Bouncing Boubles."""
from PIL import Image
import numpy as np
import json, os, glob

SHOTS = '/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots'
OUT = '/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/font'

os.makedirs(OUT, exist_ok=True)

def gray(path):
    return np.array(Image.open(path).convert('L'))

def cell(img, cx, cy):
    """Extract 8x16 cell at char col cx, row cy (y = top of cell). Returns 16 bytes."""
    px = img[cy:cy+16, cx:cx+8] < 100
    rows = []
    for r in range(16):
        v = 0
        for b in range(8):
            if px[r, b]: v |= (0x80 >> b)
        rows.append(v)
    return rows

def band_rows(img, x0, x1, y0, y1, minpix=3):
    reg = img[y0:y1, x0:x1] < 100
    dark = reg.sum(axis=1)
    rows = dark > minpix
    out = []
    r = 0
    while r < len(rows):
        if rows[r]:
            s = r
            while r < len(rows) and rows[r]: r += 1
            out.append((s + y0, r + y0))
        else: r += 1
    return out

font = {}  # char -> 16 bytes

def harvest_string(img, text, x_left, band_top, band_bot):
    """Harvest glyphs for text drawn at x_left, with dark rows band_top..band_bot."""
    # determine cell top: glyph body within cell; assume body top = band_top, cell top = band_top - 3
    cy = band_top - 3
    for i, ch in enumerate(text):
        if ch == ' ': continue
        if ch not in font:
            font[ch] = cell(img, x_left + 8*i, cy)

# ---- static menu screen: grab0038 ----
img = gray(f'{SHOTS}/grab0038.png')
# menu lines at x=120; bands found: (96,108) Drücken Sie:, (144,157) <P>..., (192,204) <M>..., (208,220) <Q>...
harvest_string(img, 'Drücken Sie:', 120, 96, 108)
harvest_string(img, '<P> um normal zu spielen,', 120, 144, 157)
harvest_string(img, '<M> um mit MG zu spielen,', 120, 192, 204)
harvest_string(img, '<Q> um aufzuhören.', 120, 208, 220)
# sidebar labels: "Ships:" baseline y=66 -> cell top ~ 66-13-3? try band detection on x 10..105
for label, ytop in (('Ships:', 52), ('Level:', 275), ('Score:', 339)):
    harvest_string(img, label, 24, ytop, ytop+14)
print('after menu:', len(font), sorted(font.keys()))

json.dump(font, open(f'{OUT}/font.json', 'w'))
print('saved', f'{OUT}/font.json')
