# BOUNCING BOUBLES (Atari ST, 1987, Paul Bininda / GFA-Basic compiled) — Exact Game Logic Report

Binary: `emu/BOUNCE.PRG`, 26720 bytes. GEMDOS header: text 0x67FA, data 0x44, bss 0x77A4, **no relocation table → fully PC-relative code**, absolute longs assume text base = 0.
All addresses below are **offsets into the text segment** (file offset = addr + 0x1C). Disassembly: `/var/folders/w0/z_xy5klj75v7spdtg3ghrp0r0000gn/T/opencode/rec.asm`.

The game is written in GFA-Basic compiled to native 68k. Conventions: `A4` = global variable block in BSS (`-$xxxx(A4)` below), `A6` = local frame. Runtime helpers identified:

| Addr | Role |
|---|---|
| `$448C` | XBIOS dispatcher: fn number is last word pushed; params pushed right-to-left. Uses `trap #14`. |
| `$44A8` | GEMDOS dispatcher (`trap #1`) |
| `$44C4` | VDI call builder (`trap #2`, control array at `-$6A32(A4)`) |
| `$4224` | Long division/MOD helper: args `(dividend@+$C, divisor@+$8)`; returns quotient in D0, remainder in D1 |
| `$428A` | Multiply helper |

XBIOS functions used (verified against TOS osbind.h): `2 Physbase, 3 Logbase, 5 Setscreen, 17 Random(), 19 Ikbdws, 22 Kbdvbase, 23 Kbrate, 25 Giaccess(data,reg) [PSG!], 26 Supexec, 37 Vsync`.

---

## 1. MAIN LOOP & FRAME PACING

**Entry chain:** startup `JMP $C` → runtime init `JMP $4B3E` → main program body called at `$D02` area → game function **`$C1E`**.

### `$C1E` — game controller
```
jsr  $2D2E            ; full init: sprites, hooks, HUD, explosion sound, lives=5
-$5676 = 5            ; LIVES = 5
-$567A = 0            ; SCORE (long) = 0
outer_menu_loop ($C36):
   jsr $3844(40)      ; paint screen + HUD with LEVEL NUMBER = 40  ← the famous "40"!
   sel = jsr $13B4    ; attract/menu loop; returns scancode $10(Q)/$19(P)/$32(M) or ESC-path
   -$5676 = 5         ; lives reset
   -$567A = 0         ; score reset
   -$5E36 = 300       ; extra-life threshold = 300 points
   sel==$19(P) → MG flag -$1A = 0 ; sel==$32(M) → -$1A = 1 ; sel==$10(Q) → exit
level_loop ($C90):
   jsr $3844(level)   ; build level, clear playfield, print level number
   r = jsr $A48       ; PLAY (frame loop) – returns 1=continue, 0=game over
   mute PSG ch A/B/C; clear sound vars
   if dying-flag(-$568A)==0: level++     ; level advances only if not dead
   if r != 0 goto level_loop             ; else back to outer menu loop
exit: jsr $3B8A          ; cleanup: restore ikbdsys, Kbrate
```

### `$A48` — frame loop (one level attempt)
```
grace = 70              ; -$4(a6): frames until enemies activate
loop ($A62):
   jsr $720             ; input → move player, fire logic
   jsr $7AE             ; advance bullets (y -= 7, kill at y<50)
   key = getkey()       ; custom ikbd handler queue
   if key == $13 (R)    → quit-flag := 1
   if key == $01 (ESC)  → Giaccess(0,$88/89/$8A) mute ×3; spin getkey() until a key arrives (PAUSE)
   logbase → -$5680
   if final-death-flag: jsr $16B0        ; erase debris area
   jsr $14A2            ; erase+age bullets (old positions)
   jsr $152A            ; erase ship old position
   if grace == 0:
      jsr $15E0         ; erase enemies old positions
      jsr $1D04         ; MOVE + DRAW enemies (per-enemy function pointer)
   hit = jsr $1A2A      ; XOR-draw player ship + pixel collision test
   if hit && death-timer < 0: death-timer = 400
   if lives <= 1 && dying: final-death-flag := 1
   jsr $1880            ; draw bullets (XOR pixel columns) + bullet-vs-enemy hits
   if final-death: jsr $1E5A(death-timer)   ; debris animation
   jsr $90A             ; redraw 6-digit score (sprite digits, sidebar)
   jsr $B2              ; SOUND ENGINE (PSG envelopes, once per frame)
   if alive-count(-$5674)==0 && death-timer<0: death-timer = 200   ; level cleared → 4 s wait
   Setscreen(log, phys, -1); Setscreen(...); Vsync()    ← FRAME PACING: XBIOS 37 Vsync, 50 Hz, double buffer flip
   if death-timer == 0:                     ; only in normal state
      if !dying: return 1                   ; ← LEVEL CLEARED
      else: lives--; return (lives > 0)     ; died: replay same level, or 0 = game over
   if death-timer > 0: death-timer--
   if grace > 0: grace--
until quit-flag; return 0
```

**Frame rate: exactly 50 Hz** — one `Vsync()` per iteration (`$BA0`, `$87E`, `$142E`, …), double-buffered with two screens flipped via `Setscreen` (`$B80-$B98`).

---

## 2. PLAYER

Globals: `-$568E` = x (plain pixels), `-$568C` = y = **370** every level (`$3894`).

**Movement (`$720`)**, executed once per frame:
- RIGHT (flag `-$6958`): `x += 4`
- LEFT (flag `-$6956`): `x -= 4`
- Clamps (`$73E`,`$75A`): `x > 575 ($23F) → 575`; `x < 112 ($70) → 112`.
- **Speed: exactly ±4 px/frame (200 px/s). Range x ∈ [112, 575].**
- Start position each level/spawn: **x = 343 ($157)**, y = 370 (`$388E`).

**Ship sprite:** bank at `-$950(A4)`, 16 pre-shifted variants (index = `x AND 15`), each **72 bytes = 18 rows × 4 bytes → 32×18 px**, drawn XOR at 16-px-cell quantized position (`$1A2A`: addr = logbase + (x div 16)*2 + y*80; `$1CA0` same but OR for sidebar icons).
Death animation variants: bank `-$DD0` (same layout, selected automatically when dying-flag set).

**Death:** `$1A2A` draws ship and after each of 16 rows tests `(screen & sprite) != sprite` → overlap with any previously drawn pixel (enemies, bombs, walls…). On hit: dying-flag `-$568A := 1` and death sound programmed (ch-B vol 22, ch-C vol 20, mode 1). Death freeze = **400 frames** (death-timer `$567C`), then lives-- and restart of the *same* level (level number not incremented because dying-flag set, `$CDE`).

---

## 3. BULLETS

Array: 10 records × 14 bytes at `-$5728(A4)`: `{w x, w y, w active, l cur_screen_addr, l prev_screen_addr}`.

**Fire (`$800`)**, from input handler `$720`:
- Normal mode (menu `<P>`): fire latch `-$18` — one shot per press.
- MG mode (`<M>`, flag `-$1A`): autofire every **6th frame** while held (`$782-$78E`: counter `-$1C`, threshold 6).
- Spawn (first inactive slot, max **10 simultaneous**): `x = player_x + 8`, `y = player_y − 7 = 363`.
- Shoot sound: duration byte `-$E = 20` (frames), channel-A volume byte `-$12 = 3`, timer reset.

**Motion (`$7AE`)**: `y -= 7` → **7 px/frame upward**; deactivated when `y < 50` (playfield top edge).

**Rendering/collision (`$1880`)**: a bullet is a **single-pixel-wide vertical column, 8 rows tall**, XOR-drawn; mask bit `$80 >> (x&7)` at `logbase + y*80 + (x div 8)`. After XOR it reads back: if any row has `screen & mask != mask` (hit anything solid) → bullet removed, then:
- `jsr $16EE(bullet_x, bullet_y)` — scans all enemy records, returns the record minimizing Manhattan distance `(|ex−bx·16| + |ey−by·16|)`;
- `jsr $179A(enemy)` — kills it (see §7/§8).
Note: because collision is pixel-based, bullets also pop against the border rectangle or other bullets' pixels, killing the nearest enemy.

---

## 4. BALLS (falling enemies)

Enemy records: **44-byte stride**, array at `-$5E34(A4)`:
```
+00 w x        (fixed point: pixel = value >> 4)
+02 w y        (fixed point: pixel = value >> 4)
+04 w vx       (+06 w vy)
+08 w active
+0A w dying_flag        +0C w anim_counter      +0E w counts_toward_level_clear
+10 l move_function_ptr +14 l sprite_frame_bank +18/+1C l screen addrs (cur/prev)
+20 l formation_leader_ptr (birds)   +24/+26 w offsets   +28 w mode
+2A w SCORE VALUE
```

### Type A — plain bouncing ball (spawner `$2ED6`)
- `x₀ = (Random() MOD 449 + 117) << 4` → px ∈ [117, 565]
- `y₀ = (50 + (i*5 MOD 18)) << 4` → py ∈ [50, 67] (spawn just under the top edge)
- `vx₀ = ((10 + i MOD 15) * (1 + i MOD 3)) << 4` × sign(`Random() MOD 2` ? −1 : +1) → horizontal speed = product ÷ 16 px/frame ⇒ **0.625 .. 4.5 px/f**
- `vy₀ = 0`
- score **+2A = 5**, counts toward clear (+0E = 1), mover = `$1F14`

### Physics `$1F14` (fixed point, all values <<4):
```
if dying: vx -= vx/8; vy -= vy/8; anim_counter++; deactivate at 44;
          frames = bank -$55D0 + (anim div 4)*1024; else normal frames -$4D0
else:
   vy += 25                       ← GRAVITY per frame (≈0.098 px/frame² after >>4 twice... 
                                    effectively: dy_px/frame = vy>>8, accelerating by 25/256 px/f each frame)
   x += vx >> 4 ;  y += vy >> 4
   if x < 1792 (px 112): x = 1792; vx = -vx; bounce sound (ch-B vol 14)
   if x > 9200 (px 575): x = 9200; vx = -vx; bounce sound
   if y > 5976 (py 373):           ← FLOOR, 3 px above ship top
      vy = -vy; y += vy>>4; vy += 160   ← rebound loses energy (160 units ≈ 0.625 px/f) each bounce
      bounce sound (ch-B vol 14)
```
Balls **never leave the playfield**; they bounce forever between walls/floor until shot. They do **not** hurt the player by reaching the bottom — only by actual sprite contact (§7).

### Type B — big ball + hidden mini (spawner `$3048`, one call spawns TWO adjacent records)
- Record A: identical formulas to Type A (same random draws), score **10**, +0E=1, mover = **`$201E`**.
- Record B (dormant, active=0): score 5, mover = `$261A`.
- `$201E` = `$1F14` plus: while falling (vy>0), if `|ball_px − player_x| ≤ 18` and companion inactive → companion activated at the big ball's position with `vy = 64` (4 px/f). **The big ball drops its mini when passing near the ship column.**

### Small ball mover `$261A`:
```
y += vy ; x += vx            (direct adds; Δpx = v/16)
if y > 5976: clamp; self-destruct (+0A=1); sound ch-C vol 20
if x outside [1792, 9200]: clamp; self-destruct; sound ch-C vol 20
frames bank -$29D0; death anim -$55D0
```

---

## 5. LEVEL SYSTEM

### Level setup `$3844(level)`
Clears playfield polygon interior, gets Logbase/Physbase, `Setscreen`, `Vsync`, resets:
player x=343/y=370, dying=0, all 10 bullets, alive-counter `-$5674=0`, record-count `-$5672=0`,
bird-cycle `-$6A04=0`, **death-timer `-$567C = -1`**, then prints the **level number** (v_gtext at x=24, y=305, computed `"0"+level div 10` (blank if 0) + `"0"+level mod 10`).

### Spawner dispatch (exact):
```
level 0..4 : for i = 0 .. level+2        : SPAWN_A($2ED6)      → level+3 plain balls
level 5..9 : for i = 0 step 2 < (L-4)*2  : SPAWN_B($3048)      → (L-4) big balls (+minis)
level 10..14: for i = 0 step 2 < (L-9)*5 : SPAWN_C($3544)      → (L-9)*5 rounded up pairs... exact: ceil((L-9)*5/2) calls? 
             (loop i += 2 while i < (L-9)*5 → floor(((L-9)*5+1)/2) calls)
level 15   : CRAB_GROUP($3226, 0)
level 16   : CRAB_GROUP($3226, 0); CRAB_GROUP($3226, 9)
level ≥17  : adj = L − ((40−L) MOD 3);  if adj > 40: adj = 40
             i = 0
             while i < adj:
                if i==0:
                   if adj > 20: CRAB_GROUP($3226, 0); i += 9
                   if adj > 30: CRAB_GROUP($3226, i); i += 9
                if (i MOD 3)==0:
                   if i < adj-1 && (i MOD 6)==0 && i < adj-11:
                        3544(i); i+=2; 3544(i); i+=2; 3544(i); i+=2; 3544(i); i+=2; 3544(i); i+=2; i+=1
                   else: SPAWN_B($3048, i); i += 1
                else: SPAWN_A($2ED6, i); i += 1
```

### Per-level table (composition actually spawned):

| Lvl | Content |
|---|---|
| 0 | 3 balls |
| 1 | 4 balls |
| 2 | 5 balls |
| 3 | 6 balls |
| 4 | 7 balls |
| 5 | 1 big ball (+1 hidden mini) |
| 6 | 2 big (+2 mini) |
| 7 | 3 big |
| 8 | 4 big |
| 9 | 5 big |
| 10 | 3 bird-pairs (i=0,2,4) |
| 11 | 5 bird-pairs |
| 12 | 8 bird-pairs |
| 13 | 10 bird-pairs |
| 14 | 13 bird-pairs |
| 15 | 1 crab group (lead+wingman+7 escorts) |
| 16 | 2 crab groups (second starts at y=145) |
| 17 | adj=17−((23)%3=2)=15 → i=0,3,6,9,12: i%3==0 all; i%6==0 at 0,6,12 but need i<adj−11=4 → only i=0: bird quintuple-run (5 calls) ; i=3: big; i=9: big; i=12: big ⇒ 1 bird-chain + 3 bigs |
| 18 | adj=18−((22)%3=1)=17 → similar mix |
| 19 | adj=19−((21)%3=0)=19 |
| 20 | adj=20−((20)%3=2)=18 → i=0 crab-group (adj>20 false!) — note: 18≤20 so NO crabs |
| 21 | adj=21−((19)%3=1)=20 → still ≤20, no crabs |
| 22 | adj=22−((18)%3=0)=22 → >20: crab group at start, then pattern |
| 23 | adj=23−((17)%3=2)=21 → crab group |
| 24 | adj=24−((16)%3=1)=23 |
| 25 | adj=25−((15)%3=0)=25 → >30? no |
| 30 | adj=30−((10)%3=1)=29 |
| 31 | adj=31−((9)%3=0)=31 → >30: TWO crab groups (i=0 and i=9) |
| 37 | adj=37−((3)%3=0)=37 |
| 40 | adj=40 (also used for the MENU/attract wave) |

(For exact higher levels apply the formula; crabs appear only from adjusted level ≥ 21, second crab group from ≥ 31.)

### Enemy types by appearance:
- **Balls**: levels 0-4 exclusively, then mixed filler (every non-multiple-of-3 slot).
- **Big balls with mini**: from level 5.
- **Eye/bird aliens** (`$3544`): from level 10, in formations of up to 5 pairs (cycle counter `-$6A04 = (n+1) MOD 5`; every 5th pair becomes the formation leader; members fly at leader + offsets from table `-$6A10 = [0,176,-176,528,-528]`, `-$6A1A = [0,160,160,80,80]`).
- **Crab groups** (`$3226`): level 15/16, then adjusted-level ≥ 21 (one group) and ≥ 31 (two groups). Group = lead crab (mover `$234A`, 50 pts) + wingman 16 px right (mover `$256C`, 50 pts, mirrors leader) + 4 dormant bombs (mover `$25D0`, 10 pts) + 3 dormant aimed-shots (mover `$261A`, 5 pts).

### Level-clear condition
Global counter `-$5674` ("alive enemies that matter") decremented when an enemy with flag +0E=1 is shot (balls, big balls, birds, crab lead & wingman). Dormant escorts/bombs/minis do **not** count. When `-$5674 == 0`: **death-timer = 200 frames (~4 s) pause**, then the level ends successfully → next `level++` and `$3844(level)` again. There is no bonus for clearing.

---

## 6. ENEMY MOVEMENT (per-type movers)

All enemies draw via `$1D04`: calls `record.move_fn(record)`, then OR-blits 16 rows × 1 long from `record.frame_bank + (((x>>4)&15)*64)` at `logbase + (x>>8)*2 + ((y>>4)*40)*2` (pre-shifted glyphs, 16-px cells, **32×16 px**).

| Mover | Used by | Behaviour |
|---|---|---|
| `$1F14` | Type A ball | Gravity 25/frame, elastic walls px[112,575], floor py 373 with energy loss 160/bounce, bounce sound. Death: decel vx,vy /8, 44-frame anim from bank `-$55D0`. Frames: `-$4D0`. |
| `$201E` | Big ball | `$1F14` + releases dormant mini when within ±18 px of ship x while falling. |
| `$261A` | Small ball / crab aimed shot | Direct integration, self-destructs on walls/floor (sound ch-C vol 20). Frames: `-$29D0`. |
| `$20BE` | Eye/bird | If member(+28==1): copies leader x,y,vx,vy + own offsets (+24,+26); breaks free (+28:=2) when leader dies. Free birds home on the player: `vx ∓= 12` toward `player.x<<4`, `vy ±= 12` toward row `y=$DB0 (py 218)`; speed cap |v|>800 → v -= v/16; walls bounce (sound ch-B vol 14); **no floor**. When within **±8 px** of ship x: activates its dormant companion (a 10-pt ball) at its own position. Frames while alive: `-$19D0`; death anim 44 frames from `-$55D0`. |
| `$234A` | Crab lead | Horizontal drift **away** from the player: if `player.x > 343` and `x > $C00` → x -= 64; if `player.x < 343` and `x < $1DF0` → x += 64 (range px 192..480). Timer +24: every 10th frame, if `|(x>>4) − player.x| < 60` → drop TWO bombs from records +2/+3 at `x ∓ (224/240 units)` (14/15 px), same y. Timer +26: every 10th frame scan records +2..+7 for an inactive one and launch an AIMED shot at its position with `vy=64`, `vx` solved toward `(player.x, row 389)` intercept (velocity = dx/(389−y), tripled-and-halved scaling). Frames: `-$1DD0`; death anim 88 frames. |
| `$256C` | Wingman | Mirrors leader: `x = leader.x + 256 (16 px)`, same y; shares frame bank and fate (leader death ⇔ wingman death flags). Frames: `-$21D0`. |
| `$25D0` | Bomb | Falls at constant **6 px/frame** (`y += 96`); snaps to floor row and expires. Frames: `-$25D0`. |

Speed summary (px/frame): player 4; bullet 7 up; bomb 6 down; ball horizontal 0.625–4.5 with vertical speed accelerating ~0.098 px/f per frame from 0; bird max ≈3.1; crab drift 0.25; mini-ball initial fall 4.

---

## 7. COLLISIONS

- **Bullet → enemy**: pixel test of the 8-px bullet column against whatever is on screen (§3); on hit the *nearest-by-Manhattan* enemy record is killed (`$16EE` + `$179A`). Kill = set dying flag, add score immediately, start 44-frame (balls/birds/small) or 88-frame (crab) explosion from common bank `-$55D0` (stride 1024, frame = counter div 4 or 8).
- **Enemy → player**: purely graphical — the ship XOR-blit reads back and detects any overlapping set bit (`$1A2A`). Anything drawn in the ship's rectangle (enemy, bomb, wall, even a bullet) kills. Result: 400-frame freeze + explosion animation + life loss. No separate circle/rect math anywhere.
- **Enemy at bottom**: nothing bad happens. Balls bounce forever; bombs/birds' minis expire at the floor line. There is no "game over if enemy lands" rule.
- **Explosion animation frames**: dying enemies switch frame bank to `-$55D0`, frame index `(counter div 4)*1024` (crabs: `counter div 8`), deactivated after 44 (crab 88) frames. The *player* explosion (`$1E5A`) is different: a pseudo-random debris pattern (LCG seed `-$693E`: `seed = seed*$1AFB + $1FCCD`, GFA's RND) OR-ing 30 rows × 3 words from table `-$D0(A4)` onto a **fixed screen location** `logbase + $4470 + $2A` (byte 42 → px 336, row 219 — center of playfield), stage = `(timer−200) div 15` for timer ≥ 200.

---

## 8. SCORE

- Score = long at `-$567A`, zeroed per game, persists across levels.
- Points (word at record +2A): **ball 5, big ball 10, released mini 5, bird 5, bird's companion ball 10, crab 50, wingman 50, crab bomb 10, aimed shot 5.**
- Added in `$179A` at the moment of the killing hit.
- **Display**: `$90A` every frame — six digit *sprites* (glyph pointer table `-$5670(A4)`, indexed 0-9) drawn by the 8×16 blitter `$876` at `logbase + $6F90 + {8,7,6,5,4,3}` → ones..hundred-thousands at x=24..66, rows 357-372 — i.e., left sidebar under the "Score:" label (label itself: v_gtext "Score:" x=24, baseline y=353, drawn at HUD init).
- **Extra ship**: threshold long at `-$5E36`, starts **300**; in `$179A`, when score ≥ threshold and lives < 20: lives++, threshold += 300, and a new ship icon is drawn into BOTH buffers (Physbase & Logbase) at sidebar slot `lives-1` (`$1CA0`). So extra ships at **300, 600, 900, …** points (the intro text's "1000 Punkte" does not match the code).
- Sidebar labels painted once by `$2AAA` via VDI v_gtext at x=24: "Ships:" y=66, "Level:" y=289, "Score:" y=353. Ship-icon slots (arrays `-$69F2`=x, `-$69F0`=y): 4 columns × 5 rows, x∈{10,34,58,82}, y∈{70,94,118,142,166} — capacity 20 = the lives cap.

---

## 9. LIVES

- Start: **5** (`$C2C`, re-set per game). Displayed reserves = lives−1 icons (drawn at level setup `$2DC2` while `k < lives-1`, cap 19 icons visible).
- Decremented when the post-death freeze timer reaches 0 while dying (`$BC8`).
- Game over: after decrement `lives == 0` → frame loop returns 0 → back to menu (`$C36`), which repaints everything including the "40" attract state. There is no special game-over screen — the menu *is* the end screen (with final score still visible until `$3844(40)` clears the playfield).
- Final death (last ship) additionally sets the round flag that runs `$16B0`/`$1E5A` debris effects.
- Max lives 20 (`cmpi.w #$14` guard before drawing award icons).

---

## 10. "Level:" DISPLAY

The number under "Level:" (v_gtext, x=24, y=305) is printed **only inside `$3844`**, i.e. once per level start. It shows `level div 10` (space instead of leading zero) and `level mod 10`.
The intro/attract screen passes **the literal parameter 40** (`jsr $3844(#$28)` in `$13B4/$13CC`, and the demo wave likewise) — so "40" is simply the dummy argument used for the menu/demo painting, **not** an uninitialized or stale variable. During a level the value never changes until the next `$3844` call.

---

## 11. SOUND (PSG / YM-2149 via `Giaccess` = XBIOS 25; register byte | $80 = write)

Per-frame engine `$B2` (called from main loop), variables: volA `-$12`, volB `-$C`, volC `-$10` (bytes), mode `-$14`, duration `-$E`, frame counter t `-$16`:

| Write | Formula |
|---|---|
| reg $88 (vol A) | `min(13, |duration − 2*(t div 2)|)` |
| reg $80 (period fine A) | `|volA − 5*(t div 2)|` — pitch warbles downward as volA ramps |
| reg $89 (vol B) | mode≠0: `min(15, |volB − 2*(t div 3)|)`; mode=0: `min(volB, 13)` |
| reg $8A (vol C) | `min(15, |volC − 2*(t div 2)|)` (one path caps at 14) |
| envelope updates | mode≠0: every 8th frame volB--, volC--; volC==0 → mode=0. mode=0: volB-- each frame; volC-- every 3rd frame. While duration>0: duration--, **volA += 16** |

Trigger events (exact):
| Event | Code | Effect |
|---|---|---|
| **Shoot** | `$852-$85E` | dur=20, volA=3, t=0 → 20-frame rising/rasping zap on ch A (period register driven too) |
| **Ball/wall or floor bounce** | `$1F72,$1F92,$1FBE` | volB = 14 (short tick, fast-decayed only if mode set) |
| **Small ball dies (wall/floor)** | `$268C` etc. | volC = 20 |
| **Enemy killed** | `$1872` | volC = 20 (if not already dying) |
| **Player hit / death** | `$1C7A` | volB = 22, volC = 20, **mode = 1** (fast crackle decay) |
| **Pause (ESC), level end, menu transitions** | `$A98`, `$12DC`, `$136A`, `$CA2` | `Giaccess(0,$88/$89/$8A)` — mute all three channels; sound vars cleared |
| **Boot/explosion sample** | `$2A2C`, table built at init `$65D8` | replays 10 PSG register pairs: vol A=0, vol B=0, **vol C=5**, period A=256, period B=$0E0E? (fine $E8 coarse $0E), period C fine $E8 coarse $0F (≈15 Hz rumble), noise period 31, mixer = read-modify keeping noise bits, forcing tone bits on. Played once at program start (`$2D7A`). |

No `Dosound`, no DMA audio. Channel usage: A = shoot zap, B = bounce ticks, C = explosions/thuds; mode flag switches to the harsher "explosion" envelope set.

---

## 12. KEYBOARD INPUT

Mechanism: the game replaces the OS **ikbdsys** vector (Kbdvbase struct +$20, XBIOS 34) with handler `$26E0` (installed via Supexec-wrapped routine `$290C`; original saved at `-$6944`; restored at exit; `Kbrate(0,4)` = fastest repeat; `Ikbdws(0,{0x14})` sent on install / `{0x08}` (disable mouse) on restore; A4 pointer stashed at absolute `$100` for supervisor-mode access). The handler polls the IKBD ACIA **directly at `$FFFFFC02`**, one scancode per interrupt:

- Key-down codes (bit7=0): press flags set; release codes (bit7=1, +$80) clear them.
- Synthetic codes `$FE/$FF` and `$F8-$FB` are internal markers; ordinary keys land in a 1-deep buffer: last-key byte `-$694C` + available flag `-$694E` (read by `getkey()` `$29A0`, returns `-1` when empty).

| Action | Scancodes (press / release) |
|---|---|
| LEFT  | `$1E` (A) / `$27` (Ö) — release `$9E`/`$A7` |
| RIGHT | `$1F` (S) / `$28` (Ä) — release `$9F`/`$A8` |
| FIRE  | `$39` (SPACE) / `$1C` (RETURN) — release `$B9`/`$9C` |
| Pause | `$01` (ESC) — mutes PSG then waits for any key |
| Quit to menu | `$13` (R) |
| Menu | `$19` (P) normal, `$32` (M) machine gun, `$10` (Q) quit |

(The German-layout umlaut keys Ö/Ä are indeed alternates for left/right, matching the hints ö=39/$27, ä=40/$28.)

---

## Appendix A — Global variable map (A4-relative)

| Offset | Meaning |
|---|---|
| `-$E/-C/-10/-12/-14/-16` | sound: duration, volB, volC, volA, mode, frame counter |
| `-$18/-1A/-1C` | fire latch, MG-mode flag, MG cooldown |
| `-$5E34 + n*$2C` | enemy records (see §4) |
| `-$5728 + n*$0E` | bullet records |
| `-$5672` / `-$5674` | total records / alive-and-counting enemies |
| `-$5676` | lives (start 5, cap 20) |
| `-$567A` | score (long) |
| `-$567C` | death/clear timer (-1 idle, 400 death, 200 level-cleared) |
| `-$5680` | current logical screen |
| `-$5684/-5688` | ship prev/current screen address |
| `-$568A` | dying flag |
| `-$568C/-568E` | ship y (370) / x (112..575) |
| `-$5E36` | extra-life threshold (start 300, step 300) |
| `-$693E` | RND seed for debris |
| `-$6944` | original ikbdsys |
| `-$694C/-694E` | key byte / key-available flag |
| `-$6956/-6958/-695A` | LEFT/RIGHT/FIRE state |
| `-$69F2/-69F0` | icon x/y arrays (20 slots) |
| `-$6A04/-6A06` | bird formation cycle / leader index |
| `-$6A10/-6A1A` | formation x-offsets [0,176,-176,528,-528] / y-offsets [0,160,160,80,80] |
| `-$77A4` block | GFA runtime scratch |

## Appendix B — Sprite banks (BSS)

| Bank | Layout | Content |
|---|---|---|
| `-$950` | 16 × 72 B (32×18 px, pre-shifted) | player ship (+ sidebar icons via `$1CA0`) |
| `-$DD0` | 16 × 72 B | ship explosion variants |
| `-$4D0` | 16 × 64 B (32×16) | plain ball frames (set every frame by `$1F14`) |
| `-$4D0` | 16 × 64 B (32×16) | plain ball frames (set every frame by `$1F14`) |
| `-$11D0` / `-$15D0` | 16 × 64 each | big-ball frames, selected by vy sign in wrapper `$201E` (`vy>0` → `-$15D0`) |
| `-$29D0` | 16 × 64 | small ball |
| `-$25D0` | 16 × 64 | bomb |
| `-$21D0` | 16 × 64 | wingman crab |
| `-$1DD0` | 16 × 64 | lead crab |
| `-$19D0` / `-$15D0` | 16 × 64 each | bird (up/down) |
| `-$55D0` | stride 1024 | common death-animation frames (all enemy types) |
| `-$5670` | pointer table (idx*4) | digit glyphs 0-9 for the score blitter |
| `-$D0` | ~180 B | player-death debris patterns |

Blitting styles: enemies/player OR or XOR with read-back collision; bullets single-pixel XOR; HUD text via VDI `v_gtext` (opcode 8) on handle `-$6E34`; playfield border polygon (109,48)-(594,391) drawn once per screen rebuild.

## Appendix C — Known unknowns
- Exact glyph art (digit shapes, ship/ball bitmaps) lives in the inline `move.l #$xxxx,(a1)+` streams of `$3BD0-$4714` — recoverable mechanically but not transcribed here.
- `xbios(25)` calls wrap `Ikbdws(0,{ptr})` sending single bytes `$14` (install) and `$08` (restore) to the IKBD; the exact intent of `$14` (likely "disable joysticks") is unconfirmed.
- The 47-slot text table at `-$693A` (intro instructions, e.g. "<P> um normal spielen,", "<M> um mit MG zu spielen,", "<Q> um aufzuhören.", "Drucken Sie:") is painted once at (120,389) and then smeared by the `$1182` blur copy — cosmetic detail reproduced literally.
- When the player-death timer drops below 200, `$1E5A` computes `rand div 0` (stage 0); on real hardware this yields an unpredictable quotient — replicate as stage 0 for safety.
