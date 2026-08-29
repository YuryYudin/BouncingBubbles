#!/usr/bin/env python3
"""Generate js/sprites.js and js/font.js from extracted research data."""
import json, os

FONT = '/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/font'
OUT = '/Users/jjb/Work/OpenCode/BouncingBoubles/webapp/js'
os.makedirs(OUT, exist_ok=True)

sprites = json.load(open(f'{FONT}/sprites.json'))
font = json.load(open(f'{FONT}/font.json'))
title = json.load(open(f'{FONT}/title.json'))

# ---- sprites.js ----
lines = []
lines.append('// Auto-generated from the original BOUNCE.PRG (memory extraction). Do not edit.')
lines.append('export const SPRITES = {')
for name, s in sprites.items():
    if name == 'debris_raw':
        lines.append(f'  debrisRaw: "{s}",')
        continue
    if name == 'digit_ptrs':
        continue
    if name == 'digits':
        lines.append('  digits: [')
        for d in s:
            lines.append(f'    {{ w: {d["w"]}, h: {d["h"]}, bits: {json.dumps(d["bits"])} }},')
        lines.append('  ],')
        continue
    if name == 'death':
        lines.append('  death: [')
        for d in s:
            lines.append(f'    {{ w: {d["w"]}, h: {d["h"]}, bits: {json.dumps(d["bits"])} }},')
        lines.append('  ],')
        continue
    lines.append(f'  {name}: {{ w: {s["w"]}, h: {s["h"]}, bits: {json.dumps(s["bits"])} }},')
lines.append('};')
open(f'{OUT}/sprites.js', 'w').write('\n'.join(lines) + '\n')

# ---- font.js ----
flines = []
flines.append('// Auto-generated TOS 8x16 system font (harvested from original screenshots). Do not edit.')
flines.append('export const FONT = {')
for ch in sorted(font.keys()):
    key = ch
    if ch == '\\': key = '\\\\'
    if ch == '"': key = '\\"'
    flines.append(f'  "{key}": {json.dumps(font[ch])},')
flines.append('};')
# title glyphs
flines.append('')
flines.append('// Title logo glyphs (custom big font), positioned absolutely.')
flines.append('export const TITLE = [')
for g in title:
    # encode rows as arrays of bit-strings -> hex per row
    enc = [int(r.replace('.', '0').replace('#', '1'), 2) for r in g['rows']]
    flines.append(f'  {{ ch: {json.dumps(g["ch"])}, x: {g["x"]}, y: {g["y"]}, w: {len(g["rows"][0])}, h: {len(g["rows"])}, bits: {json.dumps(enc)} }},')
flines.append('];')
open(f'{OUT}/font.js', 'w').write('\n'.join(flines) + '\n')
print('generated sprites.js and font.js in', OUT)
print('sprites:', [k for k in sprites.keys()])
print('font glyphs:', len(font), 'title glyphs:', len(title))
