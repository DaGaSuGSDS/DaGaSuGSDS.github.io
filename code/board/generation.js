function generate(){
	if((-bestY) % spawnrate === 0 && (-bestY) > lastGenerated){
		if(formations[formations[difficulty].nextlevel]
		&& (-bestY) > formations[formations[difficulty].nextlevel].advance){
			spawnrate = formations[formations[difficulty].nextlevel].spawnrate;
			difficulty = formations[difficulty].nextlevel;
		}
		lastGenerated = -bestY;
		useRandomFormation(difficulty);
	}
}