#!/usr/bin/env python3
"""Detect sprite blobs in hatari screenshots of the playfield."""
from PIL import Image
import numpy as np
from scipy import ndimage
import sys, glob

# playfield interior (inside black border): approx x 114..636, y 32..394
PF = (114, 32, 636, 394)

def blobs(path, minpix=6, region=PF):
    im = np.array(Image.open(path).convert('L').crop(region))
    dark = im < 128
    lab, n = ndimage.label(dark)
    out = []
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < minpix:
            continue
        w = xs.max() - xs.min() + 1
        h = ys.max() - ys.min() + 1
        out.append({
            'x': int(xs.mean()) + region[0], 'y': int(ys.mean()) + region[1],
            'w': int(w), 'h': int(h), 'pix': int(len(ys)),
            'x0': int(xs.min()) + region[0], 'y0': int(ys.min()) + region[1],
            'x1': int(xs.max()) + region[0], 'y1': int(ys.max()) + region[1],
        })
    out.sort(key=lambda b: (b['y'], b['x']))
    return out

if __name__ == '__main__':
    files = sys.argv[1:] or sorted(glob.glob('/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots/grab*.png'))[-8:]
    for f in files:
        print(f.split('/')[-1])
        for b in blobs(f):
            print(f"  ({b['x']},{b['y']}) {b['w']}x{b['h']} pix={b['pix']}")
