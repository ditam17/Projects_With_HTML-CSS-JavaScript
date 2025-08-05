```JavaScript
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

button.addEventListener("click", (e) => {
  e.preventDefault();

  const guess = Number(number.value);

  if (isNaN(guess) || number.value.trim() === "") {
    answer.textContent = "Please enter a number!!!";
    return;
  }

  if (guess === randomNum) {
    if (guess === randomNum) {
      answer.innerHTML = `<div class="win-message">🎉 Congratulations! ${guess} is correct! 🎉</div>`;

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
    }
    guessed_numbers.style.display = "none";
    randomNum = Math.floor(Math.random() * 100);
    guess_es.length = 0;
  } else if (guess > randomNum) {
    answer.textContent = "The guess is high";
  } else if (guess < randomNum) {
    answer.textContent = "The guess is low";
  }
  guess_es.push(guess);
  Guesses_span.textContent = guess_es.join(", ");
  number.value = "";
});

number.addEventListener("keypress", (event) => {
  if (event.key.toLowerCase() === "enter") {
    event.preventDefault();
    button.click();
  }
});

revealAnswer.addEventListener("click", () => {
  revealAnswer.textContent = randomNum;
  number.disabled = true;
  button.disabled = true;
  guessed_numbers.textContent =
    "Number revealed: You lost the lost game. Restart to play again";
});

restartButton.addEventListener("click", () => {
  revealAnswer.textContent = "Reveal Answer";
  revealSpan.textContent = "";
  number.disabled = false;
  button.disabled = false;
  answer.textContent = "";
  Guesses_span.textContent = "";
  guessed_numbers.textContent = "Your guessed numbers are:";
  randomNum = Math.round(Math.random() * 100);
});
```
