const ButtonOffAlpha = 0.4;
class Button{
	constructor(img_ref,x,y,w,h,whenClick=()=>{},id = 0){
		this.img_ref = img_ref;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.whenClick = whenClick;
		this.id = id;
		this.active = true;
	}
	effect(){
		if(isPointerDown){
			const x = pointerStart.x-c.width/2; const y = pointerStart.y-c.height/2;
			if(colPointRect(x,y,this.x * c.width/2,this.y * c.height/2 ,this.w*proportion,this.h*proportion)){
				this.whenClick();
			}
		}
	}
	draw(){
		ctx.save()
		if(!this.active) ctx.globalAlpha = ButtonOffAlpha;
		drawFixedImage(this.img_ref, this.x, this.y, this.w, this.h, this.id);
		ctx.restore()
	}
}