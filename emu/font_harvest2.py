#!/usr/bin/env python3
"""Final font harvest from identified lines in specific screenshots."""
from PIL import Image
import numpy as np
import json

SHOTS = '/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots'
OUT = '/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/font'
import os
os.makedirs(OUT, exist_ok=True)

font = {}

def cell(img, cx, cy):
    px = img[cy:cy+16, cx:cx+8] < 100
    return [int(''.join('1' if px[r, b] else '0' for b in range(8)), 2) for r in range(16)]

def harvest(img, text, band_top, x_left=120):
    cy = band_top - 3
    for i, ch in enumerate(text):
        if ch == ' ' or ch in font:
            continue
        font[ch] = cell(img, x_left + 8*i, cy)

img37 = np.array(Image.open(f'{SHOTS}/grab0037.png').convert('L'))
img38 = np.array(Image.open(f'{SHOTS}/grab0038.png').convert('L'))
img11 = np.array(Image.open(f'{SHOTS}/grab0011.png').convert('L'))

# grab0037 lines (band tops measured)
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

# grab0038 lines
harvest(img38, 'Falls Sie einen Kampf beenden wollen, drücken Sie <R>.', 96)
harvest(img38, 'Jeweils nach 300 Punkten bekommen Sie einen neuen', 145)
harvest(img38, 'Super Bouble Blaster.', 161)

# menu lines (grab0011): bands at 96,144,192,208
harvest(img11, 'Drücken Sie:', 96)
harvest(img11, '<P> um normal zu spielen,', 144)
harvest(img11, '<M> um mit MG zu spielen,', 192)
harvest(img11, '<Q> um aufzuhören.', 208)

# sidebar labels (from intro screenshots): Ships: y~60, Level: y~282, Score: y~346 (x=24)
# use img37 sidebar
for label, ytop in (('Ships:', 56), ('Level:', 278), ('Score:', 342)):
    harvest(img37, label, ytop, x_left=24)

# digits from Score "000000" at sidebar y~357..372? Actually digits are custom sprites; also harvest 0 from "300"
# '0' from "300" in img38 line at 145: "Jeweils nach 300 ..." — covered by harvest above.

# First line of intro (grab0002): "Bouncing Boubles für den ATARI-ST Computer (S/W Monitor)" at y~100? measure: earlier crop showed it ~y97-110
img02 = np.array(Image.open(f'{SHOTS}/grab0002.png').convert('L'))
harvest(img02, 'Bouncing Boubles für den ATARI-ST Computer (S/W Monitor)', 97)
# "C: 1987 Paul Bininda" in grab0002 at y~152?
harvest(img02, 'C: 1987 Paul Bininda', 149)

print(len(font), 'glyphs:', ''.join(sorted(font.keys())))
json.dump(font, open(f'{OUT}/font.json', 'w'))

# Render check grid
chars = sorted(font.keys())
per = 8
for start in range(0, len(chars), per):
    grp = chars[start:start+per]
    print(' | '.join(f'   {c}   ' for c in grp))
    for r in range(16):
        print(' | '.join(''.join('#' if font[c][r] & (0x80>>b) else '.' for b in range(8)) for c in grp))
