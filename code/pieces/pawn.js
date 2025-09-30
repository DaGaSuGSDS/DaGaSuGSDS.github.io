class Pawn extends Piece {
	constructor(x, y){
		super(x, y, pawn_img);
		this.nextY = 1;
		this.targetY = this.y+1;
		this.progress = 0;
		this.setInternalTimer = 0.5;
		this.internalTimer = this.setInternalTimer;
		this.value = 10;
		this.captureDirectionY = 1;
	}
	canMove(x, y){
		return this.board_ref.isEmpty(x,y);
	}
	move(dx = 0, dy = 0){
		if (this.progress < 1) return;
		if (this.internalTimer > 0) return;
		this.targetX = dx; this.targetY = dy;
        this.progress = 0;
		this.internalTimer = this.setInternalTimer;
    }
	testMove(dx=0,dy=0){
		if(this.canMove(dx,dy) && !this.board_ref.GameOver)
			this.move(dx,dy)
	}
	canCapture(){
		if(this.board_ref.capturing_center_piece_flag == false
		&& this.progress == 1 
		&& this.board_ref.centerPiece.targetY == this.y+this.captureDirectionY 
		&&(this.board_ref.centerPiece.targetX == this.x-1 
		|| this.board_ref.centerPiece.targetX == this.x+1)){
			return this.captureStart();
		}
		return false;
	}
	captureEvent(){
		if(this.canCapture()){ 
			this.move(
			this.board_ref.centerPiece.targetX, 
			this.board_ref.centerPiece.targetY);
		}
	}
	update(deltaTime){
        if (this.progress < 1){
            this.updateProgress(deltaTime);
            if (this.progress >= 1){
                this.x = this.targetX;
                this.y = this.targetY;
                this.progress = 1;
				if(this.capturing) this.board_ref.capture_ended = true;
            }
        }
		this.testMove(this.x+this.nextX, this.y+this.nextY)
		if(this.progress == 1) this.updateTimer(deltaTime);
    }
	captureDraw(){
		if(this.progress == 1){
			this.startDrawAlert()
			const {draw_x, draw_y} = this.getInitDraw();			
			const dy = (this.y - draw_y + this.captureDirectionY);
			
			if(this.x > 0)
				this.drawAlert(this.x - draw_x - 1, dy)
			
			if(this.x < this.board_ref.size - 1)
				this.drawAlert(this.x - draw_x + 1, dy)
			
			this.endDrawAlert()
		}
	}
}
class StillPawn extends Pawn {
	constructor(x, y){
		super(x, y);
		this.progress = 1;
		this.targetY = this.y;
		this.nextY = 0;
	}
}
class ReversePawn extends Pawn {
	constructor(x, y){
		super(x, y);
		this.targetY = this.y-1;
		this.nextY = -1;
		this.captureDirectionY = -1;
	}
}
class ReverseStillPawn extends Pawn {
	constructor(x, y){
		super(x, y);
		this.progress = 1;
		this.targetY = this.y;
		this.nextY = 0;
		this.captureDirectionY = -1;
	}
}
class LinkedPawn extends Pawn {
	constructor(x, y){
		super(x, y);
		this.links = [];
		this.moving = false;
	}
	linkTo(otherLinkedPawn){
		this.links.push(otherLinkedPawn);
		otherLinkedPawn.links.push(this);
	}
	testCanMove(x, y){
		return this.board_ref.isEmpty(x,y);
	}
	canMove(x, y){
		for(var i = 0; i<this.links.length; i++){
			if(!this.links[i]) continue;
			if(!this.links[i].moving && !this.links[i].testCanMove(this.links[i].x, this.links[i].y+1)) return false;
		}
		this.moving = this.testCanMove(x,y);
		return this.moving;
	}
	update(deltaTime){
        if (this.progress < 1){
            this.updateProgress(deltaTime);
            if (this.progress >= 1){
                this.x = this.targetX;
                this.y = this.targetY;
                this.progress = 1;
				this.moving = false;
				if(this.capturing) this.board_ref.capture_ended = true;
            }
        }
		this.testMove(this.x+this.nextX, this.y+this.nextY)
		if(this.progress == 1){
			this.updateTimer(deltaTime);
		}
    }
}