# Bouncing Boubles (web)

A faithful browser re-creation of the 1987 Atari ST shoot 'em up
**Bouncing Boubles** by Paul Bininda (public domain / freeware).

The original was reverse-engineered end-to-end to build this: the published
disk image (`BOUNCE.PRG`, compiled GFA-Basic, ST-High 640×400 monochrome) was
disassembled, run in the Hatari emulator, and its sprites, font, screen layout,
sound-register usage and level tables were extracted from the binary and from
emulator memory dumps.

## Run

Any static file server works:

```
cd webapp
python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no dependencies.

## Controls (identical to the original, plus conveniences)

| Action | Original | Also |
|---|---|---|
| Left  | `A` or `Ö` | `←`, touch/mouse drag |
| Right | `S` or `Ä` | `→`, touch/mouse drag |
| Fire  | `Space` | `Enter`, tap |
| Pause | `ESC` (any key resumes) | — |
| End fight, back to menu | `R` | — |
| Menu  | `P` = normal, `M` = machine gun, `Q` = quit | — |

## Faithfulness notes

- 50 Hz fixed-timestep game loop (PAL VBI), 640×400 1-bit framebuffer with
  integer upscaling and crisp pixels.
- Original sprite bitmaps (ship, balls, big balls, birds, crabs, bombs,
  darts, 11-frame explosion, custom score digits, title logo) extracted from
  the running game's memory.
- TOS 8×16 system font harvested glyph-by-glyph for the German intro text and
  HUD; original German intro text extracted from the binary.
- Exact physics: fixed-point ball integration (gravity 25/frame, wall bounce
  at x=112/575, floor at y=373 with −160 energy loss per bounce), bullet speed
  7 px/frame, player speed 4 px/frame, bird homing with 800-unit speed cap.
- Level table reproduced exactly (L0-4 balls, L5-9 big balls that drop minis,
  L10-14 bird formations, L15/16 crab groups, L17+ mixing formula incl. the
  `adj = L − ((40−L) mod 3)` rule, crab groups above adjusted level 20/30).
- Scoring: 5/10/50 pts by type; extra ship every 300 points (as in the code —
  the intro text's "300 Punkte" matches), lives cap 20, 5 ships to start.
- Death: pixel-overlap collision, 400-frame freeze with debris then "Game
  Over", same-level retry while lives remain.
- Sound: YM-2149 modelled at the register level — per-frame volume/period
  writes with the original envelope formulas (warbling channel-A shot zap,
  channel-B bounce thuds at the boot-table period, channel-C explosion
  decays), plus the boot rumble.

## Layout of this repo

- `webapp/` — the game (index.html, css/, js/).
- `emu/` — research tooling: Hatari control bridge, memory/binary extractors,
  font/sprite harvesters, patched reference PRGs (`BLxx.PRG` = forced start
  level for observation).
- `research/` — downloaded disk images, extracted files, disassembly notes.
- `test/` — Playwright end-to-end tests and comparison screenshots.

## License

The original code in this repository (the web app, the tooling, the tests) is
released under the [MIT License](LICENSE).

The included original game binary (`BOUNCE.PRG`) and its documentation are
redistributed under their author's own release terms: *Bouncing Boubles* by
Paul Bininda, 1987, declared a **Public Domain release** by the author (see
`research/floppy3525_out/BOUNCE/BOUNCE.TXT`) and distributed as
freeware/PD across the Atari ST library scene. All rights with respect to
that binary remain with its author.
