class King extends Piece {
	constructor(x, y){
		super(x, y, king_img);
		this.speed = 6;
	}
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
	testMove(dx,dy){ 
		if(!this.board_ref.GameOver){
			this.move(dx,dy);
			return true;
		}
		return false;
	}
	move(dx, dy){
		if(dx == 0 && dy == 0) return;
		if(this.internalTimer > 0) return;
		if (this.progress > 0 && this.progress < 0.2 && buffer_toggle){
			this.targetX = (this.targetX - this.x != 0) ? this.targetX : ((this.board_ref.isInside(this.x+dx, this.targetY))? this.x+dx : this.x);
			this.targetY = (this.targetY - this.y != 0) ? this.targetY : this.y+dy;
		}
		if (this.progress > 0.8 && this.progress < 1 && buffer_toggle){
			this.nextX = dx?dx:this.nextX;
			this.nextY = dy?dy:this.nextY; 
		}
		if (this.progress < 1) return;
        this.targetX = this.x + dx; this.targetY = this.y + dy;
        this.board_ref.tryCapturePiece(this.targetX,this.targetY);
		if (!this.board_ref.isInside(this.targetX, this.targetY)){
			this.targetX = this.x;
			if(this.targetY - this.y == 0){
				this.targetY = this.y;
				this.progress = 1;
				return;
			}
		}
        this.progress = 0;
    }
}