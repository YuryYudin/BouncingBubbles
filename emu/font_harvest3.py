#!/usr/bin/env python3
"""Final font harvest — correct bands, plus bold title glyphs."""
from PIL import Image
import numpy as np
import json, os

SHOTS = '/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots'
OUT = '/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/font'
os.makedirs(OUT, exist_ok=True)
font = {}

def load(f):
    return np.array(Image.open(f'{SHOTS}/{f}.png').convert('L'))

def cell(img, cx, cy, imgf=None):
    src = imgf(img) if imgf else (img[cy:cy+16, cx:cx+8] < 100)
    return [int(''.join('1' if src[r, b] else '0' for b in range(8)), 2) for r in range(16)]

def harvest(img, text, band_top, x_left=120, imgf=None):
    cy = band_top - 3
    for i, ch in enumerate(text):
        if ch == ' ' or ch in font: continue
        font[ch] = cell(img, x_left + 8*i, cy, imgf)

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
# sidebar labels
harvest(img37, 'Ships:', 53, x_left=24)
harvest(img37, 'Level:', 276, x_left=24)
harvest(img37, 'Score:', 340, x_left=24)

# Title: bold glyphs on 50% dither. Filter: solid = pixel dark AND >=3 of 2x2 neighborhood dark.
img34 = load('grab0034')
d = (img34 < 100).astype(np.uint8)
solid = np.zeros_like(d)
s = d[:-1,:-1]+d[:-1,1:]+d[1:,:-1]+d[1:,1:]
solid[:-1,:-1] = (d[:-1,:-1] & (s >= 3))
# title text row: find title band in top 30 rows; title "* BOUNCING BOUBLES *" centered ~x150-490, rows ~6..22
def harvest_solid(text, band_top, x_left):
    cy = band_top - 3
    for i, ch in enumerate(text):
        if ch == ' ' or ch in font: continue
        src = solid[cy:cy+16, x_left+8*i:x_left+8*i+8]
        font[ch] = [int(''.join('1' if src[r, b] else '0' for b in range(8)), 2) for r in range(16)]

# find title band rows
reg = solid[0:30, 100:560]
rows = reg.sum(axis=1)
print('title solid rows:', [(i, int(v)) for i, v in enumerate(rows) if v])
cols = reg.sum(axis=0)
nz = np.nonzero(cols)[0]
print('title cols x', 100+nz[0], '-', 100+nz[-1], 'width', nz[-1]-nz[0]+1, 'chars', (nz[-1]-nz[0]+1)/8)
