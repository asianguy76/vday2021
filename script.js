window.onload = function (argument) {
	// var lyric = "Fate fell short this time";
	var lyric = 'fuck those kids from california and their rich ass sorry friends fuck their 16th birthday beamers and their dads who play in bands fuck the stratocaster creeper whos been classically trained he swears hes staring at his shoes i know hes lying to my face fuck the poser in the mirror shes a liar but i believe her inheritance its staring at me i never stood a chance ive been talking to the devil asking her what id have to spend im not quick to spill a secret but i know the truth to getting ahead inheritance would be awfully helpful but ill take what little i can get';
	var words = {};
	var words_attr = [];
	string_handle(lyric);

	var canvasWords = document.getElementById('c');
	canvasWords.width = window.innerWidth;
	canvasWords.height = window.innerHeight;

	if (canvasWords.getContext) {
		var c = canvasWords.getContext('2d'),
			w = canvasWords.width,
			h = canvasWords.height;

		c.strokeStyle = 'red';
		c.fillStyle = 'white';
		c.lineWidth = 5;

		// constructor
		Word = function (key) {
			this.text = key;
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.font = words[key] * 10 + 'px arial';
			this.speed = words[key];
		};
		for (key in words) {
			words_attr.push(new Word(key));
		}
		console.log(words_attr.length);

		function animation() {
			for (var i = 0; i < words_attr.length; i++) {
				c.font = words_attr[i].font;
				c.fillText(words_attr[i].text, words_attr[i].x, words_attr[i].y);
				words_attr[i].width = c.measureText(words_attr[i].text).width;
				c.stroke();
			}
			move();
		}

		function move() {
			for (var i = 0; i < words_attr.length; i++) {
				if (words_attr[i].x > w) {
					words_attr[i].x = -words_attr[i].width;
					words_attr[i].y = Math.random() * h;
				} else {
					words_attr[i].x += words_attr[i].speed;
				}
			}
		}

		setInterval(function () {
			c.clearRect(0, 0, w, h);
			animation();
		}, 24);
	}

	function string_handle(str) {
		var split_str = str.split(' ');
		var word_array = [];
		var word_count = [];
		for (var i = 0; i < split_str.length; i++) {
			check = true;
			for (var j = 0; j <= word_array.length; j++) {
				if (split_str[i] == word_array[j]) {
					word_count[j]++;
					check = false;
					break;
				}
			}
			if (check) {
				word_array.push(split_str[i]);
				word_count.push(1);
			}
		}
		for (var i = 0; i < word_array.length; i++) {
			words[word_array[i]] = word_count[i];
		}
		return words;
	}

	//Heart animation

	const endAngle = 226;
	let canvasHeart = document.getElementById('c2');
	canvasHeart.width = window.innerWidth;
	canvasHeart.height = window.innerHeight;
	let context = canvasHeart.getContext('2d');
	let counter = 60;
	let radius, tx, ty;
	context.translate(tx, ty);
	randomize();
	requestAnimationFrame(animate);

	function animate() {
		let x, y;
		if (counter <= endAngle) {
			let radians = (Math.PI / 180) * counter;
			y = radius * Math.sin(radians);
			x = radius * Math.cos(radians);
			context.fillRect(radius / 2 - x, -y, 2, 2);
			context.fillRect(-radius / 2 + x, -y, 2, 2);
		} else {
			x = counter - endAngle - radius * 1.2;
			y = counter - endAngle + radius * 0.71;
			context.fillRect(x, y, 2, 2);
			context.fillRect(-x, y, 2, 2);
		}
		counter = counter + 1;
		if (counter >= endAngle + radius * 1.2) randomize();
		requestAnimationFrame(animate);
	}

	function randomize() {
		counter = 60;
		context.fillStyle = 'rgba(255,' + Math.floor(Math.random() * 255) + ', 255 ,1)';
		radius = Math.random() * 100;
		context.translate(-tx, -ty);
		tx = Math.random() * canvasHeart.width;
		ty = Math.random() * canvasHeart.height;
		context.translate(tx, ty);
	}
};
