const RookDirection = {up:0,down:1,left:2,right:3,}
class Rook extends Piece {
	constructor(x, y, direction = RookDirection.down){
		super(x, y, rook_img);
		this.value = 50;
		this.speed = 20;
		
		this.directionX = 0;
		this.directionY = 0;

		switch(direction){
			case RookDirection.up:
				this.directionY = -1;
				break;
			case RookDirection.down:
				this.directionY = 1;
				break;
			case RookDirection.left:
				this.directionX = -1;
				break;
			case RookDirection.right:
				this.directionX = 1;
				break;
		}
		
		this.setInternalTimer = 0.5;
		this.internalTimer = this.setInternalTimer;
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
	testMove(dx=0,dy=0){
		if (this.board_ref.GameOver) return;
		if (this.canMove(dx, dy)){
			this.move(dx, dy);
		} else {
			this.directionX = -this.directionX;
			this.directionY = -this.directionY;
			this.internalTimer = this.setInternalTimer;
		}
	}
	update(deltaTime){
		this.updateTimer(deltaTime);
		if(this.progress == 1 && this.internalTimer <= 0) 
			this.testMove(this.x + this.directionX, this.y + this.directionY);
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
	captureDraw(){
		this.startDrawAlert()
		const {draw_x, draw_y} = this.getInitDraw();		
		
		const dx = (this.x - draw_x + this.directionX);
		const dy = (this.y - draw_y + this.directionY);

		const cp = this.board_ref.centerPiece;

		if(this.directionX > 0)
			for(var i = 0; i<this.board_ref.size - this.x - 1 && this.board_ref.isEmptyWException(this.x+i,this.y,this); i++){
				this.drawAlert(dx + i, dy);
			}
		if(this.directionX < 0)
			for(var i = 0; i<this.x && this.board_ref.isEmptyWException(this.x-i,this.y,this); i++){
				this.drawAlert(dx - i, dy);
			}
		if(this.directionY > 0)
			for(var i = 0; i<(Math.ceil(this.board_ref.rows/2) - (this.y - cp.y) - 1) && this.board_ref.isEmptyWException(this.x,this.y+i,this); i++){
				this.drawAlert(dx, dy + i);
			}
		if(this.directionY < 0)
			for(var i = 0; i<(Math.ceil(this.board_ref.rows/2) - (cp.y - this.y)) && this.board_ref.isEmptyWException(this.x,this.y-i,this); i++){
				this.drawAlert(dx, dy - i);
			}
		
		this.endDrawAlert()
	}
}
class HeliRook extends Rook {
	constructor(x, y, direction){
		super(x, y, direction);
		
		this.setInternalTimer = 1.5;
		this.internalTimer = this.setInternalTimer;
	}
	canMove(x, y){
		let isInsight = false;
		
		if(this.directionX > 0)
			isInsight = (this.y == this.board_ref.centerPiece.targetY 
						&& this.board_ref.centerPiece.targetX > this.x
						&& !this.board_ref.existsAnyPieceByRowLimited(this.targetY, this.targetX, this.board_ref.centerPiece.targetX));
		
		if(this.directionX < 0) 
			isInsight = (this.y == this.board_ref.centerPiece.targetY 
						&& this.board_ref.centerPiece.targetX < this.x
						&& !this.board_ref.existsAnyPieceByRowLimited(this.targetY, this.targetX, this.board_ref.centerPiece.targetX));
		
		if(this.directionY > 0) 
			isInsight = (this.x == this.board_ref.centerPiece.targetX 
						&& this.board_ref.centerPiece.targetY > this.y
						&& !this.board_ref.existsAnyPieceByColumnLimited(this.targetX, this.targetY, this.board_ref.centerPiece.targetY));
		
		if(this.directionY < 0) 
			isInsight = (this.x == this.board_ref.centerPiece.targetX 
						&& this.board_ref.centerPiece.targetY < this.y
						&& !this.board_ref.existsAnyPieceByColumnLimited(this.targetX, this.targetY, this.board_ref.centerPiece.targetY));
		
		if(isInsight) this.internalTimer = 0;
		
		return this.board_ref.isInside(x, y) 
		&& this.board_ref.isEmptyWException(x, y, this.board_ref.centerPiece)
		&& isInsight;
	}
	testMove(dx=0,dy=0){
		if (this.board_ref.GameOver) return;
		if (this.canMove(dx, dy)){
			this.move(dx, dy);
		} else {
			if(this.internalTimer <= 0 && this.progress == 1){
				this.directionX = -this.directionX;
				this.directionY = -this.directionY;
				this.internalTimer = this.setInternalTimer;
			}
		}
	}
	update(deltaTime){
		this.updateTimer(deltaTime);
		this.testMove(this.x + this.directionX, this.y + this.directionY);
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
}
class StillRook extends HeliRook {
	constructor(x, y, direction){
		super(x, y, direction);
		
		this.setInternalTimer = 1.5;
		this.internalTimer = this.setInternalTimer;
	}
	testMove(dx=0,dy=0){
		if (this.board_ref.GameOver) return;
		if (this.canMove(dx, dy)){
			this.move(dx, dy);
		}
	}
}