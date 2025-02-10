document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            answer: "Harper Lee"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Iron", "Calcium"],
            answer: "Oxygen"
        }
    ];

    const questionsContainer = document.getElementById('questions');
    const scoreDisplay = document.getElementById('score');
    const submitButton = document.getElementById('submit');

    function loadQuestions() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `<p>${q.question}</p>`;
            q.options.forEach((option) => {
                const optionLabel = document.createElement('label');
                optionLabel.innerHTML = `<input type="radio" name="question${index}" value="${option}"> ${option}`;
                questionDiv.appendChild(optionLabel);
            });
            questionsContainer.appendChild(questionDiv);
        });
    }

    function saveProgress() {
        const progress = [];
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            progress.push(selectedOption ? selectedOption.value : null);
        });
        sessionStorage.setItem('progress', JSON.stringify(progress));
    }

    function loadProgress() {
        const progress = JSON.parse(sessionStorage.getItem('progress')) || [];
        progress.forEach((value, index) => {
            if (value) {
                const option = document.querySelector(`input[name="question${index}"][value="${value}"]`);
                if (option) {
                    option.checked = true;
                }
            }
        });
    }

    function calculateScore() {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });
        return score;
    }

    submitButton.addEventListener('click', () => {
        const score = calculateScore();
        scoreDisplay.innerText = `Your score is ${score} out of 5.`;
        localStorage.setItem('score', score);
    });

    document.addEventListener('change', saveProgress);
    
    loadQuestions();
    loadProgress();
});
