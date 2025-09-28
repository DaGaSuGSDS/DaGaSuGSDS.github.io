(()=>{
	const c = document.getElementById("can");
	const ctx = c.getContext("2d");
	
	const input = document.getElementById("guess");
	const suggestions = document.getElementById("suggestions");
	const overlay = document.getElementById("overlay");
	const message = document.getElementById("message");
	const guessin = document.getElementById("check");
	const input_box = document.getElementById("inputBox");
	
	const failed = [];
	
	const first_try_messages = ["First try! That's my man!", "Way to go pal! First try!", "One of a kind anime GOD!", "One man, one try, one hit, perfection."];
	const two_to_five_messages = ["Sweet guess!", "You got it!", "Keep it up man!", "That is the spirit!", "Anime master!"];
	const rest_messages = ["Got there!", "There it is!", "Good job my man!", "Continue, you got this!"]

	function random(){ return Math.random(); }
	
	const db = []; 
	function getRandomAnime(){ return db[Math.floor(random()*db.length)] };
	
	const img = new Image();
	img.crossOrigin = "anonymous";
	
	const win_img_height_value = 500;
	
	let level = 0;
	function drawFromLevel(){
		switch(level){
			case 0:
				drawPointedImage(c, ctx, img, 1, 5, 100, 10000); break;
			case 1:
				drawPointedImage(c, ctx, img, 1, 4, 200, 20000); break;
			case 2:
				drawPointedImage(c, ctx, img, 1, 3, 300, 30000); break;
			case 3:
				drawPointedImage(c, ctx, img, 1, 2, 500, 50000); break;
			case 4:
				drawPointedImage(c, ctx, img, 1, 1, 1000, 100000); break;
			default:
				break;
		}
	}
	img.onload = ()=>{ drawFromLevel(); }
	
	let currentAnime = "";
	function showRandomAnime() {
		const [name, url] = getRandomAnime();
		currentAnime = name;
		img.src = url;
	}
	
	let top_suggestion = "";
	let highlighted_suggestion = -1;
	let suggestion_list = [];
	function reset_suggestions(){
		suggestions.innerHTML = "";
		top_suggestion = "";
		highlighted_suggestion = -1;
		suggestion_list = [];	
	}
	
	function highlight_suggestion(){
		suggestion_list.forEach((suggestion, index) => {
			if(index == highlighted_suggestion) suggestion.classList.add("selected");
			else suggestion.classList.remove("selected");
		})
	}
	
	function check(){
		const guess = input.value.toLowerCase().trim();
		if(guess == "") return;
		if (guess === currentAnime.toLowerCase()) win(); 
		else failCheck();
		input.value = "";
		reset_suggestions();
	}
	guessin.onclick = ()=>check();
	
	function check_sentence_value(sentence, value){
		const n = sentence.toLowerCase();
		const s = n.split(" ");
		if(n.startsWith(value) || (value.includes(" ") && n.includes(value))) return true;
		for(let i = 0; i<s.length; i++){
			if(s[i].startsWith(value)) return true;
		}
		return false;
	}
	
	function update_suggestions(){
		const value = input.value.toLowerCase().trim();
		reset_suggestions();
		if (!value) return;
		
		db.filter(([name]) => (
			!failed.includes(name) && check_sentence_value(name, value)
		)).forEach(([name]) => {
			const div = document.createElement("div");
			div.innerText = name;
			div.onclick = () => {
				input.value = name;
				check();
			};
			div.onmouseenter = () => {
				highlighted_suggestion = Array.from(suggestion_list).indexOf(div);
				highlight_suggestion();
			};
			
			if(top_suggestion == "") top_suggestion = name;
			suggestions.appendChild(div);
			suggestion_list.push(div);
		});
	}
	
	input.addEventListener("input", () => update_suggestions());
	
	input.onkeydown = function(e){
		if(e.keyCode === 9){
			e.preventDefault();
			if(highlighted_suggestion > -1){
				input.value = suggestion_list[highlighted_suggestion].innerText;
				update_suggestions();
				return;
			}
			if(top_suggestion){
				input.value = top_suggestion;
				update_suggestions();
				return;
			}
			return;
		}
		if(e.keyCode === 13){
			e.preventDefault();
			if (highlighted_suggestion >= 0 && highlighted_suggestion < suggestion_list.length){
				input.value = suggestion_list[highlighted_suggestion].innerText;
				check();
			} else {
				check();
			}
			return;
		}
		if(e.keyCode === 38){
			if(suggestion_list.length > 0){
				e.preventDefault();
				highlighted_suggestion = Math.max(highlighted_suggestion - 1, 0);
				highlight_suggestion();
				suggestion_list[highlighted_suggestion].scrollIntoView({block:"nearest"});
			}
			return;
		}
		if(e.keyCode === 40){
			if(suggestion_list.length > 0){
				e.preventDefault();
				highlighted_suggestion = Math.min(highlighted_suggestion + 1, suggestion_list.length - 1);
				highlight_suggestion();
				suggestion_list[highlighted_suggestion].scrollIntoView({block:"nearest"});
			}
			return;
		}
	}
	
	function win(){
		input_box.innerText = "";
		
		overlay.classList.add("active");
		message.innerHTML = "The anime was " + input.value + "<br>";
		message.appendChild(img);
		
		const proportion = img.width / img.height;
		
		img.height = win_img_height_value; img.width = img.height * proportion;
		
		level++;
		if(level == 1) message.innerHTML += "<br>" +  first_try_messages[Math.floor(random() * first_try_messages.length)];
		else if(level >= 2 && level < 5) message.innerHTML += "<br>"+ two_to_five_messages[Math.floor(random() * two_to_five_messages.length)] +" "+level+" tries is all it takes.";
		else message.innerHTML += "<br>"+ rest_messages[Math.floor(random() * rest_messages.length)] +" "+level+" tries.";
	}
	
	function failCheck(){
		level++; 
		drawFromLevel();
		failed.push(input.value);
	}
	
	async function init() {
		const resp = await fetch("data/animes.csv");
		const text = await resp.text();
		const rows = text.trim().split("\n").map(r => r.split(","));
		for (let i = 1; i < rows.length; i++) {
			if (!rows[i][1] || !rows[i][5]) continue;
			db.push([rows[i][1], rows[i][5]]);
		}
		showRandomAnime();
	}
	init();
})();