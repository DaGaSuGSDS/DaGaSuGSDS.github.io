const GameMenu = new Menu();
GameMenu.addObject(
	new Button(pause_button_img, .80, -.80, 100, 100, 
		()=>{
			if(board && !board.GameOver) switchGameState(GAME_STATES.PAUSE_MENU)
		}, 0)
)