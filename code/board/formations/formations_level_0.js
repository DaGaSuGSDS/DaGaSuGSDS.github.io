appendFormation(0, "pawns_going_down", ()=>{
	linkedPawnsFormation(3,6)
})

appendFormation(0, "tower_player_down", ()=>{
	board.addPiece(new Rook(player.x, 15));
})

appendFormation(0, "tower_down", ()=>{
	board.addPiece(new Rook(Math.floor(Math.random() * board.size), 10));
})

appendFormation(0, "bouncing_bishop_down", ()=>{
	board.addPiece(new Bishop(Math.floor(Math.random() * board.size), 10));
})

appendFormation(0.5, "not_inteligent_horse_down", ()=>{
	board.addPiece(new Horse(Math.floor(Math.random() * board.size), 10));
})

appendFormation(0.5, "pawns_going_down", ()=>{
	linkedPawnsFormation(3,6)
})

appendFormation(0.5, "tower_player_down", ()=>{
	board.addPiece(new Rook(player.x, 15));
})

appendFormation(0.5, "tower_down", ()=>{
	board.addPiece(new Rook(Math.floor(Math.random() * board.size), 10));
})

appendFormation(0.5, "bouncing_bishop_down", ()=>{
	board.addPiece(new Bishop(Math.floor(Math.random() * board.size), 10));
})

appendFormation(0.5, "not_inteligent_horse_down", ()=>{
	board.addPiece(new Horse(Math.floor(Math.random() * board.size), 10));
})