function movePlayer(){
	if(!timestopped && actualGameState == GAME_STATES.GAME){
		const {dx, dy} = isInMobile ? mobile_controls() : pc_controls();
		board.cameraYFlagClimb = (dy < 0);
		board.cameraYFlagGoDown = (dy > 0);
		player.testMove(dx,dy)
	}
}

function updateScore(){
    if(player.y < bestY){
        score += 10 * (difficulty+1);
        bestY = player.y;
		
		bestScoreAllTime = parseInt(localStorage.getItem("bestScoreAllTime")) || 0;
        if(score > bestScoreAllTime){
            localStorage.setItem("bestScoreAllTime", score);
			bestScoreAllTime = score;
        }
    }
}

function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = ""+Math.round(realTextSize * proportion)+"px consolas";
    ctx.fillText("Score: "+score+" | MaxHeight: "+(-bestY), 0, -c.height/2 + 20);
}

function drawFps(){
    ctx.fillStyle = "black";
    ctx.font = ""+Math.round(realTextSize * proportion)+"px consolas";
    ctx.fillText("FPS: "+Math.round(fps), 0, -c.height/2 + 40);
}
function drawHighScore(){
    ctx.fillStyle = "black";
    ctx.font = ""+Math.round(realTextSize * proportion)+"px consolas";
    ctx.fillText("HighScore: "+bestScoreAllTime, 0, -c.height/2 + 40);
}
