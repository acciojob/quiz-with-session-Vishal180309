// Get elements
const questions = document.querySelectorAll('.question');
const options = document.querySelectorAll('.option');
const submitButton = document.querySelector('#submit');
const scoreDisplay = document.querySelector('#score');

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

// Initialize progress and score
let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
let score = 0;

// Display questions and options
questionsData.forEach((question, index) => {
  const questionElement = questions[index];
  questionElement.textContent = question.question;

  question.options.forEach((option, optionIndex) => {
    const optionElement = options[index * 4 + optionIndex];
    optionElement.textContent = option;

    // Check if option is selected
    if (progress[index] === optionIndex) {
      optionElement.classList.add('selected');
    }

    // Add event listener to option
    optionElement.addEventListener('click', () => {
      // Remove selected class from all options
      options.forEach(option => option.classList.remove('selected'));

      // Add selected class to clicked option
      optionElement.classList.add('selected');

      // Update progress
      progress[index] = optionIndex;
      sessionStorage.setItem('progress', JSON.stringify(progress));
    });
  });
});

// Add event listener to submit button
submitButton.addEventListener('click', () => {
  // Calculate score
  questionsData.forEach((question, index) => {
    if (progress[index] === question.answer) {
      score++;
    }
  });

  // Display score
  scoreDisplay.textContent = `Your score is ${score} out of ${questionsData.length}`;

  // Store score in local storage
  localStorage.setItem('score', score);
});
