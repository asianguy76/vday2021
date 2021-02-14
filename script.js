window.onload = function (argument) {
	// var lyric = "i couldn't take it couldn't stand another minute couldn't bear another day without you in it";
	var lyric = "Fate fell short this time. Your smile fades in the summer. Place your hands in mine, I'll leave when I wanna. Are we alone do you feel it. So lost and disillusioned. I haven't been this scared in a long time And I'm so unprepared so here's your valentine Bouquet of clumsy words, a simple melody This world's an ugly place, but you're so beautiful I'm still young I'm wasted and I'm not getting younger I'll grow up I promise that I'll grow up next summer I'm still young you plus me is euphoria I'm wasted, and I'm not getting younger I'll grow up I have sinned, don't help me, Jesus I promise that I'll grow up next summer";
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
};
