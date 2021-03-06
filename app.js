//UI Elements
const wordEl = document.getElementById('word');
const playMethod = document.querySelector('.how-to-play');

const wrongLettersEl =  document.getElementById('wrong-letters-container');
const figureParts = document.querySelectorAll('.figure-part');
const notification = document.querySelector('.notification-container');

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
    wordEl.setAttribute('aria-label',`Le mot à trouver contient ${selectedWord.length} lettres.`)
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter,index => `<span class="letter" aria-label="${correctLetters.includes(letter) ? letter : 'lettre inconnue'} en position ${index+1}">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>`
			)
			.join('')}
  `;

	const writtenWord = wordEl.textContent.replace(/\n|\s/g, '');

	if (writtenWord === selectedWord) {
		finalMessage.innerText = `Félicitations! 🥳
        Vous avez gagné!`;
        popup.attr('aria-hidden','false');
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
                .map(letter => `<span class="letter">${letter}</span>`)
                .join('')}
        </div
    `;

	// Display parts
	Array.from(figureParts).forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
            part.attr('aria-hidden','false');
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
        popup.attr('aria-hidden','false');

		playable = false;
	}
}


// Show notification
function showNotification() {
	notification.classList.add('show');
    notification.attr('aria-hidden','false');


	setTimeout(() => {
		notification.classList.remove('show');
        notification.attr('aria-hidden','true');
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
    popup.attr('aria-hidden','false');

    playMethod.style.display = 'block'; 
});


displayWord();


