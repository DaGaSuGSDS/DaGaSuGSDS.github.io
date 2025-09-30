const BishopDirection = { upleft: 0, upright: 1, downright: 2, downleft:3, }
class Bishop extends Piece {
	constructor(x, y, direction = BishopDirection.downright){
		super(x, y, bishop_img);
		this.value = 30;
		this.speed = 7;
		
		this.actualDirection = direction;
		this.setDirection();
		
		this.setInternalTimer = 0.1;
		this.internalTimer = this.setInternalTimer;
	}
	setDirection(){
		switch(this.actualDirection){
			case BishopDirection.upleft:
				this.directionX = -1;
				this.directionY = -1;
				break;
			case BishopDirection.upright:
				this.directionX = 1;
				this.directionY = -1;
				break;
			case BishopDirection.downleft:
				this.directionX = -1;
				this.directionY = 1;
				break;
			case BishopDirection.downright:
				this.directionX = 1;
				this.directionY = 1;
				break;
			default:
				this.directionX = 0;
				this.directionY = 0;
				break;
		}
	}
	canMove(x, y){
		return this.board_ref.isInside(x, y) && this.board_ref.isEmptyWException(x, y, this.board_ref.centerPiece);
	}
	move(dx = 0, dy = 0){
		if (this.progress < 1) return;
		if (this.internalTimer > 0) return;
		this.targetX = dx; this.targetY = dy;
        this.progress = 0;
    }
	testMove(){
		if (this.board_ref.GameOver) return;
		if (this.canMove(this.x + this.directionX, this.y + this.directionY)){
			this.move(this.x + this.directionX, this.y + this.directionY);
		} else {
			if(this.x + this.directionX < 0 || this.x + this.directionX > this.board_ref.size-1) 
				this.directionX = -this.directionX;
			if(!this.board_ref.isEmptyWException(this.x + this.directionX, this.y + this.directionY, this.board_ref.centerPiece))
				this.directionY = -this.directionY;
			this.internalTimer = this.setInternalTimer;
		}
	}
	update(deltaTime){
		if(this.internalTimer > 0) this.updateTimer(deltaTime);
		if(this.progress == 1 && this.internalTimer <= 0) 
			this.testMove();
        if (this.progress < 1){
            this.updateProgress(deltaTime);
            if (this.progress >= 1){
                this.x = this.targetX;
                this.y = this.targetY;
                this.progress = 1;
				if(this.capturing) this.board_ref.capture_ended = true;
		    }
        }
    }
	canCapture(){
		if(this.board_ref.capturing_center_piece_flag == false
		&& this.progress == 1 
		&& this.board_ref.centerPiece.targetX == this.x+this.directionX
		&& this.board_ref.centerPiece.targetY == this.y+this.directionY){
			return this.captureStart();
		}
		return false;
	}
	captureEvent(){
		if(this.canCapture()){ 
			this.move(this.board_ref.centerPiece.targetX, this.board_ref.centerPiece.targetY);
		}
	}
	captureDraw(){
		this.startDrawAlert()
		
		const {draw_x, draw_y} = this.getInitDraw();
		
		const dx = this.x - draw_x + this.directionX;
		const dy = this.y - draw_y + this.directionY;
		
		if(this.directionX > 0)
			for(var i = 0; i<this.board_ref.size - this.x - 1 && this.board_ref.isEmptyWException(this.x+i,this.y  + (this.directionY > 0 ? i : -i),this); i++){
				this.drawAlert(dx + i, dy + (this.directionY > 0 ? i : -i));
			}
		if(this.directionX < 0)
			for(var i = 0; i<this.x && this.board_ref.isEmptyWException(this.x-i,this.y  + (this.directionY > 0 ? i : -i),this); i++){
				this.drawAlert(dx - i, dy + (this.directionY > 0 ? i : -i));
			}
		this.endDrawAlert()
	}
}
class XSwapBishop extends Bishop{
	constructor(x, y, direction = BishopDirection.downright){
		super(x, y, direction);
	}
	testMove(){
		if (this.board_ref.GameOver) return;
		if (this.canMove(this.x + this.directionX, this.y + this.directionY)){
			this.move(this.x + this.directionX, this.y + this.directionY);
		} else {
			this.directionX = -this.directionX;
			this.internalTimer = this.setInternalTimer;
		}
	}
}