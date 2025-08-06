const number = document.getElementById("Number");
const answer = document.querySelector(".Answer");
const guessed_numbers = document.querySelector(".guessed_numbers");
const Guesses_span = document.querySelector(".Guesses_span");
const revealAnswer = document.querySelector(".revealAnswer");
const revealSpan = document.querySelector(".revealSpan");
const restartButton = document.querySelector(".restartButton");

let randomNum = Math.floor(Math.random() * 100);
const button = document.querySelector(".btn");
const guess_es = [];

//Function to submit number on click
const buttonClick = (e) => {
  e.preventDefault();

  const guess = Number(number.value);

  if (isNaN(guess) || number.value.trim() === "") {
    answer.textContent = "Please enter a number!!!";
    return;
  }

  if (guess === randomNum) {
    answer.innerHTML = `<div class="win-message">🎉 Congratulations, You win! ${guess} is correct number! 🎉</div>`;

    // Create confetti
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${
          Math.random() * 360
        }, 100%, 50%)`;
        confetti.style.animation = `fall ${
          Math.random() * 2 + 2
        }s linear forwards`;
        document.body.appendChild(confetti);
      }, i * 30);
    }

    // Create flying emojis
    const emojis = ["🎯", "🏆", "✨", "👑", "💎"];
    emojis.forEach((emoji, i) => {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "emoji";
        el.textContent = emoji;
        el.style.left = `${Math.random() * 80 + 10}%`;
        el.style.animationDelay = `${i * 0.5}s`;
        document.body.appendChild(el);
      }, i * 300);
    });

    // Cleanup after animation
    setTimeout(() => {
      document
        .querySelectorAll(".confetti, .emoji")
        .forEach((el) => el.remove());
    }, 5000);

    guessed_numbers.style.display = "none";
    revealAnswer.disabled = true;
    number.value = "You won! Restart game to play again";
    number.disabled = true;
    button.disabled = true;
    randomNum = Math.floor(Math.random() * 100);
    guess_es.length = 0;
  } else if (guess > randomNum) {
    answer.textContent = "The guess is high";
    number.value = "";
  } else if (guess < randomNum) {
    answer.textContent = "The guess is low";
    number.value = "";
  }
  guess_es.push(guess);
  Guesses_span.textContent = guess_es.join(", ");
};

//Event listener on submit answer click
button.addEventListener("click", buttonClick);

//Function to submit number on keyboard enter press
const onEnter = (event) => {
  if (event.key.toLowerCase() === "enter") {
    event.preventDefault();
    button.click();
  }
};

//Event listener on submit answer throug keyboard enter press
number.addEventListener("keypress", onEnter);

revealAnswer.addEventListener("click", () => {
  revealAnswer.textContent = randomNum;
  number.value = "You revealed the number. Restart to play again.";
  guessed_numbers.style.display = "none";
  answer.textContent = "";
  number.disabled = true;
  button.disabled = true;
  revealSpan.textContent =
    "Number revealed: You lost the lost game. Restart to play again";
});

restartButton.addEventListener("click", () => {
  number.value = "";
  revealAnswer.textContent = "Reveal Number";
  revealAnswer.disabled = false;
  revealSpan.textContent = "";
  guessed_numbers.style.display = "block";

  Guesses_span.textContent = "";
  guess_es.length = 0;

  number.disabled = false;
  button.disabled = false;
  answer.textContent = "";

  randomNum = Math.round(Math.random() * 100);
});
