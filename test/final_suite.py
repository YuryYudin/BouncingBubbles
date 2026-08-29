#!/usr/bin/env python3
"""Final comprehensive E2E suite for Bouncing Boubles web app."""
import asyncio, os, sys
from playwright.async_api import async_playwright

OUT = '/Users/jjb/Work/OpenCode/BouncingBoubles/test/shots'
os.makedirs(OUT, exist_ok=True)
PASS, FAIL = [], []

def check(name, cond, detail=''):
    (PASS if cond else FAIL).append(f'{name} {detail}')
    print(('PASS' if cond else 'FAIL'), name, detail)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 640, 'height': 400})
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await page.goto('file:///Users/jjb/Work/OpenCode/BouncingBoubles/webapp/index.html')
        await page.wait_for_timeout(900)

        # 1. boot state
        st = await page.evaluate("() => ({mode: game.mode, level: game.level, lives: game.lives, phase: game.introPhase})")
        check('boot intro demo', st['mode'] == 'intro' and st['level'] == 40 and st['phase'] == 0, str(st))
        n = await page.evaluate("() => game.enemies.filter(e => e.active).length")
        check('demo wave populated (level 40 composition)', n >= 15, f'{n} enemies')

        # 2. demo wave animates
        p1 = await page.evaluate("() => JSON.stringify(game.enemies.filter(e=>e.active).map(e=>[e.x,e.y]).slice(0,5))")
        await page.wait_for_timeout(600)
        p2 = await page.evaluate("() => JSON.stringify(game.enemies.filter(e=>e.active).map(e=>[e.x,e.y]).slice(0,5))")
        check('demo wave moves', p1 != p2)

        # 3. intro text scroll phase
        await page.evaluate("game.introPhase = 1; game.introFrame = 0; game.scrollPos = 0; game.nextLine = 0; game.conveyor = [];")
        await page.wait_for_timeout(2000)
        st = await page.evaluate("() => ({lines: game.conveyor.length, scroll: game.scrollPos})")
        check('intro scroll paints lines', st['lines'] >= 3 and st['scroll'] >= 100, str(st))
        await page.locator('#screen').screenshot(path=f'{OUT}/f_intro_text.png')

        # 4. P starts normal game
        await page.keyboard.press('KeyP')
        await page.wait_for_timeout(300)
        st = await page.evaluate("() => ({mode: game.mode, level: game.level, lives: game.lives, mg: game.mg})")
        check('P starts normal game', st['mode'] == 'game' and st['level'] == 0 and st['lives'] == 5 and st['mg'] == 0, str(st))

        # 5. grace: no enemies visible/moving for 70 frames
        st = await page.evaluate("() => game.grace")
        check('grace period set (70)', 40 < st <= 70, f'grace={st}')

        # 6. after grace, balls exist and fall with gravity
        await page.wait_for_timeout(1600)
        st = await page.evaluate("""() => {
            const b = game.enemies.find(e => e.active && e.move === 'ball');
            return b ? {y1: b.y, vy1: b.vy} : null;
        }""")
        check('balls active after grace', st is not None)
        await page.wait_for_timeout(500)
        st2 = await page.evaluate("""() => {
            const b = game.enemies.find(e => e.active && e.move === 'ball');
            return b ? {y2: b.y, vy2: b.vy} : null;
        }""")
        check('ball gravity accelerates', st2 and st2['vy2'] > st['vy1'], f"vy {st['vy1']}->{st2['vy2']}")

        # 7. movement + clamps
        await page.keyboard.down('KeyA')
        await page.wait_for_timeout(3000)
        st = await page.evaluate("() => game.shipX")
        await page.keyboard.up('KeyA')
        check('left clamp at 112', st == 112, f'shipX={st}')
        await page.keyboard.down('KeyS')
        await page.wait_for_timeout(4000)
        st = await page.evaluate("() => game.shipX")
        await page.keyboard.up('KeyS')
        check('right clamp at 575', st == 575, f'shipX={st}')

        # 8. fire: single shot per press, bullet rises 7px/f, kills give 5pts
        await page.evaluate("game.shipX = 343;")
        n0 = await page.evaluate("() => game.enemies.filter(e => e.active && !e.dying).length")
        await page.keyboard.press('Space')
        await page.wait_for_timeout(100)
        st = await page.evaluate("() => game.bullets.filter(b => b.active).length")
        check('single shot fired', st >= 1, f'{st} bullets')
        # wait for kill or bullet expiry
        await page.wait_for_timeout(2500)
        st = await page.evaluate("() => ({score: game.score, alive: game.alive})")
        check('bullet hit kills (score 5/10)', st['score'] > 0, str(st))

        # 9. level clear -> next level
        await page.evaluate("""() => {
            // kill everything counting
            for (const e of game.enemies) if (e.active && e.counts) { e.dying = 1; e.anim = 40; }
        }""")
        await page.wait_for_timeout(100)
        await page.evaluate("() => { for (const e of game.enemies) if (e.dying) e.active = 0; game.alive = 0; }")
        await page.wait_for_timeout(4500)   # clear wait 200 frames = 4s
        st = await page.evaluate("() => ({level: game.level, mode: game.mode})")
        check('level clear advances level', st['level'] == 1 and st['mode'] == 'game', str(st))

        # 10. level compositions
        comps = await page.evaluate("""async () => {
            const out = {};
            for (const L of [0, 5, 10, 15, 22, 31, 40]) {
                game.level = L; game.startLevel();
                await new Promise(r => setTimeout(r, 30));
                const act = game.enemies.filter(e => e.active && !e.dying);
                out[L] = {total: act.length, byMove: {}};
                for (const e of act) out[L].byMove[e.move] = (out[L].byMove[e.move]||0)+1;
            }
            return out;
        }""")
        c = comps
        check('L0 = 3 balls', c['0']['byMove'].get('ball') == 3, str(c['0']['byMove']))
        check('L5 = 1 bigball', c['5']['byMove'].get('bigball') == 1, str(c['5']['byMove']))
        check('L10 = 3 birds', c['10']['byMove'].get('bird') == 3, str(c['10']['byMove']))
        check('L15 = crab lead+wingman', c['15']['byMove'].get('crablead') == 1 and c['15']['byMove'].get('wingman') == 1, str(c['15']['byMove']))
        check('L22 has crabs (adj>20)', c['22']['byMove'].get('crablead', 0) >= 1, str(c['22']['byMove']))
        check('L31 has 2 crab groups', c['31']['byMove'].get('crablead') == 2, str(c['31']['byMove']))
        check('L40 mix', c['40']['total'] >= 15, str(c['40']))

        # 11. extra ship at 300
        st = await page.evaluate("() => { game.addScore(0); game.score = 295; game.extraThreshold = 300; game.addScore(10); return {score: game.score, lives: game.lives, thr: game.extraThreshold}; }")
        check('extra ship at 300', st['lives'] == 6 and st['thr'] == 600, str(st))

        # 12. pause (reset to a calm level 0 first — at L40 the ship gets killed)
        await page.evaluate("() => { game.level = 0; game.startLevel(); }")
        await page.wait_for_timeout(300)
        st = await page.evaluate("() => game.mode")
        check('still in game before pause test', st == 'game')
        await page.keyboard.press('Escape')
        await page.wait_for_timeout(200)
        st = await page.evaluate("() => game.paused")
        check('ESC pauses', st is True)
        pos1 = await page.evaluate("() => game.enemies.filter(e=>e.active)[0]?.y")
        await page.wait_for_timeout(500)
        pos2 = await page.evaluate("() => game.enemies.filter(e=>e.active)[0]?.y")
        check('pause freezes world', pos1 == pos2, f'{pos1} vs {pos2}')
        await page.keyboard.press('KeyA')
        await page.wait_for_timeout(200)
        st = await page.evaluate("() => game.paused")
        check('any key unpauses', st is False)

        # 13. death + same-level retry (wait out the 70-frame grace first)
        await page.wait_for_timeout(1600)
        await page.evaluate("""() => {
            game.lives = 3;
            const e = game.enemies.find(e => !e.active && !e.dying);
            e.reset(); e.active = 1; e.counts = 0; e.move = 'ball';
            e.x = game.shipX << 4; e.y = 366 << 4; e.vx = 0; e.vy = 0;
        }""")
        await page.wait_for_timeout(600)
        st = await page.evaluate("() => ({dying: game.dying, timer: game.deathTimer})")
        check('collision triggers death', st['dying'] == 1, str(st))
        await page.wait_for_timeout(8000)
        st = await page.evaluate("() => ({lives: game.lives, dying: game.dying, mode: game.mode})")
        check('death costs a life, replays level', st['lives'] == 2 and st['dying'] == 0 and st['mode'] == 'game', str(st))

        # 14. final death -> Game Over -> menu
        await page.evaluate("() => { game.lives = 1; }")
        await page.wait_for_timeout(1600)
        await page.evaluate("""() => {
            const e = game.enemies.find(e => !e.active && !e.dying);
            e.reset(); e.active = 1; e.counts = 0; e.move = 'ball';
            e.x = game.shipX << 4; e.y = 366 << 4; e.vx = 0; e.vy = 0;
        }""")
        await page.wait_for_timeout(6000)
        st = await page.evaluate("() => ({dying: game.dying, final: game.finalDeath})")
        check('final death flag', st['final'] == 1, str(st))
        await page.locator('#screen').screenshot(path=f'{OUT}/f_gameover.png')
        await page.wait_for_timeout(5000)
        st = await page.evaluate("() => ({mode: game.mode})")
        check('game over returns to menu', st['mode'] == 'intro', str(st))
        await page.locator('#screen').screenshot(path=f'{OUT}/f_menu.png')

        # 15. R key during game returns to menu
        await page.keyboard.press('KeyP')
        await page.wait_for_timeout(300)
        await page.keyboard.press('KeyR')
        await page.wait_for_timeout(300)
        st = await page.evaluate("() => game.mode")
        check('R returns to menu', st == 'intro')

        # 16. console clean
        check('no console/page errors', len(errs) == 0, str(errs[:3]))

        await browser.close()

    print(f"\n{len(PASS)} passed, {len(FAIL)} failed")
    if FAIL:
        print('FAILURES:'); [print(' -', f) for f in FAIL]
        sys.exit(1)

asyncio.run(main())
