#!/usr/bin/env python3
"""Comprehensive E2E test: intro, gameplay, levels, death, game over."""
import asyncio, os, json
from playwright.async_api import async_playwright

OUT = '/Users/jjb/Work/OpenCode/BouncingBoubles/test/shots'
os.makedirs(OUT, exist_ok=True)

async def shot(page, name):
    await page.screenshot(path=f'{OUT}/{name}.png')

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 700, 'height': 460})
        errors = []
        page.on('console', lambda m: errors.append(f'{m.type}: {m.text}') if m.type == 'error' else None)
        page.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
        await page.goto('http://localhost:8741/index.html')
        await page.wait_for_timeout(1500)
        await shot(page, 'w_intro_demo')   # demo phase (wave, no text)

        # jump to scroll phase for text visual
        await page.evaluate("game.introPhase = 1; game.introFrame = 0; game.scrollPos = 400;")
        await page.wait_for_timeout(600)
        await shot(page, 'w_intro_text')

        # start normal game
        await page.keyboard.press('KeyP')
        await page.wait_for_timeout(800)
        await shot(page, 'w_l0')

        # fire until something dies or 20 shots
        for i in range(25):
            await page.keyboard.press('Space')
            await page.wait_for_timeout(120)
        st = await page.evaluate("() => ({score: game.score, alive: game.alive, level: game.level, lives: game.lives})")
        print('after firing:', st)
        await shot(page, 'w_l0_fired')

        # level skip: set level 10 (birds) via internal API for visual check
        await page.evaluate("game.level = 10; game.startLevel();")
        await page.wait_for_timeout(2500)
        await shot(page, 'w_l10')
        st = await page.evaluate("() => ({level: game.level, alive: game.alive})")
        print('level10:', st)

        # level 15 crabs
        await page.evaluate("game.level = 15; game.startLevel();")
        await page.wait_for_timeout(3500)
        await shot(page, 'w_l15')
        st = await page.evaluate("() => ({level: game.level, alive: game.alive})")
        print('level15:', st)

        # force death: put a ball on the ship
        await page.evaluate("""() => {
            const e = game.enemies.find(e => e.active && !e.dying);
            e.x = game.shipX << 4; e.y = 366 << 4; e.vx = 0; e.vy = 0;
        }""")
        await page.wait_for_timeout(1500)
        st = await page.evaluate("() => ({mode: game.mode, lives: game.lives, dying: game.dying, finalDeath: game.finalDeath, deathTimer: game.deathTimer})")
        print('death seq:', st)
        await shot(page, 'w_death_debris')
        await page.wait_for_timeout(4000)
        await shot(page, 'w_gameover')
        st = await page.evaluate("() => ({mode: game.mode, lives: game.lives})")
        print('gameover state:', st)
        await page.wait_for_timeout(5000)
        await shot(page, 'w_after_go')
        st = await page.evaluate("() => ({mode: game.mode})")
        print('after:', st)

        print('CONSOLE:', errors[:10] if errors else 'clean')
        await browser.close()

asyncio.run(main())
