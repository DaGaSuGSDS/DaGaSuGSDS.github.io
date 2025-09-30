function GameUpdate(deltaTime){
	if(board){
		board.update(deltaTime);
		movePlayer();
		updateScore();
	}
}
function GameDraw(deltaTime){
	nextAnimationFrame(deltaTime);
	board.draw();
	drawControls();
	drawScore();
	drawFps();
}
function GameReset(){
	player = null;
	board = new Board(9, "rgb(223,226,231)", "rgb(143, 161, 171)", "rgb(191,142,119)");
	player = new King(4,0)
	score = 0;
	bestY = player.y;
	timestopped = false;
	lastTime = 0;
	
	spawnrate = 5;
	difficulty = 0;
	lastGenerated = -1;
	
	board.setCenterPiece(player);
	board.addPiece(player);
}
function GameLoop(deltaTime){
	clearCanvas();
	switch(actualGameState){
		case GAME_STATES.INIT_MENU:
			break;
		case GAME_STATES.GAME:
			generate();
			GameUpdate(deltaTime);
			GameDraw(deltaTime);
			GameMenu.show();
			break;
		case GAME_STATES.PAUSE_MENU:
			GameDraw(deltaTime);
			PauseMenu.show();
			break;
		case GAME_STATES.CUTSCENE:
			break;
		case GAME_STATES.GAMEOVER_MENU:
			GameDraw(deltaTime);
			GameOverMenu.show();
			break;
	}
}