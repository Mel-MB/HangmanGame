//UI Elements
const wordEl = document.getElementById('word');


// Application variables
const words = ['application', 'programmation', 'interface', 'developpeur', 'javascript'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Keydown letter press Event
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.key >= 65 && e.key <= 122) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();

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

// Show hidden / correct letters for the word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `<span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>`
			)
			.join('')}
  `;

	const writtenWord = wordEl.innerText.replace(/\n/g, '');

	if (writtenWord === selectedWord) {
		finalMessage.innerText = 'Félicitations! Vous avez gagné! 🥳';
		popup.style.display = 'flex';

		playable = false;
	}
}