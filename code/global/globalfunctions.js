// EVENTS
const on = (elem, type, fn) => elem.addEventListener(type, fn, { passive:false });

// ANGLE
function grad(rad){ return 180*rad/Math.PI; }
function getDistance(a,b){ return Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2))}
function normalizedVector(a,b){
	const d = getDistance(a,b)
	return {
		x: (b.x-a.x)/d,
		y: (b.y-a.y)/d
	}
}
function getAngle(a, b) { const ang = grad(Math.atan2(b.y-a.y, b.x-a.x)); return ang < 0 ? ang + 360 : ang; }

// ANIMATION
function nextAnimationFrame(deltaTime){ 
	globalAnimTime += deltaTime;
	if(globalAnimTime > goNextFrame){
		globalAnimTime = 0;
		globalAnimPos = (globalAnimPos + 1) % globalXValues;
	}
}
function drawPropImage(img_ref, x, y, w, h, id = 0){
	ctx.drawImage(img_ref, 
	globalAnimPos * img_ref.width / globalXValues, 
	id * img_ref.height / img_ref.cutsY, 
	img_ref.width / globalXValues, 
	img_ref.height / img_ref.cutsY,
	x * proportion, y * proportion, w * proportion, h * proportion);
}
function drawFixedImage(img_ref, x, y, w, h, id = 0){
	ctx.drawImage(img_ref, 
	globalAnimPos * img_ref.width / globalXValues, 
	id * img_ref.height / img_ref.cutsY, 
	img_ref.width / globalXValues, 
	img_ref.height / img_ref.cutsY,
	c.width/2 * x - w*proportion/2, c.height/2 * y - h*proportion/2, w * proportion, h * proportion);
}
function drawFixedInWidthImage(img_ref, x, y, w, h, id = 0){
	ctx.drawImage(img_ref, 
	globalAnimPos * img_ref.width / globalXValues, 
	id * img_ref.height / img_ref.cutsY, 
	img_ref.width / globalXValues, 
	img_ref.height / img_ref.cutsY,
	c.width/2 * x - w*proportion/2, c.width/2 * y - h*proportion/2, w * proportion, h * proportion);
}

// COLLISIONS
function colPointRect(px, py, rx, ry, rw, rh){
	const realRX = rx - rw/2;
	const realRY = ry - rh/2;
	
	return px >= realRX
	&& py >= realRY
	&& px < realRX + rw
	&& py < realRY + rh
}

// GAME_STATE
function switchGameState(state){
	actualGameState = state;
	isPointerDown = false;
}