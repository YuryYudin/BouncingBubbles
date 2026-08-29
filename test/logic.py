#!/usr/bin/env python3
"""Focused logic probes."""
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 700, 'height': 460})
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('http://localhost:8741/index.html')
        await page.wait_for_timeout(800)
        await page.keyboard.press('KeyP')
        await page.wait_for_timeout(500)

        # probe 1: place a ball exactly on the ship and let ticks run
        r = await page.evaluate("""() => {
            const e = game.enemies.find(e => e.active && e.move === 'ball');
            e.x = game.shipX << 4;
            e.y = 366 << 4;
            e.vy = 0; e.vx = 0;
            return {x: e.x>>4, y: e.y>>4, shipX: game.shipX};
        }""")
        print('probe1 setup:', r)
        await page.wait_for_timeout(500)
        r = await page.evaluate("() => ({dying: game.dying, deathTimer: game.deathTimer, lives: game.lives, hit: game.hitDetected})")
        print('probe1 after 0.5s:', r)

        # probe 2: level clear advances level
        await page.evaluate("game.dying = 0; game.deathTimer = -1; game.finalDeath = 0; game.lives = 5;")
        r = await page.evaluate("""() => {
            for (const e of game.enemies) { if (e.active && e.counts) { e.active = 0; e.counts = 0; game.alive--; } }
            return game.alive;
        }""")
        await page.wait_for_timeout(5000)
        r = await page.evaluate("() => ({level: game.level, alive: game.alive, mode: game.mode})")
        print('probe2 after clear wait:', r)

        # probe 3: extra ship at 300
        r = await page.evaluate("() => { game.addScore(300); return {score: game.score, lives: game.lives, thr: game.extraThreshold}; }")
        print('probe3 extra ship:', r)

        # probe 4: pause
        await page.keyboard.press('Escape')
        await page.wait_for_timeout(300)
        r = await page.evaluate("() => game.paused")
        print('probe4 paused:', r)
        await page.keyboard.press('Space')
        await page.wait_for_timeout(300)
        r = await page.evaluate("() => game.paused")
        print('probe4 unpaused:', r)

        print('errors:', errors if errors else 'none')
        await browser.close()

asyncio.run(main())
