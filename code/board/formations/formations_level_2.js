function navy(x,y){
	const pawns = [];
	pawns.push(new LinkedPawn(x,y))
	pawns.push(new LinkedPawn(x-1,y+1))
	pawns.push(new LinkedPawn(x+1,y+1))
	pawns.push(new LinkedPawn(x,y+2))
	for(var i = 0; i<pawns.length; i++){
		for(var j = i+1; j<pawns.length; j++){
			pawns[i].linkTo(pawns[j]);
		}
		board.addPiece(pawns[i])
	}
}
function rook_fall(a,b){
	for(var i = a; i<b; i++)board.addPiece(new Rook(i,15+(i - a) * 2))
}
function rook_fall_reverse(a,b){
	for(var i = a; i>=b; i--)board.addPiece(new Rook(i,15+(a - i) * 2))
}
function randomFall(){
	if(Math.random() < 0.5){
		const a = Math.floor(Math.random() * (board.size - 3));
		rook_fall(a,a+3)
	}else{
		const a = 2+Math.floor(Math.random() * (board.size - 2));
		rook_fall_reverse(a,a-2)
	}
}
function great_fall(){
	const rnd = Math.floor(Math.random() * board.size)
	if(rnd <= Math.floor(board.size / 2)){
		for(var i = 0; i<board.size; i++){
			if(i != rnd)board.addPiece(new Rook(i, 15 + i))
		}
	}else{
		for(var i = 0; i<board.size; i++){
			if(i != rnd)board.addPiece(new Rook(i, 15 + (board.size - i)))
		}
	}
}

appendFormation(2, "navy", ()=>{
	navy(1+Math.floor(Math.random() * (board.size - 2)), 15)
})

appendFormation(2, "intel_horse", ()=>{
	board.addPiece(new IntelHorse(2, 15));
	board.addPiece(new IntelHorse(board.size-3, 15));
})