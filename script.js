const maxErrors = 15;
let words = [];
let chosenWord = "";
let errors = 0;

async function loadWords() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    words = data.words;
    if (words.length > 0) reset();
    else console.error("The JSON file does not contain any words or is empty.");
  } catch (error) {
    console.error("Error loading words:", error);
  }
}

function checkErrors() {
  if (errors >= maxErrors) {
    alert(`You lost, The word was: ${chosenWord}`);
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
  wordDiv.innerHTML = chosenWord
    ? chosenWord
        .split("")
        .map(() => "<span>_ </span>")
        .join("")
    : "No chosen word to display.";
}

function generateLetters() {
  const letters =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const lettersDiv = document.getElementById("letters");
  lettersDiv.innerHTML = letters
    .split("")
    .map(
      (letter) =>
        `<button class="button3D" onclick="verifyLetter('${letter}', this)">${letter}</button>`
    )
    .join("");
}

function verifyLetter(chosenLetter, buttonElement) {
  buttonElement.disabled = true;
  if (chosenWord.includes(chosenLetter)) {
    const wordDiv = document.getElementById("word");
    const spans = wordDiv.getElementsByTagName("span");
    chosenWord.split("").forEach((letter, index) => {
      if (letter === chosenLetter) spans[index].textContent = letter + " ";
    });

    // Check if the word has been completely guessed
    const currentWord = Array.from(spans)
      .map((span) => span.textContent.trim())
      .join("");
    if (currentWord === chosenWord) {
      alert(`You won! The word was: ${chosenWord}`);
      reset();
    }
  } else {
    errors++;
    updateErrors();
    checkErrors();
  }
}

function updateErrors() {
  const errorDiv = document.getElementById("errors");
  errorDiv.textContent = `エラー: ${errors}/${maxErrors}`;
}

function reset() {
  errors = 0;
  chooseWord();
  generateLetters();
  updateErrors();
}

loadWords();
