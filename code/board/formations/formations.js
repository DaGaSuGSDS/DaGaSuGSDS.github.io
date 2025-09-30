const formations = {
	0:{ advance: 0, spawnrate: 10, nextlevel: 0.5, },
	0.5:{ advance: 50, spawnrate: 5, nextlevel: 1, },
	1:{ advance: 100, spawnrate: 7, nextlevel: 2, },
	2:{ advance: 300, spawnrate: 15, nextlevel: null, }
};
function appendFormation(level, name, send_formation){
	if(!formations[level].formation_list) formations[level].formation_list = [];
	formations[level].formation_list.push({ name, send_formation })
	if(level > formations.maxlevel) formations.maxlevel = level;
}
function useRandomFormation(level){
	const rand = Math.floor(Math.random() * formations[level].formation_list.length);
	formations[level].formation_list[rand].send_formation();
}

function linkedPawnsFormation(minX,maxX){
	const pawns = [];
	for(var i = minX; i<maxX; i++) pawns.push(new LinkedPawn(i, 10));
	for(var i = 0; i<pawns.length; i++){
		for(var j = i+1; j<pawns.length; j++){
			pawns[i].linkTo(pawns[j]);
		}
		board.addPiece(pawns[i])
	}
}