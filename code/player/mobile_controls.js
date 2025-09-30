let pointerId = null;
let padActive = false;
let swipeEnded = false;
let isPointerDown = false;

const pointerStart = {x:0, y:0, t:0,}
const pointerActual = {x:0, y:0, t:0,}

const minMoveDist = 20;
const maxMoveDist = 80;
const padRadius = 40;
const padLineWidth = 5;
const padAlpha = 0.4;
const padColor = "red";
const padLineColor = "#333";

const maxSwipeTime = 2400;

on(c, "pointerdown", (e)=>{
	e.preventDefault();
	
	if(actualGameState == GAME_STATES.GAME){
		pointerId = e.pointerId;
		switch(mobileType){
			case mobileControlType.pad:
				padActive = true;
				break;
			default:
				break;
		}
		
	}
	c.setPointerCapture(e.pointerId);
	
	isPointerDown = true;
	
	pointerStart.x = pointerActual.x = e.clientX;
	pointerStart.y = pointerActual.y = e.clientY;
	pointerStart.t = performance.now();
})
on(c, "pointermove", (e)=>{
	if (e.pointerId !== pointerId && mobileType != mobileControlType.pad) return;
	e.preventDefault();
	pointerActual.x = e.clientX;
	pointerActual.y = e.clientY;
})

const endTouch = (e) => {
	if (e.pointerId != pointerId) return;
	padActive = false;
	pointerId = null;
	isPointerDown = false;
}
const specialEndTouch = (e) => {
	if (e.pointerId != pointerId) return;
	pointerId = null;
	isPointerDown = false;
	padActive = false;
	switch(mobileType){
		case mobileControlType.pad:
			break;
		case mobileControlType.swipe:
			swipeEnded = true;
			pointerActual.x = e.clientX;
			pointerActual.y = e.clientY;
			pointerActual.t = performance.now();
			break;
		default:
			break;
	}
}

on(c, "pointerup", specialEndTouch);
on(c, "pointercancel", endTouch);
on(c, "lostpointercapture", endTouch);
on(document, 'gesturestart', (e)=>e.preventDefault());

window.addEventListener("blur", () => { padActive = false; pointerId = null; });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") { padActive = false; pointerId = null; }
});

function getDirectionByAngle(){
	const angle = getAngle(pointerStart, pointerActual);
	let dx = 0, dy = 0;	
	
	if(getDistance(pointerActual, pointerStart) >= minMoveDist * proportion){
		if(angle > 337.5 || angle <= 22.5){
			dx = 1; dy = 0;
		}else if(angle > 22.5 && angle <= 67.5){
			dx = 1; dy = 1;
		}else if(angle > 67.5 && angle <= 112.5){
			dx = 0; dy = 1;
		}else if(angle > 112.5 && angle <= 157.5){
			dx = -1; dy = 1;
		}else if(angle > 157.5 && angle <= 202.5){
			dx = -1; dy = 0;
		}else if(angle > 202.5 && angle <= 247.5){
			dx = -1; dy = -1;
		}else if(angle > 247.5 && angle <= 292.5){
			dx = 0; dy = -1;
		}else if(angle > 292.5 && angle <= 337.5){
			dx = 1; dy = -1;
		}
	}
	return {dx, dy};
}
function mobile_controls(){
	let dx = 0, dy = 0;
	let d;
	switch(mobileType){
		case mobileControlType.pad:
			if(padActive){
				d = getDirectionByAngle();
				dx = d.dx;
				dy = d.dy;
			}
			break;
		case mobileControlType.swipe:
			if(swipeEnded){
				swipeEnded = false;
				if(pointerActual.t - pointerStart.t <= maxSwipeTime){
					d = getDirectionByAngle();
					dx = d.dx;
					dy = d.dy;
				}
			}
			break;
		default:
			break;
	}
	return {dx, dy}
}
function getActualPointer(){
	const pa = {
		x: pointerActual.x, 
		y: pointerActual.y
	};
	const pr = {
		x: pointerStart.x, 
		y: pointerStart.y
	};
	if(getDistance(pa,pr) > maxMoveDist * proportion){
		const v = normalizedVector(pr,pa);
		return {
			x: pr.x + v.x * maxMoveDist * proportion,
			y: pr.y + v.y * maxMoveDist * proportion
		}
	}
	return pa;
}
function drawControls(){
	if(isInMobile){
		switch(mobileType){
			case mobileControlType.pad:
				if(padActive && actualGameState == GAME_STATES.GAME){
					layer_ctx.save();
					
					const {x, y} = getActualPointer();
					
					layer_ctx.lineWidth = padLineWidth;
					layer_ctx.fillStyle = padColor;
					layer_ctx.strokeStyle = padLineColor;
					
					layer_ctx.beginPath()
					layer_ctx.moveTo(pointerStart.x, pointerStart.y)
					layer_ctx.lineTo(x, y)
					layer_ctx.closePath()
					layer_ctx.stroke();
					
					layer_ctx.beginPath()
					layer_ctx.arc(pointerStart.x, pointerStart.y, maxMoveDist * proportion, 0, 2*Math.PI)
					layer_ctx.closePath()
					layer_ctx.stroke();
					
					layer_ctx.beginPath()
					layer_ctx.arc(x, y, padRadius * proportion, 0, 2*Math.PI)
					layer_ctx.closePath()
					layer_ctx.fill();
					layer_ctx.stroke();
					layer_ctx.restore();
					
					ctx.save();
					ctx.globalAlpha = padAlpha;
					ctx.drawImage(layer, -c.width/2, -c.height/2)
					ctx.restore();
				}
				break;
			default:
				break;
		}
	}
}