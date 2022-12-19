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
    question: "How long can a saquaro cactus live?",
    answers: [
      { text: "1-10 years", correct: false },
      { text: "25-50 years", correct: false },
      { text: "100-200 years", correct: true },
      { text: "1000 or more years", correct: false },
    ],
  },
  {
    question: "What holiday is the Poinsetta commonly associated with?",
    answers: [
      { text: "Valentine's Day", correct: false },
      { text: "Christmas", correct: true },
      { text: "Easter", correct: false },
      { text: "Thanksgiving", correct: false },
    ],
  },
  {
    question: "What plant contains a chemical called mescaline, which causes hallucinations?",
    answers: [
      { text: "Peyote", correct: true },
      { text: "Tobacco", correct: false },
      { text: "Century Plant", correct: false },
      { text: "Stinging Nettle", correct: false },
    ],
  },
  {
    question: "What cactus is known for breaking off and flying at your body if you get too close",
    answers: [
      { text: "Prickly Pear", correct: false },
      { text: "Barrell Cactus", correct: false },
      { text: "Jumping Cholla", correct: true },
      { text: "Succulent", correct: false },
    ],
  },
];
