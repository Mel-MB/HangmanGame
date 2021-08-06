const words = ['application', 'programmation', 'interface', 'developpeur', 'javascript'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Keydown letter press evvent
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.key >= 65 && e.key <= 122) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					// displayWord();
				} else {
					// showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					// updateWrongLettersDisplay();
				} else {
					// showNotification();
				}
			}
		}
	}
});

