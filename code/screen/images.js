function addImage(src, cutsY = 1){ const img = new Image(); img.src = src; img.cutsY = cutsY; return img; }
const king_img = 			addImage("img/king.png");
const pawn_img = 			addImage("img/pawn.png");
const rook_img = 			addImage("img/rook.png");
const bishop_img = 			addImage("img/bishop.png");
const queen_img = 			addImage("img/queen.png");
const horse_img = 			addImage("img/horse.png");
const pause_button_img = 	addImage("img/pauseplay.png", 3);
const controls_button_img = addImage("img/pad_swipe.png", 2);