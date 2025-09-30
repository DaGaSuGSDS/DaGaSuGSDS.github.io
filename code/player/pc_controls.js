const keys = {
	up:false,
	down:false,
	left:false,
	right:false,
}

document.onkeydown = function(e){
    if (e.key === "ArrowUp" || e.keyCode === 87) 	keys.up = true;
    if (e.key === "ArrowDown" || e.keyCode === 83) 	keys.down = true;
    if (e.key === "ArrowLeft" || e.keyCode === 65) 	keys.left = true;
    if (e.key === "ArrowRight" || e.keyCode === 68) keys.right = true;
};
document.onkeyup = function(e){
    if (e.key === "ArrowUp" || e.keyCode === 87) 	keys.up = false;
    if (e.key === "ArrowDown" || e.keyCode === 83) 	keys.down = false;
    if (e.key === "ArrowLeft" || e.keyCode === 65) 	keys.left = false;
    if (e.key === "ArrowRight" || e.keyCode === 68) keys.right = false;
    //if (e.keyCode === 32) timestopped = !timestopped;
};

function pc_controls(){
	let dx = 0, dy = 0;
	
	if(keys.up) dy--;
	if(keys.down) dy++;
	if(keys.left) dx--;
	if(keys.right) dx++;

	return {dx, dy};
}