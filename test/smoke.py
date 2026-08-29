#!/usr/bin/env python3
"""E2E smoke test for the Bouncing Boubles web app."""
import asyncio, sys
from playwright.async_api import async_playwright

OUT = '/Users/jjb/Work/OpenCode/BouncingBoubles/test/shots'
import os; os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 700, 'height': 460})
        errors = []
        page.on('console', lambda m: errors.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
        page.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
        await page.goto('http://localhost:8741/index.html')
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f'{OUT}/w_boot.png')
        # skip intro via P
        await page.keyboard.press('KeyP')
        await page.wait_for_timeout(1500)
        await page.screenshot(path=f'{OUT}/w_level0.png')
        # move and fire
        await page.keyboard.down('KeyS')
        await page.wait_for_timeout(700)
        await page.keyboard.up('KeyS')
        await page.keyboard.press('Space')
        await page.wait_for_timeout(400)
        await page.screenshot(path=f'{OUT}/w_fired.png')
        # read game state
        state = await page.evaluate("""() => {
            const g = window.game;
            return g ? {mode: g.mode, level: g.level, score: g.score, lives: g.lives,
                        enemies: g.enemies.filter(e=>e.active).length, alive: g.alive,
                        shipX: g.shipX, bullets: g.bullets.filter(b=>b.active).length} : 'no game global';
        }""")
        print('STATE:', state)
        print('CONSOLE:', errors[:10] if errors else 'clean')
        await browser.close()

asyncio.run(main())
