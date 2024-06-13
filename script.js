let correctAnswers = 0;
let totalQuestions = 0;
let currentAnswer;

const scoreElement = document.getElementById('score');
const taskElement = document.getElementById('task');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextTaskButton = document.getElementById('nextTask');

function generateTask() {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 2;
    currentAnswer = a * b;
    taskElement.textContent = `${a} × ${b} = `;

    const options = [currentAnswer];
    while (options.length < 4) {
        const wrongAnswer = Math.floor(Math.random() * 81) + 4;
        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    options.sort(() => Math.random() - 0.5);

    optionsElement.innerHTML = '';
    options.forEach(option => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = option;
        radio.addEventListener('change', checkAnswer);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsElement.appendChild(label);
    });

    resultElement.textContent = '';
    totalQuestions++;
}

function checkAnswer(event) {
    const selectedAnswer = parseInt(event.target.value);
    if (selectedAnswer === currentAnswer) {
        resultElement.textContent = 'Правильно!';
        correctAnswers++;
    } else {
        resultElement.textContent = `Помилка, правильна відповідь "${currentAnswer}"`;
    }
    updateScore();
    disableOptions();
}

function updateScore() {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    scoreElement.textContent = `Загальний рахунок: ${percentage}% (${correctAnswers} правильних відповідей з ${totalQuestions})`;
}

function disableOptions() {
    const options = optionsElement.querySelectorAll('input');
    options.forEach(option => option.disabled = true);
}

nextTaskButton.addEventListener('click', generateTask);

generateTask();