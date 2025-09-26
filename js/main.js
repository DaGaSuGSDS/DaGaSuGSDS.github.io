(()=>{
	const c = document.getElementById("can");
	const ctx = c.getContext("2d");
	
	const db = []; function getRandomAnime(){ return db[Math.floor(Math.random()*db.length)] };
	const con = document.getElementById("con");
	const img = new Image();
	img.crossOrigin = "anonymous";
	
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
	
	let currentAnime = null;

	function showRandomAnime() {
		const [name, url] = getRandomAnime();
		currentAnime = name;
		img.src = url;
	}
	
	const input = document.getElementById("guess");
	const suggestions = document.getElementById("suggestions");
	let top_suggestion = "";
	const failed = [];
	
	function check(){
		const guess = document.getElementById("guess").value.toLowerCase().trim();
		if(guess == "") return;
		if (guess === currentAnime.toLowerCase()) {
			document.getElementById("result").innerText = "Acertaste";
			document.getElementById("inputBox").innerText = "";
		} else {
			level++; drawFromLevel();
			document.getElementById("result").innerText = "Intenta otra vez...";
			failed.push(input.value);
			if(level == 5) document.getElementById("result").innerText = "Fallaste el anime era... "+currentAnime;
		}
		input.value = "";
		suggestions.innerHTML = "";
	}
	document.getElementById("check").onclick = ()=>check();
	
	function update_suggestions(){
		const value = input.value.toLowerCase();
		suggestions.innerHTML = "";
		top_suggestion = "";
		if (!value) return;
		
		db.filter(([name]) => (
			name.toLowerCase().startsWith(value) && !failed.includes(name)
		)).forEach(([name]) => {
			if(name.toLowerCase() != value){
				const div = document.createElement("div");
				div.innerText = name;
				div.onclick = () => {
					input.value = name;
					suggestions.innerHTML = "";
					check();
				};
				if(top_suggestion == "") top_suggestion = name;
				suggestions.appendChild(div);
			}
		});
	}
	
	input.addEventListener("input", () => update_suggestions());
	
	input.onkeydown = function(e){
		if(e.keyCode === 9){
			e.preventDefault();
			input.value = top_suggestion;
			suggestions.innerHTML = "";
			update_suggestions();
		}
		if(e.keyCode === 13){
			e.preventDefault();
			check();
		}
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