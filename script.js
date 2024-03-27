let words = [];
let chosenWord = "";
let errors = 0;
const maxErrors = 30;

// Ensures loadWords is called at the right time and that chosenWord can never be undefined due to incorrect timing.
function loadWords() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      words = data.words;
      if (words.length > 0) {
        reset();
      } else {
        console.error("The JSON file does not contain any words or is empty.");
      }
    })
    .catch((error) => console.error("Error loading words:", error));
}

// check if error is less than maxErrors
function checkErrors() {
  if (errors >= maxErrors) {
    alert(" You lost, The word was: " + chosenWord);
    reset();
  }
}

function chooseWord() {
  if (words.length > 0) {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
  } else {
    console.error("No word to choose, the array is empty.");
  }
}

function displayWord() {
  const wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  if (chosenWord) {
    chosenWord.split("").forEach((letter) => {
      const letterElement = document.createElement("span");
      letterElement.textContent = "_ ";
      wordDiv.appendChild(letterElement);
    });
  } else {
    console.log("No chosen word to display.");
  }
}

function generateLetters() {
  const letters =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const lettersDiv = document.getElementById("letters");
  lettersDiv.innerHTML = "";
  letters.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.className = "button3D";
    button.textContent = letter;
    button.onclick = function () {
      verifyLetter(letter, button);
    };
    lettersDiv.appendChild(button);
  });
}

function verifyLetter(chosenLetter, buttonElement) {
  // Disable the button
  buttonElement.disabled = true;

  // Check if the chosenWord contains the chosenLetter
  if (chosenWord.includes(chosenLetter)) {
    // If it does, update the display
    const wordDiv = document.getElementById("word");
    const spans = wordDiv.getElementsByTagName("span");
    chosenWord.split("").forEach((letter, index) => {
      if (letter === chosenLetter) {
        spans[index].textContent = letter + " ";
      }
    });
  } else {
    // If it does not, increment the error counter
    errors++;
    const errorDiv = document.getElementById("errors");
    errorDiv.textContent = `エラー: ${errors}/${maxErrors}`;
    checkErrors();
  }
}

function setError() {
  const errorDiv = document.getElementById("errors");
  errorDiv.textContent = `エラー: ${errors}/${maxErrors}`;
}

function resetErrors() {
  errors = 0;
  const errorDiv = document.getElementById("errors");
  errorDiv.textContent = `エラー: ${errors}/${maxErrors}`;
}

function reset() {
  chooseWord();
  generateLetters();
  setError();
  resetErrors();
}

loadWords(); // Ensure this function is called after the definition of all necessary functions.
