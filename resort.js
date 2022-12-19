const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const counterElement = document.getElementById("counter")

let shuffledQuestions;
let currentQuestionIndex;
let numberCorrect;
let questionsAnswered;

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
  counterElement.classList.remove("hide")
  setNextQuestion();
  numberCorrect=0
  questionsAnswered=0
  updateCounter()
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
    answerButtonsElement.disabled=false

    
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
        button.disabled=true
    })

    

    if(correct){
      numberCorrect++
      questionsAnswered++
        updateCounter()
    } else {
      questionsAnswered++
      updateCounter()
    }

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
    } else {
        element.classList.add('wrong')
    }}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function updateCounter(){
  counterElement.innerText = `${numberCorrect} / ${questionsAnswered} correct` 
}

const questions = [
  {
    question: "Where is Sundance Resort?",
    answers: [
      { text: "Mt. Timpanogos in Utah", correct: true },
      { text: "Mt. Whitney in California", correct: false },
      { text: "Capitol Peak in Colorado", correct: false },
      { text: "Wolf Mountain in Wyoming", correct: false },
    ],
  },
  {
    question: "Where is Mont Blanc Resort?",
    answers: [
      { text: "Whitefish, Montana", correct: false },
      { text: "Zermatt, Switzerland", correct: false },
      { text: "Brocken, Germany", correct: false },
      { text: "Chamonix, France", correct: true },
    ],
  },
  {
    question: "What state holds Big Sky resort?",
    answers: [
      { text: "Utah", correct: false },
      { text: "Montana", correct: true },
      { text: "Wyoming", correct: false },
      { text: "California", correct: false },
    ],
  },
  {
    question: "What is the world's largest ski resort?",
    answers: [
      { text: "Mammoth", correct: false },
      { text: "Zermatt", correct: false },
      { text: "Les 3 Vallées", correct: true },
      { text: "Niseko", correct: false },
    ],
  },
];
