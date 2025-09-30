const TIME_EVENT_LIST = {};
function AddTimeEvent(e, delay){
	TIME_EVENT_LIST[Math.random()] = {e, delay: delay/1000,};
}
function TestTimeEvents(deltaTime){
	for(var i in TIME_EVENT_LIST){
		TIME_EVENT_LIST[i].delay -= deltaTime;
		if(TIME_EVENT_LIST[i].delay <= 0){
			TIME_EVENT_LIST[i].e();
			delete TIME_EVENT_LIST[i];
		}
	}
}
function ResetTimeEvents(){
	for(var i in TIME_EVENT_LIST){ delete TIME_EVENT_LIST[i]; }
}