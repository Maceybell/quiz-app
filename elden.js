const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions;
let currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click',  () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
  {
    question: "Who gives you the spectral steed whistle?",
    answers: [
      { text: "Blaidd", correct: false },
      { text: "Iji", correct: false },
      { text: "Melina", correct: true },
      { text: "Ranni", correct: false },
    ],
  },
  {
    question: "What does Hyetta believe she is being fed?",
    answers: [
      { text: "Berries", correct: false },
      { text: "Grapes", correct: true },
      { text: "Hazelnuts", correct: false },
      { text: "Eyes", correct: false },
    ],
  },
  {
    question: "How is Melina killed?",
    answers: [
      { text: "She is engulfed in flame from the Mountaintops of the Giants in order to burn the Erdtree", correct: true },
      { text: "She is summoned during the Radahn festival, sacrificing herself to save the Tarnished near the end of the fight", correct: false },
      { text: "She is betrayed by Fia", correct: false },
      { text: "Her soul is absorbed by the Tarnished in order for them to be accepted by the Erdtree", correct: false },
    ],
  },
  {
    question: "What does Preceptor Seluvis craft?",
    answers: [
      { text: "Jars", correct: false },
      { text: "Spells", correct: false },
      { text: "Puppets", correct: true },
      { text: "Swords", correct: false },
    ],
  },
];
