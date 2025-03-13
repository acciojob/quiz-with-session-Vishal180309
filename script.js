const questionsData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correct: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], correct: 2 },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"], correct: 0 }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load stored progress (if available)
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load stored score (if available)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
    scoreDisplay.textContent = `Your last score was ${savedScore} out of 5.`;
}

// Generate questions dynamically
questionsData.forEach((data, qIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = data.question;
    questionDiv.appendChild(questionText);

    data.options.forEach((option, oIndex) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = `question${qIndex}`;
        radio.value = oIndex;

        // Restore previous selection
        if (savedProgress[qIndex] == oIndex) {
            radio.checked = true;
        }

        // Store answer on change
        radio.addEventListener("change", () => {
            savedProgress[qIndex] = oIndex;
            sessionStorage.setItem("progress", JSON.stringify(savedProgress));
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
});

// Submit button functionality
submitButton.addEventListener("click", () => {
    let score = 0;

    questionsData.forEach((data, qIndex) => {
        if (savedProgress[qIndex] == data.correct) {
            score++;
        }
    });

    // Display and store score
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});
