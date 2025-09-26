function drawPointedImage(c, ctx, img, MIN_RADIUS = 1, MAX_RADIUS = 5, iterationsPerExecution = 100, maxIterations = 10000, MAX_VARIATION = 25, scale_width = 300){
	function getImageData(img){
		const c = document.createElement("canvas");
		const ctx = c.getContext("2d");
		c.width = scale_width;
		c.height = scale_width*img.height/img.width;
		ctx.drawImage(img,0,0,c.width,c.height);
		return ctx.getImageData(0,0,c.width,c.height);
	}
	const data = getImageData(img);
	
	c.width = scale_width;
	c.height = scale_width*img.height/img.width;

	function drawCircle(color, alpha, x, y){
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.arc(x, y, MIN_RADIUS+Math.random()*(MAX_RADIUS-MIN_RADIUS), 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
		ctx.restore();
	}
	
	let count = 0;
	function main(){
		const cX = c.width/2, cY = c.height/2;
		for(var i = 0; i<iterationsPerExecution; i++){
			const posX = cX + (Math.random() - Math.random()) * cX
			const posY = cY + (Math.random() - Math.random()) * cY
			const dX = Math.floor(posX)
			const dY = Math.floor(posY)
			const colorIndex = (dY * c.width + dX) * 4;
			const variation1 = Math.round(Math.random() * MAX_VARIATION * 2 - MAX_VARIATION);
			const variation2 = Math.round(Math.random() * MAX_VARIATION * 2 - MAX_VARIATION);
			const variation3 = Math.round(Math.random() * MAX_VARIATION * 2 - MAX_VARIATION);
			const color = "rgb("+
				Math.max(0,Math.min(255,data.data[colorIndex]+variation1))+","+
				Math.max(0,Math.min(255,data.data[colorIndex+1]+variation2))+","+
				Math.max(0,Math.min(255,data.data[colorIndex+2]+variation3))+")";
			drawCircle(color, 1, dX, dY)
		}
		count += iterationsPerExecution;
		if(count < maxIterations)
			requestAnimationFrame(main)
	}
	ctx.fillStyle = "black"; ctx.fillRect(0,0,c.width,c.height);
	main()
}