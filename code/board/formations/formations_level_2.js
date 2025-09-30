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
function great_fall(mult=1, h=10){
	if(Math.random() <= 0.5){
		for(let i = 0; i<board.size; i++){
			AddTimeEvent(()=>{board.addPiece(new Rook(i, h))},111*mult*i)
		}
	}else{
		for(let i = 0; i<board.size; i++){
			AddTimeEvent(()=>{board.addPiece(new Rook(board.size-1-i, h))},111*mult*i)
		}
	}
}

appendFormation(2, "navy", ()=>{
	navy(1+Math.floor(Math.random() * (board.size - 2)), 15)
})

appendFormation(2, "intel_horse", ()=>{
	board.addPiece(new IntelHorse(2, 15));
	board.addPiece(new IntelHorse(Math.floor((board.size)/2), 15));
	board.addPiece(new IntelHorse(board.size-3, 15));
})

appendFormation(2, "the_great_fall", ()=>{
	lock_spawn = true;
	great_fall(2,15);
	AddTimeEvent(()=>{lock_spawn = false;},2000)
})