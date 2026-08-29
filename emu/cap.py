#!/usr/bin/env python3
"""Capture timed gameplay frames and report blob positions."""
import sys, time, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hclient import Hatari
import glob

SHOTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shots')

def next_index():
    existing = glob.glob(os.path.join(SHOTS, 'grab*.png'))
    return max([int(os.path.basename(f)[4:8]) for f in existing] + [0]) + 1

def capture(n, prefix='g'):
    h = Hatari(6400)
    h.connect()
    idx = next_index()
    rows = []
    for i in range(n):
        t0 = time.time()
        h.screenshot()
        t1 = time.time()
        rows.append((idx + i, t0, t1))
    for idx, t0, t1 in rows:
        print(f"{idx} {t0:.3f} {t1:.3f}")
    return rows

if __name__ == '__main__':
    capture(int(sys.argv[1]) if len(sys.argv) > 1 else 8)
