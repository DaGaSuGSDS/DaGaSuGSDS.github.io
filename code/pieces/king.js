class King extends Piece {
	constructor(x, y){
		super(x, y, king_img);
		this.speed = 6;
	}
	move(dx, dy){
		if(dx == 0 && dy == 0) return;
		if(this.internalTimer > 0) return;
		if (this.progress < 1){
			this.nextX = dx?dx:this.nextX;
			this.nextY = dy?dy:this.nextY; 
			return;
		}
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
		this.internalTimer = this.setInternalTimer;
    }
}