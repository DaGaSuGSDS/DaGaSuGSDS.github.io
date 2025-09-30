const PauseMenu = new Menu();
PauseMenu.addObject(new Curtain())
PauseMenu.addObject(
	new Button(pause_button_img, 0, 0, 200, 200, 
		()=>{
			switchGameState(GAME_STATES.GAME)
		}, 1)
)
PauseMenu.addObject(
	new Button(pause_button_img, 0, -0.5, 150, 150, 
		()=>{
			GameReset();
			switchGameState(GAME_STATES.GAME);
		}, 2)
)
const button_pad = new Button(
	controls_button_img, -0.3, 0.5, 150,150,
	()=>{
		button_pad.active = false;
		button_swipe.active = true;
		mobileType = mobileControlType.pad;
		buffer_toggle = false;
	},
	0
)
const button_swipe = new Button(
	controls_button_img, 0.3, 0.5, 150,150,
	()=>{
		button_swipe.active = false;
		button_pad.active = true;
		mobileType = mobileControlType.swipe;
		buffer_toggle = true;
	},
	1
)
button_pad.active = mobileType != mobileControlType.pad;
button_swipe.active = mobileType != mobileControlType.swipe;
if(isInMobile){
	PauseMenu.addObject(button_pad)
	PauseMenu.addObject(button_swipe)
}