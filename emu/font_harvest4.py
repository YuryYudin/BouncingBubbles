#!/usr/bin/env python3
"""Final harvest: system font + title glyphs + save."""
from PIL import Image
import numpy as np
import json, os
from scipy import ndimage

SHOTS = '/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots'
OUT = '/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/font'
os.makedirs(OUT, exist_ok=True)
font = {}

def load(f):
    return np.array(Image.open(f'{SHOTS}/{f}.png').convert('L'))

def cell(img, cx, cy):
    px = img[cy:cy+16, cx:cx+8] < 100
    return [int(''.join('1' if px[r, b] else '0' for b in range(8)), 2) for r in range(16)]

def harvest(img, text, band_top, x_left=120):
    cy = band_top - 3
    for i, ch in enumerate(text):
        if ch == ' ' or ch in font: continue
        font[ch] = cell(img, x_left + 8*i, cy)

img37, img11, img02 = load('grab0037'), load('grab0011'), load('grab0002')

harvest(img37, 'Bouncing Boubles wollen die Welt erobern!!!', 90)
harvest(img37, 'Setzen Sie ihren  Super Bouble Blaster ein um sich zu', 138)
harvest(img37, 'verteidigen.', 154)
harvest(img37, 'Sie können ihren Super Bouble Blaster mit dem Joystick oder', 186)
harvest(img37, 'mit folgenden Tasten bewegen:', 202)
harvest(img37, ' <-----  <a>  oder <ö>                <s> oder <ä>  -----> ', 234)
harvest(img37, 'Sie können Hyper Bouble Blasting Bursts abschießen, indem', 266)
harvest(img37, 'Sie entweder den Feuerknopf des Joysticks oder die', 282)
harvest(img37, 'Leertaste drücken.', 298)
harvest(img37, 'Falls Sie eine Pause brauchen, drücken Sie die <ESC> Taste.', 346)
harvest(img11, 'Falls Sie einen Kampf beenden wollen, drücken Sie <R>.', 76)
harvest(img11, 'Jeweils nach 300 Punkten bekommen Sie einen neuen', 124)
harvest(img11, 'Super Bouble Blaster.', 140)
harvest(img11, 'Drücken Sie:', 236)
harvest(img11, '<P> um normal zu spielen,', 268)
harvest(img11, '<M> um mit MG zu spielen,', 300)
harvest(img11, '<Q> um aufzuhören.', 332)
harvest(img02, 'Bouncing Boubles für den ATARI-ST Computer (S/W Monitor)', 91)
harvest(img02, 'C: 1987 Paul Bininda', 139)
harvest(img37, 'Ships:', 53, x_left=24)
harvest(img37, 'Level:', 276, x_left=24)
harvest(img37, 'Score:', 340, x_left=24)

missing = [c for c in set('!(),-./013789:<>ABCDEFGHIJKLMPQRSTWabcdefghiklmnoprstuvwyzßäöü') if c not in font]
print('missing:', missing)

# ---- title glyphs (solid filter) ----
img41 = load('grab0041')
d = (img41 < 100).astype(np.uint8)
s = d[:-1,:-1]+d[:-1,1:]+d[1:,:-1]+d[1:,1:]
solid = np.zeros_like(d)
solid[:-1,:-1] = d[:-1,:-1] & (s >= 3)
solid[0,:] = solid[-1,:] = 0
lab, n = ndimage.label(solid[0:48, :])
glyphs = []
for i in range(1, n+1):
    ys, xs = np.where(lab == i)
    if len(ys) < 150: continue
    if ys.min() > 45: continue
    glyphs.append((int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())))
glyphs.sort()
print(len(glyphs), 'title glyph blobs:')
for g in glyphs: print('  x', g[0], '-', g[1], 'y', g[2], '-', g[3])

TITLE = '*BOUNCINGBOUBLES*'
title = []
if len(glyphs) == len(TITLE):
    for ch, (x0, x1, y0, y1) in zip(TITLE, glyphs):
        bm = solid[y0:y1+1, x0:x1+1]
        title.append({'ch': ch, 'x': x0, 'y': y0, 'w': int(x1-x0+1), 'h': int(y1-y0+1),
                      'rows': [''.join('#' if v else '.' for v in row) for row in bm]})
    json.dump(title, open(f'{OUT}/title.json', 'w'), indent=0)
    print('title saved,', len(title), 'glyphs')
else:
    print('TITLE MISMATCH: expected', len(TITLE))

json.dump(font, open(f'{OUT}/font.json', 'w'))
print(len(font), 'font glyphs saved')

# render check for previously-broken glyphs
for c in 'ADG089':
    if c in font:
        print(f'--- {c}')
        for r in range(16):
            print(''.join('#' if font[c][r] & (0x80>>b) else '.' for b in range(8)))
