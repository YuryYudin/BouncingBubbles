import { Game } from './game.js';

const canvas = document.getElementById('screen');
const game = new Game(canvas);
window.game = game;
window.BB_VERSION = 11;
console.log('[Bouncing Boubles] build 11 — bullet spawn-spacing enforced (no more teleport kills)');

// Keyboard — matches original controls:
// A / ArrowLeft = left, S / ArrowRight = right, Space / Enter = fire,
// ESC = pause, R = quit fight (back to menu), P/M/Q = menu.
// Also map ö/ä (the original's German-layout alternates) and touch/mouse.
const KEYMAP = {
  KeyA: 'a', KeyS: 's', Space: ' ', Enter: 'enter', Escape: 'escape',
  KeyR: 'r', KeyP: 'p', KeyM: 'm', KeyQ: 'q',
  ArrowLeft: 'arrowleft', ArrowRight: 'arrowright',
  Semicolon: 'ö', Quote: 'ä',
};

window.addEventListener('keydown', (e) => {
  const k = KEYMAP[e.code];
  if (k) { e.preventDefault(); game.keyDown(k); }
});
window.addEventListener('keyup', (e) => {
  const k = KEYMAP[e.code];
  if (k) { e.preventDefault(); game.keyUp(k); }
});

// Pointer/touch: drag moves the ship, tap fires.
let dragging = false;
function canvasX(clientX) {
  const r = canvas.getBoundingClientRect();
  return Math.round((clientX - r.left) / r.width * 640);
}
canvas.addEventListener('pointerdown', (e) => {
  dragging = true;
  game.ensureAudio();
  game.pointerX = canvasX(e.clientX);
  game.keys[' '] = true;
});
canvas.addEventListener('pointermove', (e) => {
  if (dragging) game.pointerX = canvasX(e.clientX);
});
window.addEventListener('pointerup', () => {
  dragging = false;
  game.keys[' '] = false;
});

// Scaling: fit to window, integer-ish scale, crisp pixels.
function fit() {
  const scale = Math.max(1, Math.min(
    Math.floor(window.innerWidth / 640 * 100) / 100,
    Math.floor(window.innerHeight / 400 * 100) / 100
  ));
  canvas.style.width = (640 * scale) + 'px';
  canvas.style.height = (400 * scale) + 'px';
}
window.addEventListener('resize', fit);
fit();
