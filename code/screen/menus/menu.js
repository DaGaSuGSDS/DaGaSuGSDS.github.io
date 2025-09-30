class Menu {
	constructor(){
		this.objList = [];
	}
	addObject(obj){
		if(!obj) console.error("Object not exists")
		if(!(typeof obj.draw == "function")) console.error("Object has no draw function: "+obj)
		if(obj.effect && !(typeof obj.effect == "function")) console.error("Object has effect but is not a function: "+obj)
		this.objList.push(obj);
	}
	update(){
		for(var i = 0; i<this.objList.length; i++){
			if(this.objList[i].effect) this.objList[i].effect();
		}
	}
	draw(){
		for(var i = 0; i<this.objList.length; i++)
			this.objList[i].draw();
	}
	show(){
		this.draw();
		this.update();
	}
}