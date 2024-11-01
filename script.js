document.addEventListener("DOMContentLoaded", () => {

  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");

  const questions = [
      {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
      },
      {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
      },
      {
          question: "Who wrote 'Hamlet'?",
          choices: [
              "Charles Dickens",
              "Jane Austen",
              "William Shakespeare",
              "Mark Twain",
          ],
          answer: "William Shakespeare",
      },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selected = false; // To prevent multiple selections

  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          showQuestion();
      } else {
          showResult();
      }
  });
  restartBtn.addEventListener("click", () => {
      currentQuestionIndex = 0;
      score = 0;
      resultContainer.classList.add("hidden");
      startQuiz();
  });

  function startQuiz() {
      startBtn.classList.add("hidden");
      questionContainer.classList.remove("hidden");
      resultContainer.classList.add("hidden");
      showQuestion();
  }

  function showQuestion() {
      nextBtn.classList.add("hidden");
      questionText.textContent = questions[currentQuestionIndex].question;
      choicesList.innerHTML = ""; // Clear previous choices
      selected = false; // Reset selection for the new question

      questions[currentQuestionIndex].choices.forEach(choice => {
          const li = document.createElement('li');
          li.textContent = choice;
          li.classList.add('choice-item'); // Add class for styling
          li.addEventListener('click', () => selectAnswer(choice, li));

          choicesList.appendChild(li);
      });
  }

  function selectAnswer(choice, li) {
      if (selected) return; // Prevent multiple selections
      selected = true;

      const correctAnswer = questions[currentQuestionIndex].answer;

      if (choice === correctAnswer) {
          score++;
          li.classList.add('correct'); // Apply green color
      } else {
          li.classList.add('incorrect'); // Apply red color
          // Optionally highlight the correct answer as well
          Array.from(choicesList.children).forEach(item => {
              if (item.textContent === correctAnswer) {
                  item.classList.add('correct'); // Highlight correct choice
              }
          });
      }

      nextBtn.classList.remove("hidden");
  }

  function showResult() {
      questionContainer.classList.add("hidden");
      resultContainer.classList.remove("hidden");
      scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
