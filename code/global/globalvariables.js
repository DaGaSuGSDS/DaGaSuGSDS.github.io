// GENERAL
let board;
let fps = 0;
let lastTime = 0;
let timestopped = false;
const isInMobile = matchMedia('(pointer:coarse)').matches ||
  (navigator.maxTouchPoints > 0) ||
  navigator.userAgentData?.mobile === true;

// GAME_STATES
const GAME_STATES = { INIT_MENU :0, GAME: 1, PAUSE_MENU:2, CUTSCENE: 3, GAMEOVER_MENU: 4}
let actualGameState = GAME_STATES.PAUSE_MENU;

// PLAYER
let player;
let score;
let bestY;
let bestScoreAllTime = parseInt(localStorage.getItem("bestScoreAllTime")) || 0;
const mobileControlType = { pad:0, swipe:1, }
let mobileType = mobileControlType.pad;
let buffer_toggle = !isInMobile || mobileType == mobileControlType.swipe;
let scoreMultiplier = 5;

// ANIMATION
let globalAnimTime = 0;
const goNextFrame = 0.15;
let globalAnimPos = 0;
const globalXValues = 4;

// GENERATION
let spawnrate;
let difficulty;
let lastGenerated;
let lock_spawn;