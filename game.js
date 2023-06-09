const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Quanto é 2 + 5",
        choice1: "2",
        choice2: "7",
        choice3: "9",
        choice4: "17",
        answer: 2,
    },
    {
        question: "Quanto é 25 + 5",
        choice1: "5",
        choice2: "25",
        choice3: "30",
        choice4: "35",
        answer: 3,
    },
    {
        question: "Quanto é 19 - 3",
        choice1: "16",
        choice2: "22",
        choice3: "13",
        choice4: "17",
        answer: 1,
    },
    {
        question: "Quanto é 62 - 15",
        choice1: "52",
        choice2: "47",
        choice3: "46",
        choice4: "48",
        answer: 2,
    },
    {
        question: "Quanto é 3 x 5",
        choice1: "21",
        choice2: "18",
        choice3: "10",
        choice4: "15",
        answer: 4,
    },
    {
        question: "Quanto é 6 x 8",
        choice1: "48",
        choice2: "46",
        choice3: "42",
        choice4: "52",
        answer: 1,
    },
    {
        question: "Quanto é 8 / 2",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "8",
        answer: 3,
    },
    {
        question: "Quanto é 72 / 9",
        choice1: "6",
        choice2: "7",
        choice3: "9",
        choice4: "8",
        answer: 4,
    },
    {
        question: "Quanto é 45 x 0",
        choice1: "45",
        choice2: "90",
        choice3: "0",
        choice4: "17",
        answer: 3,
    },
    {
        question: "Quanto é 50 / 4",
        choice1: "15",
        choice2: "12.5",
        choice3: "20",
        choice4: "12",
        answer: 2,
    }
];

const SCORE_POINT = 10;
const MAX_QUESTIONS = 10;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINT);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();