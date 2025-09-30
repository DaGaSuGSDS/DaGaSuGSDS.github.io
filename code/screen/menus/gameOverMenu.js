const GameOverMenu = new Menu();
GameOverMenu.addObject(new Curtain())
GameOverMenu.addObject(
	new Button(pause_button_img, 0, 0, 200, 200, 
		()=>{
			GameReset();
			switchGameState(GAME_STATES.GAME);
		}, 2)
)