const GameMenu = new Menu();
function PAUSE_GAME(){ if(board && !board.GameOver) switchGameState(GAME_STATES.PAUSE_MENU) }
GameMenu.addObject(
	new Button(pause_button_img, .80, -.80, 100, 100, PAUSE_GAME, 0)
)