//UI Elements
const wordEl = document.getElementById('word');
const playMethod = document.querySelector('.how-to-play');

const wrongLettersEl =  document.getElementById('wrong-letters-container');
const figureParts = document.querySelectorAll('.figure-part');
const notification = document.getElementById('notification-container');

const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');


// Application variables
const words = ['application', 'programmation', 'interface', 'developpeur', 'javascript'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

let correctLetters = [];
let wrongLetters = [];

// Keydown letter press Event
window.addEventListener('keydown', e => {
	if(playable) {
		if (e.key.match(/^[a-z]$/i)) {
			const letter = e.key.toLowerCase();

            playMethod.style.display = 'none'; 

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();

				} else {

				   showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersDisplay();

				} else {

					showNotification();
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

	const writtenWord = wordEl.textContent.replace(/\n|\s/g, '');

	if (writtenWord === selectedWord) {
		finalMessage.innerText = `Félicitations! 🥳
        Vous avez gagné!`;
		popup.style.display = 'flex';

		playable = false;
	}
}


// Keep track of the wrong letters
function updateWrongLettersDisplay() {

	// Display wrong letters
	wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h2>Erreurs</h2>' : ''}
        <div class="letters">
            ${wrongLetters
                .map(letter => `<span>${letter}</span>`)
                .join('')}
        </div
    `;

	// Display parts
	Array.from(figureParts).forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === Array.from(figureParts).length) {
		finalMessage.innerText = `Vous avez perdu. 😕
        Le mot à trouver était 
        "${selectedWord}".`;
		popup.style.display = 'flex';

		playable = false;
	}
}


// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}


// Restart game 
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters = [];
	wrongLetters = [];

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersDisplay();

	popup.style.display = 'none';
    playMethod.style.display = 'block'; 
});


displayWord();


