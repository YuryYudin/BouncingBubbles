// Bundled from module sources by build.py — do not edit.
// (Generated so the game also runs from file:// without a server.)
// ---- sprites.js ----
// Auto-generated from the original BOUNCE.PRG (memory extraction). Do not edit.
const SPRITES = {
  ball: { w: 16, h: 16, bits: [384, 4080, 8184, 16380, 32766, 32766, 32766, 65535, 65535, 32766, 32766, 32766, 16380, 8184, 4080, 384] },
  ship: { w: 16, h: 18, bits: [384, 384, 384, 384, 960, 960, 1632, 1056, 8184, 1056, 1056, 3504, 3504, 7608, 7608, 14940, 29806, 65535] },
  ship_expl: { w: 16, h: 12, bits: [3584, 1920, 384, 1984, 1088, 9336, 8128, 2096, 6552, 16270, 62022, 32767] },
  bigball_a: { w: 16, h: 15, bits: [384, 960, 2016, 4080, 8184, 16380, 32766, 65535, 53235, 4080, 4080, 4080, 5064, 28686, 63519] },
  bigball_b: { w: 16, h: 16, bits: [33153, 50115, 63471, 32766, 32766, 16380, 16380, 16380, 16380, 8184, 8184, 4080, 5064, 8196, 28686, 63519] },
  bird: { w: 16, h: 8, bits: [2016, 8184, 32766, 43413, 43413, 32766, 8184, 2016] },
  crab_lead: { w: 16, h: 14, bits: [1792, 1792, 3968, 2240, 6384, 16380, 30847, 24607, 16399, 16391, 16391, 57351, 57375, 31] },
  crab_wing: { w: 16, h: 14, bits: [224, 224, 496, 784, 3864, 16380, 65054, 63494, 61442, 57346, 57346, 57351, 63495, 63488] },
  bomb: { w: 1, h: 12, bits: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  smallball: { w: 6, h: 7, bits: [33, 63, 30, 30, 12, 12, 12] },
  death: [
    { w: 15, h: 16, bits: [192, 480, 1008, 2040, 4092, 8190, 16383, 32767, 32767, 16383, 8190, 4092, 2040, 1008, 480, 192] },
    { w: 16, h: 16, bits: [384, 384, 960, 960, 2016, 4080, 16380, 65535, 65535, 16380, 4080, 2016, 960, 960, 384, 384] },
    { w: 16, h: 16, bits: [384, 384, 384, 384, 384, 960, 2016, 65535, 65535, 2016, 960, 384, 384, 384, 384, 384] },
    { w: 10, h: 10, bits: [24, 24, 60, 126, 999, 999, 126, 60, 24, 24] },
    { w: 8, h: 8, bits: [24, 60, 102, 195, 195, 102, 60, 24] },
    { w: 10, h: 10, bits: [48, 252, 390, 258, 771, 771, 258, 390, 252, 48] },
    { w: 10, h: 10, bits: [252, 390, 771, 513, 513, 513, 513, 771, 390, 252] },
    { w: 12, h: 12, bits: [408, 1542, 1026, 2049, 2049, 0, 0, 2049, 2049, 1026, 1542, 408] },
    { w: 14, h: 14, bits: [1560, 6150, 4098, 8193, 8193, 0, 0, 0, 0, 8193, 8193, 4098, 6150, 1560] },
    { w: 16, h: 16, bits: [4104, 24582, 16386, 32769, 0, 0, 0, 0, 0, 0, 0, 0, 32769, 16386, 24582, 4104] },
    { w: 16, h: 16, bits: [49154, 32769, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32769, 49154] },
  ],
  digits: [
    { w: 8, h: 12, bits: [60, 126, 102, 102, 102, 102, 102, 102, 102, 102, 126, 60] },
    { w: 8, h: 12, bits: [24, 24, 56, 56, 24, 24, 24, 24, 24, 24, 126, 126] },
    { w: 8, h: 12, bits: [60, 126, 102, 102, 12, 12, 24, 24, 48, 48, 126, 126] },
    { w: 8, h: 12, bits: [126, 126, 12, 12, 24, 24, 12, 12, 102, 102, 126, 60] },
    { w: 8, h: 12, bits: [12, 12, 28, 28, 60, 60, 108, 108, 126, 126, 12, 12] },
    { w: 8, h: 12, bits: [126, 126, 96, 96, 124, 126, 6, 6, 6, 102, 126, 60] },
    { w: 8, h: 12, bits: [28, 60, 112, 96, 96, 124, 126, 102, 102, 102, 126, 60] },
    { w: 8, h: 12, bits: [126, 126, 6, 6, 12, 12, 24, 24, 48, 48, 48, 48] },
    { w: 8, h: 12, bits: [60, 126, 102, 102, 60, 60, 102, 102, 102, 102, 126, 60] },
    { w: 8, h: 12, bits: [60, 126, 102, 102, 126, 62, 6, 6, 6, 14, 60, 56] },
  ],
  debrisRaw: "1f00000000007f0000000000600000000000c00000000000c00000000000c00000000000c78f9b383c00c79f9ffc7e00c1999cc66600c19998c67e00c19998c67e00619998c660007f9fd8c67e001e0fd8c63e000000000000000000000000003e00000000007e0000000000c18000000000c18000000000c18000000000c18000000000c198c78d8000c198cfcfc000c198ccce4000c18d8fcc0000c18d8fcc0000c1870c0c00007f070fcc00003e0207cc0000000000000000008e00000000",
};

// ---- font.js ----
// Auto-generated TOS 8x16 system font (harvested from original screenshots). Do not edit.
const FONT = {
  "!": [0, 0, 0, 24, 24, 24, 24, 24, 24, 24, 24, 0, 0, 24, 24, 0],
  "(": [0, 0, 0, 6, 12, 28, 24, 24, 24, 24, 24, 24, 28, 12, 6, 0],
  ")": [0, 0, 0, 96, 48, 56, 24, 24, 24, 24, 24, 24, 56, 48, 96, 0],
  ",": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 48],
  "-": [0, 0, 0, 0, 0, 0, 0, 126, 126, 0, 0, 0, 0, 0, 0, 0],
  ".": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 0],
  "/": [0, 0, 0, 6, 6, 6, 12, 12, 24, 24, 48, 48, 96, 96, 96, 0],
  "0": [0, 0, 0, 60, 126, 102, 102, 102, 110, 118, 102, 102, 102, 126, 60, 0],
  "1": [0, 0, 0, 24, 24, 56, 56, 24, 24, 24, 24, 24, 24, 126, 126, 0],
  "2": [60, 126, 102, 102, 12, 12, 24, 24, 48, 48, 126, 126, 0, 0, 0, 0],
  "3": [0, 0, 0, 126, 126, 12, 12, 24, 24, 12, 12, 102, 102, 126, 60, 0],
  "4": [12, 12, 28, 28, 60, 60, 108, 108, 126, 126, 12, 12, 0, 0, 0, 0],
  "5": [126, 126, 96, 96, 124, 126, 6, 6, 6, 102, 126, 60, 0, 0, 0, 0],
  "6": [28, 60, 112, 96, 96, 124, 126, 102, 102, 102, 126, 60, 0, 0, 0, 0],
  "7": [0, 0, 0, 126, 126, 6, 6, 12, 12, 24, 24, 48, 48, 48, 48, 0],
  "8": [0, 0, 0, 60, 126, 102, 102, 60, 60, 102, 102, 102, 102, 126, 60, 0],
  "9": [0, 0, 0, 60, 126, 102, 102, 126, 62, 6, 6, 6, 14, 60, 56, 0],
  ":": [0, 0, 0, 0, 0, 24, 24, 24, 24, 0, 0, 24, 24, 24, 24, 0],
  "<": [0, 0, 0, 0, 14, 28, 56, 112, 224, 112, 56, 28, 14, 0, 0, 0],
  ">": [0, 0, 0, 0, 224, 112, 56, 28, 14, 28, 56, 112, 224, 0, 0, 0],
  "A": [0, 0, 0, 24, 60, 126, 102, 102, 102, 126, 126, 102, 102, 102, 102, 0],
  "B": [0, 0, 0, 124, 126, 102, 102, 126, 124, 102, 102, 102, 102, 126, 124, 0],
  "C": [0, 0, 0, 60, 126, 102, 102, 96, 96, 96, 96, 102, 102, 126, 60, 0],
  "D": [0, 0, 0, 120, 124, 110, 102, 102, 102, 102, 102, 102, 110, 124, 120, 0],
  "E": [0, 0, 0, 126, 126, 96, 96, 124, 124, 96, 96, 96, 96, 126, 126, 0],
  "F": [0, 0, 0, 126, 126, 96, 96, 124, 124, 96, 96, 96, 96, 96, 96, 0],
  "G": [0, 0, 0, 62, 126, 96, 96, 110, 110, 102, 102, 102, 102, 126, 60, 0],
  "H": [0, 0, 0, 102, 102, 102, 102, 126, 126, 102, 102, 102, 102, 102, 102, 0],
  "I": [0, 0, 0, 126, 126, 24, 24, 24, 24, 24, 24, 24, 24, 126, 126, 0],
  "J": [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 102, 102, 126, 60, 0],
  "K": [0, 0, 0, 204, 204, 216, 216, 240, 240, 216, 216, 204, 204, 198, 198, 0],
  "L": [0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 126, 126, 0],
  "M": [0, 0, 0, 198, 198, 238, 238, 254, 214, 214, 198, 198, 198, 198, 198, 0],
  "P": [0, 0, 0, 124, 126, 102, 102, 102, 102, 126, 124, 96, 96, 96, 96, 0],
  "Q": [0, 0, 0, 60, 126, 102, 102, 102, 102, 102, 102, 102, 106, 124, 54, 0],
  "R": [0, 0, 0, 248, 252, 204, 204, 204, 252, 248, 216, 204, 204, 198, 198, 0],
  "S": [0, 0, 0, 62, 126, 96, 96, 112, 56, 28, 14, 6, 6, 126, 124, 0],
  "T": [0, 0, 0, 126, 126, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 0],
  "W": [0, 0, 0, 198, 198, 198, 198, 198, 214, 214, 254, 254, 238, 198, 130, 0],
  "a": [0, 0, 0, 0, 0, 0, 60, 62, 6, 62, 126, 102, 102, 126, 62, 0],
  "b": [0, 0, 0, 96, 96, 96, 124, 126, 102, 102, 102, 102, 102, 126, 124, 0],
  "c": [0, 0, 0, 0, 0, 0, 60, 124, 96, 96, 96, 96, 96, 126, 62, 0],
  "d": [0, 0, 0, 6, 6, 6, 62, 126, 102, 102, 102, 102, 102, 126, 62, 0],
  "e": [0, 0, 0, 0, 0, 0, 60, 126, 102, 102, 126, 96, 96, 126, 62, 0],
  "f": [0, 0, 0, 14, 30, 24, 24, 126, 126, 24, 24, 24, 24, 24, 24, 0],
  "g": [0, 0, 0, 0, 0, 0, 62, 126, 102, 102, 102, 102, 126, 62, 6, 126],
  "h": [0, 0, 0, 96, 96, 96, 124, 126, 102, 102, 102, 102, 102, 102, 102, 0],
  "i": [0, 0, 0, 24, 24, 0, 56, 56, 24, 24, 24, 24, 24, 60, 60, 0],
  "k": [0, 0, 0, 192, 192, 192, 204, 220, 248, 240, 248, 216, 204, 206, 198, 0],
  "l": [0, 0, 0, 56, 56, 24, 24, 24, 24, 24, 24, 24, 24, 60, 60, 0],
  "m": [0, 0, 0, 0, 0, 0, 108, 254, 254, 214, 214, 214, 198, 198, 198, 0],
  "n": [0, 0, 0, 0, 0, 0, 60, 126, 102, 102, 102, 102, 102, 102, 102, 0],
  "o": [0, 0, 0, 0, 0, 0, 60, 126, 102, 102, 102, 102, 102, 126, 60, 0],
  "p": [0, 0, 0, 0, 0, 0, 124, 126, 102, 102, 102, 102, 102, 126, 124, 96],
  "r": [0, 0, 0, 0, 0, 0, 124, 126, 102, 96, 96, 96, 96, 96, 96, 0],
  "s": [0, 0, 0, 0, 0, 0, 62, 126, 96, 112, 60, 14, 6, 126, 124, 0],
  "t": [0, 0, 0, 0, 24, 24, 126, 126, 24, 24, 24, 24, 24, 30, 14, 0],
  "u": [0, 0, 0, 0, 0, 0, 102, 102, 102, 102, 102, 102, 102, 126, 62, 0],
  "v": [0, 0, 0, 0, 0, 0, 102, 102, 102, 102, 102, 60, 60, 24, 24, 0],
  "w": [0, 0, 0, 0, 0, 0, 198, 198, 214, 214, 254, 254, 238, 198, 130, 0],
  "y": [0, 0, 0, 0, 0, 0, 102, 102, 102, 102, 102, 102, 126, 62, 6, 126],
  "z": [0, 0, 0, 0, 0, 0, 126, 126, 12, 24, 24, 48, 48, 126, 126, 0],
  "ß": [0, 0, 0, 24, 60, 102, 102, 102, 124, 102, 102, 102, 124, 108, 96, 64],
  "ä": [0, 0, 0, 102, 102, 0, 60, 62, 6, 62, 126, 102, 102, 126, 62, 0],
  "ö": [0, 0, 0, 102, 102, 0, 60, 126, 102, 102, 102, 102, 102, 126, 60, 0],
  "ü": [0, 0, 0, 102, 102, 0, 102, 102, 102, 102, 102, 102, 102, 126, 62, 0],
};

// Title logo glyphs (custom big font), positioned absolutely.
const TITLE = [
  { ch: "*", x: 141, y: 16, w: 18, h: 22, bits: [20560, 63736, 30840, 63736, 32120, 16352, 8160, 16352, 90100, 262142, 131070, 262142, 131070, 16352, 8160, 16352, 24560, 63736, 30840, 63736, 30840, 0] },
  { ch: "B", x: 191, y: 16, w: 14, h: 26, bits: [5456, 16376, 8188, 16382, 8190, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8188, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8184, 0] },
  { ch: "O", x: 211, y: 16, w: 14, h: 26, bits: [1360, 4088, 6140, 16382, 8190, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "U", x: 231, y: 16, w: 14, h: 26, bits: [5140, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "N", x: 251, y: 16, w: 14, h: 26, bits: [5140, 15934, 7710, 15934, 7710, 15934, 7966, 16318, 8094, 16318, 8158, 16382, 8190, 16382, 8190, 16126, 7806, 16126, 7806, 15934, 7710, 15934, 7710, 15934, 7710, 0] },
  { ch: "C", x: 271, y: 16, w: 14, h: 26, bits: [1360, 4088, 6140, 16382, 8190, 15934, 7710, 15934, 7710, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7700, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "I", x: 291, y: 16, w: 14, h: 26, bits: [5460, 16382, 8190, 16382, 8190, 992, 480, 992, 480, 992, 480, 992, 480, 992, 480, 992, 480, 992, 480, 992, 5620, 16382, 8190, 16382, 8190, 0] },
  { ch: "N", x: 311, y: 16, w: 14, h: 26, bits: [5140, 15934, 7710, 15934, 7710, 15934, 7966, 16318, 8094, 16318, 8158, 16382, 8190, 16382, 8190, 16126, 7806, 16126, 7806, 15934, 7710, 15934, 7710, 15934, 7710, 0] },
  { ch: "G", x: 331, y: 16, w: 14, h: 26, bits: [1364, 4094, 6142, 16382, 8190, 15872, 7680, 15872, 7764, 16126, 7806, 16126, 7806, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "B", x: 379, y: 16, w: 14, h: 26, bits: [5456, 16376, 8188, 16382, 8190, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8188, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8184, 0] },
  { ch: "O", x: 399, y: 16, w: 14, h: 26, bits: [1360, 4088, 6140, 16382, 8190, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "U", x: 419, y: 16, w: 14, h: 26, bits: [5140, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 4088, 2040, 0] },
  { ch: "B", x: 439, y: 16, w: 14, h: 26, bits: [5456, 16376, 8188, 16382, 8190, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8188, 15934, 7710, 15934, 7710, 15934, 7710, 15934, 8030, 16382, 8190, 16376, 8184, 0] },
  { ch: "L", x: 459, y: 16, w: 14, h: 26, bits: [5120, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 8020, 16382, 8190, 16382, 8190, 0] },
  { ch: "E", x: 479, y: 16, w: 14, h: 26, bits: [5460, 16382, 8190, 16382, 8190, 15872, 7680, 15872, 8016, 16376, 8184, 16376, 8184, 15872, 7680, 15872, 7680, 15872, 7680, 15872, 8020, 16382, 8190, 16382, 8190, 0] },
  { ch: "S", x: 499, y: 16, w: 14, h: 26, bits: [1364, 4094, 6142, 16382, 8190, 15872, 7680, 15872, 7936, 16256, 8128, 4064, 2032, 1016, 508, 254, 126, 62, 30, 62, 5470, 16382, 8190, 16376, 8184, 0] },
  { ch: "*", x: 544, y: 16, w: 18, h: 22, bits: [10280, 30840, 63736, 30840, 64240, 8160, 16352, 8160, 49130, 131070, 262142, 131070, 262140, 8160, 16352, 8160, 16360, 30840, 63736, 30840, 61680, 0] },
];

// ---- audio.js ----
// PSG (YM-2149) sound engine for Bouncing Boubles.
// Faithful re-implementation of the game's per-frame sound engine at $B2
// (disassembly-derived): 3 tone channels + no envelope chip regs — the game
// programs volume/period registers directly each frame via Giaccess.
//
// Register map (PSG):
//  $00/$01 chA period fine/coarse   $02/$03 chB   $04/$05 chC
//  $06 noise period                 $07 mixer
//  $08/$09/$0A chA/B/C volume       $0B/$0C/$0D envelope

const PSG_CLOCK = 2000000; // 2 MHz ST
const TONE_PERIOD_BASE = 125000; // tone freq = clock / (16 * period)

class Psg {
  constructor(audio) {
    this.ctx = audio;
    this.master = audio.createGain();
    this.master.gain.value = 0.25;
    this.master.connect(audio.destination);

    // Square-wave oscillator per channel with a gain used as volume.
    this.ch = [];
    for (let i = 0; i < 3; i++) {
      const osc = audio.createOscillator();
      osc.type = 'square';
      osc.frequency.value = 440;
      const g = audio.createGain();
      g.gain.value = 0;
      osc.connect(g).connect(this.master);
      osc.start();
      this.ch.push({ osc, gain: g, period: 0, vol: 0 });
    }
    this.enabled = true;
  }

  setPeriod(chIdx, period) {
    const c = this.ch[chIdx];
    period = Math.max(1, Math.min(4095, period));
    if (c.period === period) return;
    c.period = period;
    const f = PSG_CLOCK / (16 * period);
    c.osc.frequency.setTargetAtTime(Math.min(20000, Math.max(1, f)), this.ctx.currentTime, 0.002);
  }

  setVolume(chIdx, vol) {
    const c = this.ch[chIdx];
    vol = Math.max(0, Math.min(15, vol & 15)); // PSG keeps low 4 bits
    if (c.vol === vol) return;
    c.vol = vol;
    const v = (vol / 15) * (vol / 15); // perceptual curve
    c.gain.gain.setTargetAtTime(vol === 0 ? 0 : v * 0.5, this.ctx.currentTime, 0.004);
  }

  muteAll() {
    for (let i = 0; i < 3; i++) this.setVolume(i, 0);
  }
}

// ---- game.js ----
// Bouncing Boubles — faithful web re-implementation of the 1987 Atari ST game
// by Paul Bininda (GFA-Basic). Logic derived from full disassembly of the
// original binary plus emulator observation. 50 Hz fixed-timestep, ST-High
// 640x400 monochrome presentation.




// ---------------------------------------------------------------------------
// Screen layout constants (original values)
const W = 640, H = 400;
const PLAY_LEFT = 112, PLAY_RIGHT = 575;      // walls (player/ball x range)
const BULLET_TOP = 50;                        // bullets die above this line
const FLOOR_Y = 373;                          // ball floor (fixed point 5976>>4)
const SHIP_Y = 370;                           // ship top y
const SHIP_START_X = 343;
const PLAYER_SPEED = 4;                       // px/frame
const PLAYER_MIN_X = 112, PLAYER_MAX_X = 575;
const BULLET_SPEED = 7;                       // px/frame up
const BULLET_MAX = 10;
const MG_INTERVAL = 6;                        // machine-gun: fire every 6th frame
const BULLET_H = 8;                           // bullet column height
const DEATH_FRAMES = 400;                     // player death freeze
const CLEAR_FRAMES = 200;                     // level-cleared wait
const GRACE_FRAMES = 70;                      // enemies activate after this
const LIVES_START = 5;
const LIVES_MAX = 20;
const EXTRA_LIFE_STEP = 300;                  // extra ship every 300 points

// keys with one-shot (edge) semantics
const LATCH_KEYS = new Set(['p', 'm', 'q', 'r', 'escape', ' ', 'enter']);

// Fixed point helpers (enemy coords are 16.16-ish: pixel = v >> 4)
const FIX = 16;

// ---------------------------------------------------------------------------
// Intro text (exact strings from the original binary, ATARI charset decoded)
const INTRO_LINES = [
  '', '', '', '', '',
  'Bouncing Boubles für den ATARI-ST Computer (S/W Monitor)',
  '', '', '', '',
  'C: 1987 Paul Bininda',
  '', '', '', '', '', '', '', '',
  'Bouncing Boubles wollen die Welt erobern!!!',
  '', '', '',
  'Setzen Sie ihren  Super Bouble Blaster ein um sich zu',
  'verteidigen.',
  '',
  'Sie können ihren Super Bouble Blaster mit dem Joystick oder',
  'mit folgenden Tasten bewegen:',
  '', '',
  ' <-----  <a>  oder <ö>                <s> oder <ä>  -----> ',
  '', '',
  'Sie können Hyper Bouble Blasting Bursts abschießen, indem',
  'Sie entweder den Feuerknopf des Joysticks oder die',
  'Leertaste drücken.',
  '', '', '',
  'Falls Sie eine Pause brauchen, drücken Sie die <ESC> Taste.',
  '', '', '',
  'Falls Sie einen Kampf beenden wollen, drücken Sie <R>.',
  '', '', '',
  'Jeweils nach 300 Punkten bekommen Sie einen neuen',
  'Super Bouble Blaster.',
  '', '', '', '', '', '', '', '',
  'Drücken Sie:',
  '', '',
  '<P> um normal zu spielen,',
  '', '',
  '<M> um mit MG zu spielen,',
  '',
  '<Q> um aufzuhören.',
];

const INTRO_DEMO_FRAMES = 700;   // phase 1: wave animates, no text
const INTRO_SCROLL_FRAMES = 1091; // phase 2: one text line per 16 frames conveyor

// ---------------------------------------------------------------------------
// RNG — the original uses XBIOS Random() (xorshift-ish LCG). We use a simple
// deterministic-on-demand PRNG; exact sequence match is not required.
let rngState = 0x2A5F17;
function rnd(n) { // uniform 0..n-1
  rngState ^= rngState << 13; rngState >>>= 0;
  rngState ^= rngState >> 17;
  rngState ^= rngState << 5; rngState >>>= 0;
  return rngState % n;
}

// ---------------------------------------------------------------------------
// Sprites drawn into an offscreen 1-bit canvas of 640x400.
// We keep a Uint8Array framebuffer (1 byte per pixel: 0/1) and blit, then
// convert to ImageData for display. XOR/SET draw modes as in the original.

class Screen {
  constructor() {
    this.pixels = new Uint8Array(W * H);
  }
  clear() { this.pixels.fill(0); }
  idx(x, y) { return y * W + x; }
  set(x, y, v) {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    this.pixels[y * W + x] = v;
  }
  get(x, y) {
    if (x < 0 || x >= W || y < 0 || y >= H) return 0;
    return this.pixels[y * W + x];
  }
  // draw sprite {w,h,bits} with bits as rows of ints (bit 15..0 left to right)
  draw(x, y, spr, mode = 2 /* 0=set,1=clear,2=xor */) {
    const { w, h, bits } = spr;
    for (let r = 0; r < h; r++) {
      const row = bits[r];
      let py = y + r;
      if (py < 0 || py >= H) continue;
      const base = py * W;
      for (let b = 0; b < w; b++) {
        if ((row >> (w - 1 - b)) & 1) {
          const px = x + b;
          if (px < 0 || px >= W) continue;
          const i = base + px;
          if (mode === 2) this.pixels[i] ^= 1;
          else if (mode === 1) this.pixels[i] = 0;
          else this.pixels[i] = 1;
        }
      }
    }
  }
  // horizontal mirror of sprite (bit order reversal per row)
  drawMirrored(x, y, spr, mode = 2) {
    const { w, h, bits } = spr;
    const rev = [];
    for (let r = 0; r < h; r++) {
      let v = 0;
      for (let b = 0; b < w; b++) if ((bits[r] >> b) & 1) v |= 1 << (w - 1 - b);
      rev.push(v);
    }
    this.draw(x, y, { w, h, bits: rev }, mode);
  }
  rect(x0, y0, x1, y1, v = 1) {
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) this.set(x, y, v);
  }
  frame(x0, y0, x1, y1, v = 1) {
    for (let x = x0; x <= x1; x++) { this.set(x, y0, v); this.set(x, y1, v); }
    for (let y = y0; y <= y1; y++) { this.set(x0, y, v); this.set(x1, y, v); }
  }
  dither(x0, y0, x1, y1) {
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++)
        this.pixels[y * W + x] = ((x + y) & 1) ? 1 : 0;
  }
  // TOS system font text, 8x16 cells; (x, yTop)
  text(x, yTop, str) {
    for (let i = 0; i < str.length; i++) {
      const g = FONT[str[i]];
      if (!g) continue;
      for (let r = 0; r < 16; r++) {
        const row = g[r];
        if (!row) continue;
        for (let b = 0; b < 8; b++) {
          if (row & (0x80 >> b)) {
            const px = x + i * 8 + b, py = yTop + r;
            if (px >= 0 && px < W && py >= 0 && py < H) this.pixels[py * W + px] = 1;
          }
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Enemy record layout mirrors the original's 44-byte records:
// { x, y, vx, vy, active, dying, anim, counts, move, bank, extra }
class Enemy {
  constructor() { this.reset(); }
  reset() {
    this.x = 0; this.y = 0; this.vx = 0; this.vy = 0;    // fixed point
    this.active = 0; this.dying = 0; this.anim = 0; this.counts = 0;
    this.move = null; this.leader = null; this.ox = 0; this.oy = 0; this.mode = 0;
    this.score = 0;
  }
}

class Bullet {
  constructor() { this.active = 0; this.x = 0; this.y = 0; }
}

// ---------------------------------------------------------------------------
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(W, H);
    this.screen = new Screen();
    this.audio = null;      // lazy (created on first user gesture)
    this.psg = null;
    this.keys = {};
    this.latch = {};        // one-shot latch set on keyDown, consumed by tick
    this.firePressed = false;   // edge
    this.mode = 'boot';    // boot -> intro -> game
    this.frame = 0;

    // game state
    this.lives = 0;
    this.score = 0;
    this.level = 0;
    this.mg = 0;
    this.extraThreshold = EXTRA_LIFE_STEP;
    this.enemies = Array.from({ length: 60 }, () => new Enemy());
    this.enemyCount = 0;
    this.alive = 0;
    this.bullets = Array.from({ length: BULLET_MAX }, () => new Bullet());
    this.popFlashes = [];
    this.shipX = SHIP_START_X;
    this.dying = 0;
    this.deathTimer = -1;
    this.quitFlag = 0;
    this.grace = 0;
    this.mgCooldown = 0;
    this.prevFire = 0;

    // sound engine state (mirrors original variables)
    this.snd = { volA: 0, volB: 0, volC: 0, mode: 0, duration: 0, t: 0 };

    // intro state
    this.introPhase = 0;
    this.scrollPos = 0;

    this.buildStatic();
    this.chrome = new Uint8Array(this.screen.pixels); // static layer snapshot
    this.enterIntro();

    // main 50Hz loop
    this.acc = 0;
    this.last = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      let dt = now - this.last;
      this.last = now;
      if (dt > 200) dt = 200;
      this.acc += dt;
      const step = 1000 / 50;
      let ran = 0;
      while (this.acc >= step && ran < 5) { this.tick(); this.acc -= step; ran++; }
      this.render();
    };
    requestAnimationFrame(loop);
  }

  ensureAudio() {
    if (!this.audio) {
      this.audio = new (window.AudioContext || window.webkitAudioContext)();
      this.psg = new Psg(this.audio);
      // boot rumble (original plays a PSG "explosion" at program start)
      this.bootRumble();
    }
    if (this.audio.state === 'suspended') this.audio.resume();
  }

  bootRumble() {
    // Original: noise burst, vol C=5, low tone periods, ~1s
    const ctx = this.audio;
    const dur = 0.9;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let seed = 12345;
    for (let i = 0; i < d.length; i++) {
      seed = (seed * 6519 + 17) & 0xffff;
      d[i] = ((seed & 0xff) / 128 - 1) * 0.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.4, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
    src.connect(g).connect(this.psg.master);
    src.start();
  }

  // -------------------------------------------------------------------------
  // Static screen: full-screen 50% dither, white sidebar + playfield panels,
  // thick black frame, title logo, sidebar labels (measured from the original).
  buildStatic() {
    const s = this.screen;
    s.clear();
    // 1. dither background (dark where (x+y) even)
    for (let y = 0; y < H; y++)
      for (let x = (y & 1); x < W; x += 2)
        s.pixels[y * W + x] = 1;
    // 2. white panels
    s.rect(1, 48, 103, 391, 0);    // sidebar
    s.rect(105, 48, 105, 391, 0);  // gap line between outer line and frame
    s.rect(112, 50, 591, 389, 0);  // playfield interior
    // 3. black frame lines/bands
    s.rect(1, 47, 105, 47, 1);     // sidebar top line
    s.rect(104, 47, 104, 392, 1);  // thin outer line
    s.rect(106, 47, 111, 392, 1);  // left frame band
    s.rect(592, 47, 597, 392, 1);  // right frame band
    s.rect(106, 47, 597, 49, 1);   // top frame band
    s.rect(2, 390, 597, 392, 1);   // bottom frame band
    // 4. title logo
    for (const g of TITLE) {
      for (let r = 0; r < g.h; r++) {
        const row = g.bits[r];
        for (let b = 0; b < g.w; b++) {
          if ((row >> (g.w - 1 - b)) & 1) s.set(g.x + b, g.y + r, 1);
        }
      }
    }
    // 5. sidebar labels
    s.text(24, 53, 'Ships:');
    s.text(24, 276, 'Level:');
    s.text(24, 340, 'Score:');
  }

  // -------------------------------------------------------------------------
  enterIntro() {
    this.mode = 'intro';
    this.introPhase = 0;
    this.introFrame = 0;
    this.lives = LIVES_START;
    this.score = 0;
    this.level = 40;
    this.muteSound();
    // build demo wave (level 40 composition) and paint ship
    this.setupLevel(40);
    this.finalDeath = 0;
    this.dying = 0;
    this.paused = false;
    this.conveyor = [];
  }

  startGame(mg) {
    this.mode = 'game';
    this.mg = mg;
    this.lives = LIVES_START;
    this.score = 0;
    this.extraThreshold = EXTRA_LIFE_STEP;
    this.level = 0;
    this.muteSound();
    this.finalDeath = 0;
    this.dying = 0;
    this.paused = false;
    this.startLevel();
  }

  startLevel() {
    this.setupLevel(this.level);
    this.grace = GRACE_FRAMES;
    this.deathTimer = -1;
    this.dying = 0;
    this.quitFlag = 0;
    this._debrisStage = -1;
    for (const b of this.bullets) b.active = 0;
    this.mgCooldown = 0;
    this.prevFire = 0;
  }

  // Level setup — exact spawner logic from $3844/$38xx dispatch
  setupLevel(level) {
    this.enemyCount = 0;
    this.alive = 0;
    for (const e of this.enemies) e.reset();
    this.shipX = SHIP_START_X;
    this.dying = 0;

    const spawnA = (i) => this.spawnBall(i);
    const spawnB = (i) => this.spawnBigBall(i);
    const spawnC = (i) => this.spawnBird(i);
    const crabGroup = (startIdx) => this.spawnCrabGroup(startIdx);

    if (level <= 4) {
      for (let i = 0; i < level + 3; i++) spawnA(i);
    } else if (level <= 9) {
      for (let i = 0; i < (level - 4) * 2; i += 2) spawnB(i);
    } else if (level <= 14) {
      const n = (level - 9) * 5;
      for (let i = 0; i < n; i += 2) spawnC(i);
    } else if (level === 15) {
      crabGroup(0);
    } else if (level === 16) {
      crabGroup(0); crabGroup(9);
    } else {
      let adj = level - ((40 - level) % 3);
      if (adj > 40) adj = 40;
      let i = 0;
      while (i < adj) {
        if (i === 0) {
          if (adj > 20) { crabGroup(0); i += 9; }
          if (adj > 30) { crabGroup(i); i += 9; }
        }
        if (i % 3 === 0) {
          if (i < adj - 1 && i % 6 === 0 && i < adj - 11) {
            for (let k = 0; k < 5; k++) { spawnC(i); i += 2; }
            i += 1;
          } else { spawnB(i); i += 1; }
        } else { spawnA(i); i += 1; }
      }
    }
    this.drawLevelNumber(level);
  }

  newEnemy() {
    if (this.enemyCount >= this.enemies.length) {
      this.enemies.push(new Enemy());
    }
    const e = this.enemies[this.enemyCount++];
    e.reset();
    return e;
  }

  // Type A — plain bouncing ball (spawner $2ED6)
  spawnBall(i) {
    const e = this.newEnemy();
    e.x = ((rnd(449) + 117)) << 4;
    e.y = (50 + ((i * 5) % 18)) << 4;
    const sign = rnd(2) ? -1 : 1;
    e.vx = sign * ((10 + (i % 15)) * (1 + (i % 3))) << 4;
    e.vy = 0;
    e.active = 1;
    e.counts = 1;
    e.score = 5;
    e.move = 'ball';
    this.alive++;
  }

  // Type B — big ball + dormant mini (spawner $3048)
  spawnBigBall(i) {
    const a = this.newEnemy();
    a.x = ((rnd(449) + 117)) << 4;
    a.y = (50 + ((i * 5) % 18)) << 4;
    const sign = rnd(2) ? -1 : 1;
    a.vx = sign * ((10 + (i % 15)) * (1 + (i % 3))) << 4;
    a.vy = 0;
    a.active = 1;
    a.counts = 1;
    a.score = 10;
    a.move = 'bigball';
    this.alive++;
    const b = this.newEnemy();
    b.score = 5;
    b.move = 'smallball';
    b.active = 0;
    a.companion = b;
  }

  // Eye/bird alien pair (spawner $3544)
  spawnBird(i) {
    if (this.birdCycle === undefined) this.birdCycle = 0;
    const idx = this.birdCycle % 5;
    const isLeader = idx === 0;
    this.birdCycle++;
    const e = this.newEnemy();
    e.x = ((rnd(449) + 117)) << 4;
    e.y = (50 + ((i * 5) % 18)) << 4;
    const sign = rnd(2) ? -1 : 1;
    e.vx = sign * ((10 + (i % 15)) * (1 + (i % 3))) << 4;
    e.vy = 0;
    e.active = 1;
    e.counts = 1;
    e.score = 5;
    e.move = 'bird';
    // companion: dormant bomb-dash released near ship column
    const b = this.newEnemy();
    b.score = 10;
    b.move = 'bombfall';
    b.active = 0;
    e.companion = b;
    if (!isLeader) {
      // attach to previous leader
      const lead = this.lastLeader;
      if (lead && lead.active) {
        e.mode = 1;
        e.leader = lead;
        const OFFX = [0, 176, -176, 528, -528];
        const OFFY = [0, 160, 160, 80, 80];
        e.ox = OFFX[idx]; e.oy = OFFY[idx];
      }
    } else {
      this.lastLeader = e;
      e.mode = 2; // leader flag (free-flyer with followers)
    }
    this.alive++;
  }

  // Crab group ($3226): lead + wingman + 4 bombs + 3 aimed shots.
  // Original alive-accounting: the GROUP counts as ONE enemy ($3538 adds 1);
  // shooting either crab decrements it once, the other dies by shared fate.
  spawnCrabGroup(startIdx) {
    const lead = this.newEnemy();
    lead.x = ((rnd(194) + 117)) << 4;
    lead.y = (100 + startIdx * 5) << 4;
    lead.vx = 0; lead.vy = 0;
    lead.active = 1;
    lead.counts = 1;
    lead.score = 50;
    lead.move = 'crablead';
    const wing = this.newEnemy();
    wing.x = lead.x + 256; wing.y = lead.y;
    wing.active = 1;
    wing.counts = 1;
    wing.score = 50;
    wing.move = 'wingman';
    wing.leader = lead;
    lead.wing = wing;
    this.alive++;   // one per group (original $3538)
    for (let k = 0; k < 4; k++) {
      const b = this.newEnemy();
      b.score = 10;
      b.move = 'bombfall';
      b.active = 0;
      lead.bombs = (lead.bombs || []).concat([b]);
    }
    for (let k = 0; k < 3; k++) {
      const b = this.newEnemy();
      b.score = 5;
      b.move = 'smallball';
      b.active = 0;
      b.x = lead.x; b.y = lead.y; b.vx = 0; b.vy = 0;
      lead.shots = (lead.shots || []).concat([b]);
    }
  }

  // -------------------------------------------------------------------------
  // Per-frame tick (50 Hz)
  tick() {
    this.frame++;
    // reset to static chrome, then dynamic elements draw on top
    this.screen.pixels.set(this.chrome);
    if (this.mode === 'intro') this.tickIntro();
    else if (this.mode === 'game') this.tickGame();
  }

  // ----- intro -----
  tickIntro() {
    const s = this.screen;
    this.introFrame++;
    if (this.introPhase === 0) {
      if (this.introFrame >= INTRO_DEMO_FRAMES) {
        this.introPhase = 1;
        this.introFrame = 0;
        this.scrollPos = 0;
        this.nextLine = 0;
        this.conveyor = [];
      }
    } else {
      // conveyor: text scrolls up 1px/frame; a new line is painted every 16px
      this.scrollPos++;
      if (this.scrollPos % 16 === 0 && this.nextLine < INTRO_LINES.length) {
        this.conveyor.push({ line: this.nextLine, y: 375 });
        this.nextLine++;
      }
      for (const c of this.conveyor) c.y -= 1;
      this.conveyor = this.conveyor.filter((c) => c.y > -16);
      for (const c of this.conveyor) {
        s.text(120, c.y, INTRO_LINES[c.line]);
      }
      if (this.scrollPos >= INTRO_SCROLL_FRAMES) {
        this.enterIntro();
        return;
      }
    }
    this.moveEnemiesFrame();
    this.drawShip(s, this.shipX, SHIP_Y);
    this.drawHUD();
    // key handling: P/M/Q skip to menu-select
    if (this.pressed('p')) { this.startGame(0); }
    else if (this.pressed('m')) { this.startGame(1); }
    else if (this.pressed('q')) { this.enterIntro(); }
  }

  // ----- game -----
  tickGame() {
    const s = this.screen;

    // pause (ESC): mute + freeze until any key, like the original
    if (this.pressed('escape')) {
      this.muteSound();
      this.paused = true;
    }
    if (this.paused) {
      this.muteSound();
      return;
    }

    // input & player movement ($720)
    if (!this.dying) {
      if (this.keys['arrowright'] || this.keys['s'] || this.keys['ä']) this.shipX += PLAYER_SPEED;
      if (this.keys['arrowleft'] || this.keys['a'] || this.keys['ö']) this.shipX -= PLAYER_SPEED;
      // pointer/touch: glide toward the pointer at the ship's normal speed
      if (this.pointerX != null && !this.keys['arrowleft'] && !this.keys['arrowright'] && !this.keys['a'] && !this.keys['s']) {
        const dx = this.pointerX - 8 - this.shipX;
        if (dx > 0) this.shipX += Math.min(PLAYER_SPEED, dx);
        else if (dx < 0) this.shipX -= Math.min(PLAYER_SPEED, -dx);
      }
      if (this.shipX > PLAYER_MAX_X) this.shipX = PLAYER_MAX_X;
      if (this.shipX < PLAYER_MIN_X) this.shipX = PLAYER_MIN_X;

      // fire
      const fireHeld = this.keys[' '] || this.keys['enter'];
      let fire = false;
      if (this.mg) {
        if (this.pressed(' ')) { fire = true; this.mgCooldown = MG_INTERVAL; }        // tap: immediate shot
        else if (fireHeld && --this.mgCooldown <= 0) { fire = true; this.mgCooldown = MG_INTERVAL; } // held: every 6th frame
        else if (!fireHeld) this.mgCooldown = 0;
      } else {
        if (this.pressed(' ')) fire = true;  // one shot per press
      }
      this.prevFire = fireHeld;
      if (fire) this.fireBullet();

      // R quits to menu
      if (this.pressed('r')) { this.enterIntro(); return; }
    }

    // advance bullets ($7AE)
    for (const b of this.bullets) {
      if (b.active) {
        b.y -= BULLET_SPEED;
        if (b.y < BULLET_TOP) b.active = 0;
      }
    }

    // enemies move & draw ($15E0/$1D04) — not during the 70-frame grace
    if (this.grace > 0) this.grace--;
    else this.moveEnemiesFrame();

    // ship draw + collision ($1A2A) — explosion sprite while dying
    if (!this.dying) {
      this.drawShipAndCollide();
    } else {
      s.draw(this.shipX, SHIP_Y + 3, SPRITES.ship_expl, 0);
    }

    // bullets draw + hits ($1880)
    this.drawBulletsAndHits();

    // final-death sequence: debris first half, "Game Over" second half
    if (this.finalDeath && this.deathTimer >= 0) {
      if (this.deathTimer >= DEATH_FRAMES / 2) {
        this.drawDeathDebris();
      } else {
        s.text(333, 218, 'Game');
        s.text(333, 234, 'Over');
      }
    }

    // score display ($90A)
    this.drawHUD();

    // sound engine frame ($B2)
    this.soundFrame();

    // level cleared / death timers
    if (this.alive === 0 && this.deathTimer < 0 && !this.dying) {
      this.deathTimer = CLEAR_FRAMES;
    }
    // stuck watchdog: field looks empty but counting enemies remain — mark
    // their positions on-screen so the state is diagnosable. Also triggers
    // when counting enemies linger OUTSIDE the playfield (unreachable).
    let visCount = 0;
    for (const e of this.enemies) {
      if (e.active && !e.dying && e.counts) {
        const px = e.x >> 4, py = e.y >> 4;
        if (px >= 112 && px <= 591 && py >= 50 && py <= 348) visCount++;
      }
    }
    if (visCount === 0 && this.alive > 0 && this.deathTimer < 0 && !this.dying) {
      if (++this._stuckTicks > 90) {
        s.text(150, 60, 'GHOSTS:');
        let gy = 80;
        for (const e of this.enemies) {
          if (!e.counts || !e.active || e.dying) continue;
          const px = e.x >> 4, py = e.y >> 4;
          if (px >= 112 && px <= 591 && py >= 50 && py <= 348) continue;
          s.text(150, gy, `${e.move}(${e.mode}) @ ${px},${py} off-field`);
          const mx = Math.max(113, Math.min(585, px));
          const my = Math.max(51, Math.min(388, py));
          s.rect(mx - 4, my - 4, mx + 4, my + 4, 1);
          s.frame(mx - 8, my - 8, mx + 8, my + 8, 1);
          gy += 16;
        }
      }
    } else this._stuckTicks = 0;
    if (this.deathTimer > 0) {
      this.deathTimer--;
      if (this.deathTimer === 0) {
        if (!this.dying) {
          this.level++;           // level cleared
          this.startLevel();
        } else {
          this.lives--;
          if (this.lives <= 0) {
            this.enterIntro();    // game over -> back to menu
          } else {
            this.dying = 0;
            this.finalDeath = 0;
            this.startLevel();    // replay same level
          }
        }
        return;
      }
    }

    // ship hit detection result handling
    if (this.hitDetected && this.deathTimer < 0) {
      this.hitDetected = false;
      this.dying = 1;
      this.deathTimer = DEATH_FRAMES;
      if (this.lives <= 1) this.finalDeath = 1;
      // sound: volB=22, volC=20, mode=1 (harsh crackle decay)
      this.snd.volB = 22; this.snd.volC = 20; this.snd.mode = 1;
    }
  }

  // HUD: level number, score digits, remaining-ship icons (redrawn per frame)
  drawHUD() {
    this.drawLevelNumber(this.level);
    this.drawScore();
    this.drawShipIcons();
  }

  fireBullet() {
    // Original spacing guarantee: bullets are 8 rows tall and separate by
    // ≥7px per tick of fire interval (MG cooldown = 42px). Fast input repeat
    // can violate that — a new bullet overlapping the previous one's tail
    // would pop instantly on it and teleport a kill to the nearest enemy.
    const sx = this.shipX + 8, sy = SHIP_Y - 7;
    for (const b of this.bullets) {
      if (b.active && b.x === sx && Math.abs(b.y - sy) < BULLET_H) return;
    }
    for (const b of this.bullets) {
      if (!b.active) {
        b.active = 1;
        b.x = sx;
        b.y = sy;
        // shoot sound: dur=20, volA=3, t=0
        this.snd.duration = 20;
        this.snd.volA = 3;
        this.snd.t = 0;
        return;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Enemy movement per mover type — faithful to original movers
  moveEnemiesFrame() {
    const s = this.screen;
    for (const e of this.enemies) {
      if (!e.active && !e.dying) continue;
      switch (e.move) {
        case 'ball': this.moveBall(e); break;
        case 'bigball': this.moveBigBall(e); break;
        case 'smallball': this.moveSmallBall(e); break;
        case 'bird': this.moveBird(e); break;
        case 'crablead': this.moveCrabLead(e); break;
        case 'wingman': this.moveWingman(e); break;
        case 'bombfall': this.moveBomb(e); break;
      }
    }
    // draw all (solid — we composite a fresh field each frame)
    for (const e of this.enemies) {
      if (!e.active) continue;
      if (e.dying) {
        const idx = e.move === 'crablead' || e.move === 'wingman' ? (e.anim >> 3) : (e.anim >> 2);
        const spr = SPRITES.death[Math.min(SPRITES.death.length - 1, idx)];
        s.draw((e.x >> 4) + (spr.xoff || 0), (e.y >> 4) + (spr.yoff || 0), spr, 0);
        continue;
      }
      // wingman mirrors the dying lead's explosion frames ($25b6)
      if (e.move === 'wingman' && e.mirrorDeath && e.leader) {
        const idx = e.leader.anim >> 3;
        const spr = SPRITES.death[Math.min(SPRITES.death.length - 1, idx)];
        s.draw((e.x >> 4) + (spr.xoff || 0), (e.y >> 4) + (spr.yoff || 0), spr, 0);
        continue;
      }
      const spr = this.spriteFor(e);
      s.draw((e.x >> 4) + (spr.xoff || 0), (e.y >> 4) + (spr.yoff || 0), spr, 0);
    }
  }

  spriteFor(e) {
    switch (e.move) {
      case 'ball': return SPRITES.ball;
      case 'bigball': return e.vy >= 0 ? SPRITES.bigball_b : SPRITES.bigball_a;
      case 'smallball': return SPRITES.smallball;
      case 'bird': return SPRITES.bird;
      case 'crablead': return SPRITES.crab_lead;
      case 'wingman': return SPRITES.crab_wing;
      case 'bombfall': return SPRITES.bomb;
      default: return SPRITES.ball;
    }
  }

  bounceSound() { this.snd.volB = 14; }

  moveBall(e) {
    if (e.dying) {
      e.vx -= (e.vx / 8) | 0;
      e.vy -= (e.vy / 8) | 0;
      e.anim++;
      if (e.anim >= 44) e.active = 0;
      return;
    }
    e.vy += 25;
    e.x += e.vx >> 4;
    e.y += e.vy >> 4;
    if (e.x < 112 << 4) { e.x = 112 << 4; e.vx = -e.vx; this.bounceSound(); }
    if (e.x > 575 << 4) { e.x = 575 << 4; e.vx = -e.vx; this.bounceSound(); }
    if (e.y > 5976) {
      e.vy = -e.vy;
      e.y += e.vy >> 4;
      e.vy += 160;
      this.bounceSound();
    }
  }

  moveBigBall(e) {
    this.moveBall(e);
    if (!e.dying && e.companion && !e.companion.active && e.vy > 0) {
      if (Math.abs((e.x >> 4) - this.shipX) <= 18) {
        e.companion.x = e.x;
        e.companion.y = e.y;
        e.companion.vx = 0;
        e.companion.vy = 64;
        e.companion.active = 1;
      }
    }
  }

  moveSmallBall(e) {
    if (e.dying) {
      // common death animation (blast) at the impact point — deadly residual
      e.anim++;
      if (e.anim >= 44) e.active = 0;
      return;
    }
    // direct adds (mover $261A): Δpx = v/16
    e.y += e.vy;
    e.x += e.vx;
    // wall/floor contact: explode with the common blast (original sets +0A=1)
    if (e.y > 5976) {
      e.y = 5976;
      e.dying = 1; e.anim = 0;
      this.snd.volC = 20;
      return;
    }
    if (e.x < 112 << 4 || e.x > 575 << 4) {
      e.x = Math.max(112 << 4, Math.min(575 << 4, e.x));
      e.dying = 1; e.anim = 0;
      this.snd.volC = 20;
    }
  }

  moveBird(e) {
    if (e.dying) {
      // original $20BE dying branch: frozen in place, explosion frames only
      e.anim++;
      if (e.anim >= 44) e.active = 0;
      return;
    }
    if (e.mode === 1 && e.leader && e.leader.active && !e.leader.dying) {
        e.x = e.leader.x + e.ox;
        e.y = e.leader.y + e.oy;
        e.vx = e.leader.vx;
        e.vy = e.leader.vy;
        // keep formation members inside the reachable band (the original's
        // formations stay well inside it while flying)
        if (e.x < 112 << 4) e.x = 112 << 4;
        if (e.x > 575 << 4) e.x = 575 << 4;
        if (e.y < 50 << 4) e.y = 50 << 4;
        if (e.y > 348 << 4) e.y = 348 << 4;
    } else if (e.mode === 1 && (!e.leader.active || e.leader.dying)) {
        e.mode = 2;
    }
    if (e.mode === 0 || e.mode === 2) {
      // home on player
      const px = this.shipX << 4;
      if (e.x > px) e.vx -= 12; else if (e.x < px) e.vx += 12;
      const rowY = 0xDB0; // py 219
      if (e.y < rowY) e.vy += 12; else if (e.y > rowY) e.vy -= 12;
      // speed cap
      const cap = (v) => Math.abs(v) > 800 ? v - (v / 16 | 0) : v;
      e.vx = cap(e.vx); e.vy = cap(e.vy);
      e.x += e.vx >> 4;
      e.y += e.vy >> 4;
      // walls bounce (no floor)
      if (e.x < 112 << 4) { e.x = 112 << 4; e.vx = -e.vx; this.bounceSound(); }
      if (e.x > 575 << 4) { e.x = 575 << 4; e.vx = -e.vx; this.bounceSound(); }
      // vertical: keep birds inside the reachable band — bullets never travel
      // below their spawn row (356), so a bird straying lower could never be
      // shot and would soft-lock the level
      if (e.y < 50 << 4) { e.y = 50 << 4; e.vy = Math.abs(e.vy); }
      if (e.y > 348 << 4) { e.y = 348 << 4; e.vy = -Math.abs(e.vy); }
      // release companion bomb near ship column
      if (e.companion && !e.companion.active) {
        const bx = e.x >> 4;
        if (Math.abs(bx - this.shipX) <= 8 && !this.dying) {
          e.companion.x = e.x;
          e.companion.y = e.y;
          e.companion.vx = 0;
          e.companion.vy = 96;
          e.companion.active = 1;
        }
      }
    }
  }

  moveCrabLead(e) {
    if (e.dying) {
      e.anim++;
      if (e.anim >= 88) e.active = 0;
      return;
    }
    // drift away from the player ($234A: threshold x=351, range 192..479 px)
    if (this.shipX > 351) { if (e.x > 192 << 4) e.x -= 64; }
    else if (this.shipX < 351) { if (e.x < 480 << 4) e.x += 64; }
    // bomb drop ($23ac): every 10th frame when (crab_x - ship_x) is a
    // multiple of 60 px — two bombs at -14 px / +15 px
    e.timer1 = (e.timer1 || 0) + 1;
    if (e.timer1 % 10 === 0) {
      const dx = (e.x >> 4) - this.shipX;
      if (dx % 60 === 0) {
        const bombs = e.bombs || [];
        if (bombs[0] && !bombs[0].active) {
          bombs[0].active = 1;
          bombs[0].x = e.x - 224; bombs[0].y = e.y; bombs[0].vx = 0; bombs[0].vy = 96;
        }
        if (bombs[1] && !bombs[1].active) {
          bombs[1].active = 1;
          bombs[1].x = e.x + 240; bombs[1].y = e.y; bombs[1].vx = 0; bombs[1].vy = 96;
        }
      }
    }
    // launch aimed shot every 10th frame — intercept solution toward (player.x, row 389)
    e.timer2 = (e.timer2 || 0) + 1;
    if (e.timer2 % 10 === 0) {
      const shots = e.shots || [];
      for (const b of shots) {
        if (!b.active) {
          b.active = 1;
          b.x = e.x; b.y = e.y;
          b.vy = 64;                                  // 4 px/frame
          const dy = Math.max(1, 389 - (e.y >> 4));
          b.vx = (((this.shipX - (e.x >> 4)) * 64) / dy) | 0;
          break;
        }
      }
    }
  }

  moveWingman(e) {
    // Original $256C: mirrors the lead (previous record) at +16 px. Shooting
    // the wing marks the lead dying ($2590); a dying lead is mirrored (its
    // explosion frames) and when it deactivates the wing does too.
    const l = e.leader;
    if (e.dying) {
      if (l && !l.dying) l.dying = 1;
      e.anim++;
      if (e.anim >= 88) e.active = 0;
      return;
    }
    if (!l) return;
    e.x = l.x + 256;
    e.y = l.y;
    if (l.dying) {
      e.mirrorDeath = true;
      if (!l.active) e.active = 0;   // lead's explosion finished → wing gone
    } else {
      e.mirrorDeath = false;
    }
  }

  moveBomb(e) {
    if (e.dying) { e.anim++; if (e.anim >= 44) { e.active = 0; } return; }
    e.y += 96; // 6 px/frame
    if (e.y >= 5976) { e.active = 0; }
  }

  // -------------------------------------------------------------------------
  // Ship draw + pixel collision ($1A2A) — ship sprite drawn at (shipX, 370)
  drawShipAndCollide() {
    const s = this.screen;
    const spr = SPRITES.ship;
    const x = this.shipX, y = SHIP_Y;
    // Original collision ($1A2A): the ship dies when its sprite overlaps ANY
    // drawn pixel — enemies, bombs, and the RESIDUAL explosion frames of
    // dying enemies (they stay deadly for their whole 44/88-frame animation).
    let hit = false;
    for (let r = 0; r < spr.h && !hit; r++) {
      const row = spr.bits[r];
      for (let b = 0; b < spr.w && !hit; b++) {
        if ((row >> (spr.w - 1 - b)) & 1) {
          const px = x + b, py = y + r;
          if (s.get(px, py)) hit = true;
        }
      }
    }
    if (hit && !this.dying) this.hitDetected = true;
    this.drawShip(s, this.shipX, SHIP_Y);
  }

  drawShip(s, x, y) {
    s.draw(x, y, SPRITES.ship, 0);
  }

  // -------------------------------------------------------------------------
  // Bullets draw + pixel hits ($1880)
  drawBulletsAndHits() {
    const s = this.screen;
    for (const b of this.bullets) {
      if (!b.active) continue;
      // check hit: any solid pixel in the bullet column?
      let hit = false;
      for (let r = 0; r < BULLET_H; r++) {
        if (s.get(b.x, b.y + r)) { hit = true; break; }
      }
      if (hit) {
        b.active = 0;
        this.popFlashes.push({ x: b.x, y: b.y, t: this.frame });
        this.killNearestEnemy(b.x, b.y);
      } else {
        for (let r = 0; r < BULLET_H; r++) s.set(b.x, b.y + r, 1);
      }    }
    // kill-trace markers: show exactly where each bullet terminated
    this.popFlashes = this.popFlashes.filter((f) => this.frame - f.t < 12);
    for (const f of this.popFlashes) {
      for (let d = -3; d <= 3; d++) {
        s.set(f.x + d, f.y, 1);
        s.set(f.x, f.y + d, 1);
      }
    }
  }

  killNearestEnemy(bx, by) {
    // Original $16EE: nearest ACTIVE record (dying ones included — their
    // explosion absorbs the hit), Manhattan distance in <<4 units with the
    // bullet position centered ((bx-8, by-8) << 4).
    const cx = (bx - 8) << 4, cy = (by - 8) << 4;
    let best = null, bestD = 32000;
    for (const e of this.enemies) {
      if (!e.active) continue;
      const d = Math.abs(e.x - cx) + Math.abs(e.y - cy);
      if (d < bestD) { bestD = d; best = e; }
    }
    if (best) this.killEnemy(best);
  }

  killEnemy(e) {
    // Original $179A: already-dying records absorb the hit with no effect.
    if (e.dying || !e.active) return;
    e.dying = 1;
    e.anim = 0;
    this.addScore(e.score);
    if (e.counts) this.alive--;
    this.snd.volC = 20;
  }

  addScore(pts) {
    this.score += pts;
    if (this.score >= this.extraThreshold) {
      this.extraThreshold += EXTRA_LIFE_STEP;
      if (this.lives < LIVES_MAX) this.lives++;
      this.drawShipIcons();
    }
  }

  // -------------------------------------------------------------------------
  // Sound engine — exact per-frame PSG register formulas ($B2)
  // Channels: A = shoot zap (period driven), B = bounce thud, C = explosion.
  soundFrame() {
    if (!this.psg) return;
    const snd = this.snd;
    if (snd.duration > 0) { snd.duration--; snd.volA += 16; }
    const t = snd.t++;

    // channel A: volume and warbling period
    const regVolA = Math.min(13, Math.abs(snd.duration - 2 * ((t / 2) | 0)));
    this.psg.setVolume(0, regVolA);
    this.psg.setPeriod(0, Math.max(1, Math.abs(snd.volA - 5 * ((t / 2) | 0))));

    // channel B/C envelopes
    if (snd.mode !== 0) {
      if (t % 8 === 0) { snd.volB--; snd.volC--; if (snd.volC <= 0) snd.mode = 0; }
    } else {
      snd.volB = Math.max(0, snd.volB - 1);
      if (t % 3 === 0) snd.volC = Math.max(0, snd.volC - 1);
    }
    const regVolB = snd.mode !== 0
      ? Math.min(15, Math.abs(snd.volB - 2 * ((t / 3) | 0)))
      : Math.min(Math.max(0, snd.volB), 13);
    this.psg.setVolume(1, regVolB);
    const regVolC = Math.min(15, Math.abs(snd.volC - 2 * ((t / 2) | 0)));
    this.psg.setVolume(2, regVolC);
  }

  muteSound() {
    this.snd = { volA: 0, volB: 0, volC: 0, mode: 0, duration: 0, t: 0 };
    if (this.psg) {
      this.psg.muteAll();
      // boot-table tone periods for B/C (low thud/rumble), A driven per-frame
      this.psg.setPeriod(1, 3816);
      this.psg.setPeriod(2, 4072);
    }
  }

  // -------------------------------------------------------------------------
  // Drawing helpers
  drawLevelNumber(level) {
    const s = this.screen;
    s.rect(24, 292, 60, 308, 0);
    const tens = Math.floor(level / 10), ones = level % 10;
    let str = '';
    if (tens > 0) str += String(tens);
    str += String(ones);
    s.text(24, 292, str);
  }

  drawScore() {
    const s = this.screen;
    s.rect(24, 357, 80, 373, 0);
    const str = String(this.score).padStart(6, '0').slice(-6);
    for (let i = 0; i < 6; i++) {
      const d = +str[i];
      const spr = SPRITES.digits[d];
      s.draw(24 + i * 8, 358, spr, 0);
    }
  }

  drawShipIcons() {
    const s = this.screen;
    s.rect(8, 69, 106, 186, 0);
    const XS = [10, 34, 58, 82], YS = [70, 94, 118, 142, 166];
    const n = Math.min(19, this.lives - 1);
    for (let k = 0; k < n; k++) {
      const x = XS[k % 4], y = YS[(k / 4) | 0];
      s.draw(x, y, SPRITES.ship, 0);
    }
  }

  drawDeathDebris() {
    // Original: pseudo-random garbage rows OR-ed at center (336,219), staged
    const s = this.screen;
    const stage = Math.max(0, Math.min(13, ((DEATH_FRAMES - this.deathTimer) / 15) | 0));
    let seed = 0x2A5F + stage * 977;
    const rndv = () => { seed = (seed * 0x1AFB + 0x1FCCD) & 0x7FFFFFFF; return seed; };
    const bx = 336, by = 219;
    for (let r = 0; r < 30; r++) {
      const w1 = rndv() & 0xffff, w2 = rndv() & 0xffff, w3 = rndv() & 0xffff;
      for (let b = 0; b < 48; b++) {
        const v = ((b < 16 ? w1 : b < 32 ? w2 : w3) >> (b % 16)) & 1;
        if (v) s.set(bx - 24 + b, by + r, 1);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Render framebuffer to canvas
  render() {
    const px = this.imageData.data;
    const buf = this.screen.pixels;
    for (let i = 0, j = 0; i < buf.length; i++, j += 4) {
      const v = buf[i] ? 0 : 255;
      px[j] = v; px[j + 1] = v; px[j + 2] = v; px[j + 3] = 255;
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  // -------------------------------------------------------------------------
  keyDown(code) {
    this.ensureAudio();
    if (this.paused) {
      // pause waits for any key (original behaviour); it consumes the press
      this.paused = false;
      this.muteSound();
      this.keys[code] = false;
      this.latch[code] = false;
      return;
    }
    this.keys[code] = true;
    // only one-shot keys use the latch; movement keys are level-triggered
    if (LATCH_KEYS.has(code)) this.latch[code] = true;
  }
  keyUp(code) {
    this.keys[code] = false;
  }
  // consume a one-shot key press (true only once per physical press)
  pressed(code) {
    if (this.latch[code]) { this.latch[code] = false; return true; }
    return false;
  }
}

// ---- main.js ----

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
