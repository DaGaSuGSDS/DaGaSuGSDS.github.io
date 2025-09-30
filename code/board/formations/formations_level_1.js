appendFormation(1, "more_pawns_going_down", ()=>{
	linkedPawnsFormation(0,2)
	linkedPawnsFormation(7,board.size)
})

appendFormation(1, "two_parallel_towers_going_down", ()=>{
	board.addPiece(new Rook(player.x, 15));
	if(player.x == 0) 
		board.addPiece(new Rook(player.x+1, 15));
	else if(player.x == board.size-1) 
		board.addPiece(new Rook(player.x-1, 15));
	else 
		board.addPiece(new Rook(player.x-1+(Math.random() >= 0.5 ? 2 : 0), 15));
})

appendFormation(1, "bouncing_bishops", ()=>{
	const a = Math.random() >= 0.5 ? 0 : 1;
	board.addPiece(new Bishop((board.size-1) * (1 - a), 8));
	board.addPiece(new Bishop((board.size-1) * (a), 7));
})

appendFormation(1, "intel_horse", ()=>{
	board.addPiece(new IntelHorse(2, 10));
	board.addPiece(new IntelHorse(board.size-3, 10));
})