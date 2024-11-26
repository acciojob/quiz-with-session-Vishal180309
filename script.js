// Get elements
const questionsContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

// Questions data
const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'London', 'Rome'],
    answer: 1
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    answer: 2
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'],
    answer: 0
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Au', 'Hg', 'Pb'],
    answer: 1
  },
  {
    question: 'Who wrote Romeo and Juliet?',
    options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'J.K. Rowling'],
    answer: 0
  }
];

// Get saved progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

// Display questions and options
questionsData.forEach((question, index) => {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = `
    <h2>${question.question}</h2>
    <ul>
      ${question.options.map((option, optionIndex) => `
        <li>
          <input type="radio" id="question${index}Option${optionIndex}" name="question${index}" value="${optionIndex}" ${savedProgress[index] === optionIndex ? 'checked' : ''}>
          <label for="question${index}Option${optionIndex}">${option}</label>
        </li>
      `).join('')}
    </ul>
  `;
  questionsContainer.appendChild(questionElement);
});

// Add event listeners to radio buttons
questionsContainer.addEventListener('change', (event) => {
  if (event.target.tagName === 'INPUT') {
    const questionIndex = parseInt(event.target.name.replace('question', ''));
    const optionIndex = parseInt(event.target.value);
    savedProgress[questionIndex] = optionIndex;
    sessionStorage.setItem('progress', JSON.stringify(savedProgress));
  }
});

// Add event listener to submit button
submitButton.addEventListener('click', () => {
  let score = 0;
  questionsData.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });
  scoreDisplay.textContent = `Your score is ${score} out of ${questionsData.length}`;
  localStorage.setItem('score', score);
});

// Display saved score
const savedScore = localStorage.getItem('score');
if (savedScore) {
  scoreDisplay.textContent = `Your previous score is ${savedScore} out of ${questionsData.length}`;
}