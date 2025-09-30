class Board{
	constructor(size, color_1, color_2, color_border){
		this.size = size;
		this.rows = 30;
		
		this.minLimitY = 20;
		this.maxLimitY = 100;
		
		this.centerPiece = null;
		
		this.cameraY = 0;
		this.cameraYClimbSpeed = -0.02;
		this.cameraYClimbAccel = -0.5;
		
		this.cameraTimePassed = 0;
		
		this.cameraYMinAltitude = -1.5;
		this.cameraYMaxAltitude = 0;
		this.cameraYFlagClimb = false;
		this.cameraYFlagGoDown = false;
		
		this.draw_x = 0;
		this.draw_y = 0;
		this.color_1 = color_1;
		this.color_2 = color_2;
		this.color_border = color_border;
		this.border_percentage_tilesize = 0.35;
		
		this.capturing_center_piece_flag = false;
		this.capture_ended = false;
		
		this.GameOver = false;
		
		this.pieces = {};
		this.alreadyDrawnAlertSquares = {};
	}
	setCenterPiece(piece){
		this.centerPiece = piece;
	}
	addPiece(piece){
		const id = Math.random();
		piece.setId(id);
		piece.setBoardRef(this);
		this.pieces[id] = piece;
	}
	updatePieces(deltaTime){
		for (let i in this.pieces){
			this.pieces[i].captureEvent();
		}
		for (let i in this.pieces){
			this.pieces[i].update(deltaTime);
		}
	}
	drawPieces(){
		const list = [];
		for(var i in this.pieces){
			list.push(this.pieces[i]);
		}
		list.sort((a,b)=>{return (a.y + (a.targetY - a.y) * Math.min(1,a.progress)) - (b.y + (b.targetY - b.y) * Math.min(1,b.progress));})
		for(var i = 0; i<list.length;i++){
			list[i].captureDraw();
		}
		for(var i = 0; i<list.length;i++){
			if(list[i] != this.centerPiece || !this.capture_ended) list[i].draw();
		}
	}
	deleteLowPieces(limit){
		for(var i in this.pieces){
			if(this.pieces[i].y > limit) delete this.pieces[i];
		}
	}
	deleteHighPieces(limit){
		for(var i in this.pieces){
			if(this.pieces[i].y < limit) delete this.pieces[i];
		}
	}
	tryCapturePiece(x, y){
		for(var i in this.pieces){
			if(this.pieces[i] == this.centerPiece) continue;
			if(!(this.pieces[i] instanceof Horse)){
				if(this.pieces[i].targetX == x 
				&& this.pieces[i].targetY == y){
					score += this.pieces[i].value * scoreMultiplier;
					delete this.pieces[i];
				}
			}else{
				if((this.pieces[i].x == x 
				&&  this.pieces[i].y == y
				&&  this.pieces[i].progress <= 0.2) || 
				   (this.pieces[i].targetX == x 
				&&  this.pieces[i].targetY == y
				&&  this.pieces[i].progress >= 0.8)){
					score += this.pieces[i].value * scoreMultiplier;
					delete this.pieces[i];
				}
			}
		}
	}
	isInside(x, y) {
		return x >= 0 && x < this.size;
	}
	isEmpty(x, y){
		for(var i in this.pieces){
			const p = this.pieces[i];
			if(this.progress < 1 && p.x == x && p.y == y)
				return false;
			if(p.targetX == x && p.targetY == y)
				return false;
		}
		return true;
	}
	isEmptyWException(x, y, exception){
		for(var i in this.pieces){
			if(this.pieces[i] == exception) continue
			if(this.pieces[i].targetX == x && this.pieces[i].targetY == y) return false;
			if(this.progress < 1 && p.x == x && p.y == y) return false;
		}
		return true;
	}
	draw(){
		if(this.centerPiece){
			this.draw_x = -(this.size) * TileSize/2;
			this.draw_y = -((this.centerPiece.y + (this.centerPiece.targetY - this.centerPiece.y) * Math.min(this.centerPiece.progress,1)) + this.cameraY) * TileSize;
		}

		const realTileSize = TileSize * proportion;
		const dx = (this.draw_x) * proportion;
		const dy = (this.draw_y - TileSize/2) * proportion;

		const colsVisible = this.size;
		const rowsVisible = this.rows;

		const startRow = Math.floor(this.centerPiece.y - rowsVisible/2);
		const endRow = startRow + rowsVisible;
		
		ctx.fillStyle = this.color_border;
		
		ctx.fillRect(dx-realTileSize*this.border_percentage_tilesize+1, 
		dy + realTileSize * startRow, 
		realTileSize * this.border_percentage_tilesize, 
		realTileSize * rowsVisible)
		
		ctx.fillRect(dx + realTileSize * this.size-1, 
		dy + realTileSize * startRow, 
		realTileSize * this.border_percentage_tilesize, 
		realTileSize * rowsVisible)
		
		for(let j = startRow; j < endRow; j++){
			for(let i = 0; i < colsVisible; i++){
				ctx.fillStyle = ((j + i) % 2 == 0) ? this.color_1 : this.color_2;
				ctx.fillRect(
					dx + realTileSize * i,
					dy + realTileSize * j,
					realTileSize, realTileSize
				);
			}
		}
		this.deleteLowPieces(this.centerPiece.y + this.minLimitY);
		this.deleteHighPieces(this.centerPiece.y - this.maxLimitY);
		this.drawPieces();
		
		this.alreadyDrawnAlertSquares = {};
	}
	isAlertDrawn(x, y){
		if(this.alreadyDrawnAlertSquares[""+x+","+y]){
			return true;
		}else{
			this.alreadyDrawnAlertSquares[""+x+","+y] = true;
			return false;
		}
	}
	getPiecesByColumn(x){
		let list = []
		
		for(var i in this.pieces){
			if(this.pieces[i].targetX == x) list.push(this.pieces[i])
		}
		
		return list;
	}
	getPiecesByRow(y){
		let list = []
		
		for(var i in this.pieces){
			if(this.pieces[i].targetY == y) list.push(this.pieces[i])
		}
		
		return list;
	}
	existsAnyPieceByColumnLimited(x, p1y, p2y){
		if(p1y > p2y){
			let aux = p1y; p1y = p2y; p2y = aux;
		}
		
		for(var i in this.pieces){
			if(this.pieces[i].targetX == x
			&& this.pieces[i].targetY > p1y 
			&& this.pieces[i].targetY < p2y) 
				return true;
		}
		return false;
	}
	existsAnyPieceByRowLimited(y, p1x, p2x){
		for(var i in this.pieces){
			if(this.pieces[i].targetY == y
			&& this.pieces[i].targetX > p1x 
			&& this.pieces[i].targetX < p2x) 
				return true;
		}
		return false;
	}
	adjustCameraY(deltaTime){
		if(this.cameraYFlagClimb){
			if(this.cameraY == this.cameraYMinAltitude) return;
			
			this.cameraTimePassed += deltaTime;
			this.cameraY = this.cameraYClimbSpeed * this.cameraTimePassed + this.cameraYClimbAccel * this.cameraTimePassed * this.cameraTimePassed;
			if(this.cameraY <= this.cameraYMinAltitude){
				this.cameraY = this.cameraYMinAltitude;
			}
		}
		if(this.cameraYFlagGoDown){
			if(this.cameraY == this.cameraYMaxAltitude) return;
			
			this.cameraTimePassed -= deltaTime;
			this.cameraY = this.cameraYClimbSpeed * this.cameraTimePassed + this.cameraYClimbAccel * this.cameraTimePassed * this.cameraTimePassed;
			if(this.cameraY >= this.cameraYMaxAltitude){
				this.cameraY = this.cameraYMaxAltitude;
			}
		}
	}
	update(deltaTime){
		this.adjustCameraY(deltaTime);
		this.updatePieces(deltaTime);
		if(this.capturing_center_piece_flag == true){
			this.GameOver = true;
		}
		if(this.capture_ended){
			switchGameState(GAME_STATES.GAMEOVER_MENU)
		}
	}
}