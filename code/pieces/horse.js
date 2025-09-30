const HorseMoveList = [
	{x:1, y:-2},
	{x:2, y:-1},
	{x:2, y:1},
	{x:1, y:2},
	{x:-1, y:2},
	{x:-2, y:1},
	{x:-2, y:-1},
	{x:-1, y:-2}
];
class Horse extends Piece {
	constructor(x, y){
		super(x, y, horse_img);
		this.value = 30;
		this.speed = 5;
		this.setInternalTimer = .75;
		this.internalTimer = this.setInternalTimer;
	}
	manhattanDist(x,y){ return Math.abs(this.board_ref.centerPiece.targetX - x) + Math.abs(this.board_ref.centerPiece.targetY - y); }
	getPossibleMoves(){
		const physicallyPossibleMoves = [];
		for(var i = 0; i<HorseMoveList.length; i++){
			const move = {x:this.targetX + HorseMoveList[i].x, y:this.targetY + HorseMoveList[i].y,}
			if(this.canMove(move.x, move.y)) physicallyPossibleMoves.push(move);
		}
		return physicallyPossibleMoves;
	}
	generateNextMove(){
		const physicallyPossibleMoves = this.getPossibleMoves();
		if(physicallyPossibleMoves.length == 0) return null;
		physicallyPossibleMoves.sort((a,b)=> {
			return this.manhattanDist(a.x, a.y) - this.manhattanDist(b.x, b.y);
		})
		return physicallyPossibleMoves[0];
	}
	canMove(x, y){
		return this.board_ref.isEmptyWException(x,y,this.board_ref.centerPiece) && this.board_ref.isInside(x,y);
	}
	move(dx = 0, dy = 0){
		if (this.progress < 1) return;
		if (this.internalTimer > 0) return;
		this.targetX = dx; this.targetY = dy;
        this.progress = 0;
		this.internalTimer = this.setInternalTimer;
    }
	testMove(){
		const {x, y} = this.generateNextMove();
		if(this.canMove(x,y) && !this.board_ref.GameOver) {
			this.move(x,y)
		}
	}
	canCapture(){
		if(this.progress == 1
		&& this.internalTimer <= 0
		&& this.board_ref.capturing_center_piece_flag == false){
			for(var i = 0; i<HorseMoveList.length; i++){
				const move = {x:this.x + HorseMoveList[i].x, y:this.y + HorseMoveList[i].y,}
				if(move.x == this.board_ref.centerPiece.targetX
				&& move.y == this.board_ref.centerPiece.targetY){
					return this.captureStart();
				}
			}
		}
		if(this.progress < 1){
			if(this.targetX == this.board_ref.centerPiece.targetX
			&& this.targetY == this.board_ref.centerPiece.targetY)
				return this.captureStart();
		}
		return false;
	}
	update(deltaTime){
		if(this.internalTimer <= 0)
			this.testMove()
		if(this.progress == 1) this.updateTimer(deltaTime);
        if(this.progress < 1){
            this.updateProgress(deltaTime);
            if(this.progress >= 1){
                this.x = this.targetX;
                this.y = this.targetY;
                this.progress = 1;
				if(this.capturing) this.board_ref.capture_ended = true;
            }
        }
    }
	captureDraw(){
		this.startDrawAlert()
		
		const {draw_x, draw_y} = this.getInitDraw();
		
		const moves  = [];
		for(var i = 0; i<HorseMoveList.length; i++){
			const move = {x:this.targetX + HorseMoveList[i].x, y:this.targetY + HorseMoveList[i].y,}
			if(move.x >= 0 && move.x < this.board_ref.size) moves.push(move);
		}
		for(var i = 0; i<moves.length; i++){
			this.drawAlert(moves[i].x - draw_x, moves[i].y - draw_y);
		}
			
		this.endDrawAlert();
	}
}
class StillHorse extends Horse {
	constructor(x, y){
		super(x, y);
	}
	testMove(){}
	canCapture(){
		if(this.board_ref.capturing_center_piece_flag == false){
			for(var i = 0; i<HorseMoveList.length; i++){
				const move = {x:this.x + HorseMoveList[i].x, y:this.y + HorseMoveList[i].y,}
				if(move.x == this.board_ref.centerPiece.targetX
				&& move.y == this.board_ref.centerPiece.targetY){
					return this.captureStart();
				}
			}
		}
		return false;
	}
}
class IntelHorse extends Horse {
	constructor(x, y){
		super(x, y);
		this.idealDist = 3;
	}
	generateNextMove(){
		const physicallyPossibleMoves = this.getPossibleMoves();
		if(physicallyPossibleMoves.length == 0) return null;
		physicallyPossibleMoves.sort((a,b)=> {
			let distA = this.manhattanDist(a.x, a.y);
			let distB = this.manhattanDist(b.x, b.y);
			
			if(distA < this.idealDist && distB >= this.idealDist){
				return 1;
			}else if(distA >= this.idealDist && distB < this.idealDist){
				return -1;
			}
			return distA - distB;
		})
		return physicallyPossibleMoves[0];
	}
}
