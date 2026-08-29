#!/usr/bin/env python3
"""Bundle the ES-module sources into a single classic script (js/app.js)
so the game also runs from file:// without a server."""
import re, os

HERE = os.path.dirname(os.path.abspath(__file__))
order = ['sprites.js', 'font.js', 'audio.js', 'game.js', 'main.js']
out = ['// Bundled from module sources by build.py — do not edit.',
       '// (Generated so the game also runs from file:// without a server.)']
for f in order:
    src = open(os.path.join(HERE, f)).read()
    src = re.sub(r'^import .*?;\s*$', '', src, flags=re.M)
    src = re.sub(r'^export (const|class|function|let) ', r'\1 ', src, flags=re.M)
    src = re.sub(r'^export \{.*?\};\s*$', '', src, flags=re.M)
    out.append(f'// ---- {f} ----')
    out.append(src)
open(os.path.join(HERE, 'app.js'), 'w').write('\n'.join(out))
print('wrote app.js')
