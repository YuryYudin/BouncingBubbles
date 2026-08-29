#!/usr/bin/env python3
"""Burst-capture screenshots from hatari."""
import sys, time
sys.path.insert(0, '/Users/jjb/Work/OpenCode/BouncingBoubles/emu')
from hclient import Hatari
import glob, os

def burst(n, interval=0.5, prefix='b'):
    h = Hatari(6400)
    h.connect()
    # find next index
    existing = glob.glob('/Users/jjb/Work/OpenCode/BouncingBoubles/emu/shots/grab*.png')
    start = max([int(os.path.basename(f)[4:8]) for f in existing] + [0]) + 1
    for i in range(n):
        h.screenshot()
        time.sleep(0.4)
        time.sleep(interval)
    print('saved', start, 'to', start + n - 1)

if __name__ == '__main__':
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    interval = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5
    burst(n, interval)
