class Curtain{
	constructor(color="black",alpha=0.4){
		this.color = color;
		this.alpha = alpha;
	}
	draw(){
		ctx.save()
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.color;
		ctx.fillRect(-c.width/2,-c.height/2, c.width,c.height);
		ctx.restore()
	}
}