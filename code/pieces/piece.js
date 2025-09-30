const captureAlpha = 0.4;
let captureColor = "red";

class Piece {
	constructor(x, y, img_ref){
		this.x = x;
		this.y = -y;
		if(player) this.y = player.targetY-y;
		this.targetX = this.x;
		this.targetY = this.y;
		this.progress = 1;
		
		this.img_ref = img_ref;
		
		this.board_ref = null;
		
		this.id = 0;

		this.anim_pos = 0;
		
		this.speed = 3;
		
		this.nextX = 0;
		this.nextY = 0;
		
		this.draw_xpivot = 1 / (2 * globalXValues);
		this.draw_ypivot = 3.5 / 4;
		
		this.internalTimer = 0;
		this.setInternalTimer = 0.15;
		
		this.capturing = false;
		
		this.draw_x = 0;
		this.draw_y = 0;
		
		this.vel_x = 0;
		this.vel_y = 0;
		
		this.value = 10;
	}
	setId(id){ this.id = id; }
	setBoardRef(board){ this.board_ref = board; }
	canCapture(){ return false; }
	captureEvent(){
		if(this.canCapture() && this.progress == 1){ 
			this.move(
				this.board_ref.centerPiece.targetX, 
				this.board_ref.centerPiece.targetY
			);
		}
	}	
	testMove(dx,dy){ 
		if(!this.board_ref.GameOver && this.progress == 1){
			this.move(dx,dy);
			return true;
		}
		return false;
	}
	move(dx, dy){
		if(dx == 0 && dy == 0) return;
		if(this.internalTimer > 0) return;
		if (this.progress < 1 && buffer_toggle){
			this.nextX = dx?dx:this.nextX;
			this.nextY = dy?dy:this.nextY; 
			return;
		}
        this.targetX = this.x + dx; this.targetY = this.y + dy;
        if (!this.board_ref.isInside(this.targetX, this.targetY)){
			this.targetX = this.x;
			if(this.targetY - this.y == 0){
				this.targetY = this.y;
				this.progress = 1;
				return;
			}
		}
        this.progress = 0;
		this.internalTimer = this.setInternalTimer;
    }
	updateTimer(deltaTime){ if(!timestopped && this.internalTimer > 0) this.internalTimer-=deltaTime; }
	updateProgress(deltaTime){ if(!timestopped) this.progress += this.speed * deltaTime; }
	update(deltaTime){
		if(this.internalTimer > 0) this.updateTimer();
        if (this.progress < 1){
            this.updateProgress(deltaTime);
            if (this.progress >= 1){
                this.x = this.targetX;
                this.y = this.targetY;
                this.progress = 1;
				if(buffer_toggle) this.testMove(this.nextX, this.nextY)
				this.nextX = 0;
				this.nextY = 0;
            }
        }
    }
	captureStart(){
		if(this.board_ref.capturing_center_piece_flag == false){
			this.board_ref.capturing_center_piece_flag = true;
			this.internalTimer = 0;
			this.capturing = true;
			return true;
		}
		return false;
	}
	getInitDraw(){
		const cp = this.board_ref.centerPiece;
		const draw_x = (this.board_ref.size-1) / 2;
		const draw_y =  cp.y + (cp.targetY - cp.y) * Math.min(cp.progress,1) + this.board_ref.cameraY;

		return {draw_x, draw_y}
	}
	captureDraw(){}
	draw(){
		if(this.board_ref.centerPiece) {
			const {draw_x, draw_y} = this.getInitDraw();
			
			const drawX = this.x + (this.targetX - this.x) * Math.min(this.progress,1);
			const drawY = this.y + (this.targetY - this.y) * Math.min(this.progress,1);
			
			drawPropImage(this.img_ref, 
			((drawX - draw_x) * TileSize - this.draw_xpivot * this.img_ref.width),
			((drawY - draw_y) * TileSize - this.draw_ypivot * this.img_ref.height),
			this.img_ref.width / globalXValues,
			this.img_ref.height)
		}
	}	
	startDrawAlert(){ 
		ctx.save();
		
		ctx.globalAlpha = captureAlpha;
		ctx.fillStyle = captureColor;
	}
	drawAlert(x,y){
		if(this.board_ref.isAlertDrawn(x,y)) return;
		
		const dx = x * realTileSize - realTileSize / 2;
		const dy = y * realTileSize - realTileSize / 2;
		
		ctx.fillRect(dx, dy, realTileSize, realTileSize);
	}
	endDrawAlert(){
		ctx.restore();
	}
}