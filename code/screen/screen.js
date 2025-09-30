const c = document.getElementById("can");
const ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

const layer = document.createElement("canvas");
const layer_ctx = layer.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

const zoomout = 50;
const realCanvasWidth = 18*zoomout;
const realCanvasHeight = 18*zoomout;
const realTextSize = 30;

let canvasWidth = 0, canvasHeight = 0;
let proportion = 1;

const TileSize = 90;
let realTileSize = TileSize;

function updateCanvas(){
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	layer.width = window.innerWidth;
	layer.height = window.innerHeight;
	
	proportion = Math.min(c.width / realCanvasWidth, c.height / realCanvasHeight);
	
	canvasWidth = realCanvasWidth * proportion;
	canvasHeight = realCanvasHeight * proportion;
	
	realTileSize = TileSize * proportion;
	
	ctx.translate(c.width/2,c.height/2);
	ctx.font = ""+Math.round(realTextSize * proportion)+"px consolas";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
}
function updateSizes(){ updateCanvas(); }
function initCanvas(){ c.hidden = false; updateSizes(); }
function clearCanvas(){
	ctx.fillStyle = "#fff"; 
	ctx.fillRect(-c.width/2,-c.height/2, c.width, c.height)
	layer_ctx.clearRect(0,0,layer.width,layer.height)
}

window.onresize = () => { updateSizes(); }