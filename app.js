// =======================
// Jeu de Quiz Basique
// =======================

// Questions par défaut
let questions = [
  {
    question: "Quelle est la capitale de la France ?",
    correct: "Paris",
    incorrect: ["Londres", "Rome", "Berlin"]
  },
  {
    question: "Combien font 2 + 2 ?",
    correct: "4",
    incorrect: ["3", "5", "22"]
  },
  {
    question: "Quel est l’animal terrestre le plus rapide ?",
    correct: "Guépard",
    incorrect: ["Lion", "Tigre", "Léopard"]
  },
  {
    question: "Quel océan borde la côte ouest des États-Unis ?",
    correct: "Océan Pacifique",
    incorrect: ["Océan Atlantique", "Océan Indien"]
  },
  {
    question: "Quelle planète est surnommée la planète rouge ?",
    correct: "Mars",
    incorrect: ["Venus", "Jupiter", "Mercure"]
  }
];

let currentQuestionIndex = 0;
let score = 0;

// Sélecteurs DOM
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-answer");
const nextBtn = document.getElementById("next-question");

// Charger une question
function loadQuestion() {
  feedback.classList.add("hidden");
  submitBtn.classList.add("hidden");
  answerOptions.innerHTML = "";

  if (currentQuestionIndex >= questions.length) {
    showScore();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Crée un tableau avec toutes les réponses (mélangées)
  const answers = [currentQuestion.correct, ...currentQuestion.incorrect];
  shuffleArray(answers);

  answers.forEach(answer => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer, currentQuestion.correct);
    li.appendChild(btn);
    answerOptions.appendChild(li);
  });
}

// Vérification de la réponse
function selectAnswer(answer, correctAnswer) {
  feedback.classList.remove("hidden");
  if (answer === correctAnswer) {
    feedback.textContent = "Bonne réponse ✅";
    feedback.className = "feedback correct";
    score++;
  } else {
    feedback.textContent = "Mauvaise réponse ❌";
    feedback.className = "feedback wrong";
  }
  currentQuestionIndex++;
  submitBtn.classList.remove("hidden");
}

// Passer à la question suivante
submitBtn.addEventListener("click", loadQuestion);
nextBtn.addEventListener("click", loadQuestion);

// Afficher le score final
function showScore() {
  questionText.textContent = `Quiz terminé ! Ton score : ${score} / ${questions.length}`;
  answerOptions.innerHTML = "";
  feedback.classList.add("hidden");
  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

// Mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Ajout de nouvelles questions via formulaire
const form = document.getElementById("add-question-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newQuestion = document.getElementById("new-question").value;
  const newCorrectAnswer = document.getElementById("new-correct-answer").value;
  const newIncorrectAnswers = document.getElementById("new-incorrect-answers").value.split(",");

  if (newQuestion && newCorrectAnswer && newIncorrectAnswers.length > 0) {
    questions.push({
      question: newQuestion,
      correct: newCorrectAnswer,
      incorrect: newIncorrectAnswers.map(ans => ans.trim())
    });

    form.reset();
    alert("Nouvelle question ajoutée !");
  }
});

// Charger la première question
loadQuestion();
