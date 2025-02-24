// Define quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correctAnswer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Caravaggio"],
        correctAnswer: 0
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Ag", "Au", "Hg", "Pb"],
        correctAnswer: 1
    },
    {
        question: "Who wrote Romeo and Juliet?",
        answers: ["William Shakespeare", "Jane Austen", "Charles Dickens", "J.K. Rowling"],
        correctAnswer: 0
    }
];

// Function to render quiz questions
function renderQuiz() {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <h2>${question.question}</h2>
            <input type="radio" id="q${index}a1" name="q${index}" value="0">
            <label for="q${index}a1">${question.answers[0]}</label>
            <br>
            <input type="radio" id="q${index}a2" name="q${index}" value="1">
            <label for="q${index}a2">${question.answers[1]}</label>
            <br>
            <input type="radio" id="q${index}a3" name="q${index}" value="2">
            <label for="q${index}a3">${question.answers[2]}</label>
            <br>
            <input type="radio" id="q${index}a4" name="q${index}" value="3">
            <label for="q${index}a4">${question.answers[3]}</label>
        `;

        questionsContainer.appendChild(questionElement);
    });

    // Restore previously selected answers from session storage
    const storedProgress = sessionStorage.getItem("progress");
    if (storedProgress) {
        const selectedAnswers = JSON.parse(storedProgress);
        selectedAnswers.forEach((answer, index) => {
            const radioElement = document.querySelector(`input[name="q${index}"][value="${answer}"]`);
            if (radioElement) {
                radioElement.checked = true;
            }
        });
    }
}

// Function to handle radio button changes
function handleRadioButtonChange(event) {
    const selectedAnswers = [];
    questions.forEach((question, index) => {
        const radioElements = document.querySelectorAll(`input[name="q${index}"]`);
        radioElements.forEach((radioElement) => {
            if (radioElement.checked) {
                selectedAnswers.push(radioElement.value);
            }
        });
    });

    // Store selected answers in session storage
    sessionStorage.setItem("progress", JSON.stringify(selectedAnswers));
}

// Function to handle submit button click
function handleSubmit() {
    const selectedAnswers = [];
    questions.forEach((question, index) => {
        const radioElements = document.querySelectorAll(`input[name="q${index}"]`);
        radioElements.forEach((radioElement) => {
            if (radioElement.checked) {
                selectedAnswers.push(radioElement.value);
            }
        });
    });

    // Calculate score
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer == questions[index].correctAnswer) {
            score++;
        }
    });

    // Display score
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = `Your score is ${score} out of ${questions.length}.`;

    // Store score in local storage
    localStorage.setItem("score", score);
}

// Add event listeners
document.addEventListener("DOMContentLoaded", renderQuiz);
const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", handleRadioButtonChange);
});
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);