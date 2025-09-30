const keys = {
	up:false,
	down:false,
	left:false,
	right:false,
}

document.onkeydown = function(e){
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") 		keys.up = true;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") 	keys.down = true;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") 	keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") 	keys.right = true;
};
document.onkeyup = function(e){
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") 		keys.up = false;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") 	keys.down = false;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") 	keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") 	keys.right = false;
};

function pc_controls(){
	let dx = 0, dy = 0;
	
	if(keys.up) dy--;
	if(keys.down) dy++;
	if(keys.left) dx--;
	if(keys.right) dx++;

	return {dx, dy};
}