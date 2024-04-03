const questions = [
    {
        question: "Qual propriedade CSS é usada para definir a cor do texto?",
        answers: [
            { text: "text-style", correct: false},
            { text: "color", correct: true},
            { text: "font-color", correct: false},
            { text: "nenhuma", correct: false},
            { text: "text-color", correct: false}
        ]
    },

    {
        question: "Qual tag é usada para criar um link em HTML?",
        answers: [
            { text: "link", correct: false},
            { text: "href", correct: false},
            { text: "ref", correct: false},
            { text: "a", correct: true},
            { text: "outro", correct: false},
        ]
    },
    {
        question: "Qual tag é usada para criar uma lista ordenada em HTML?",
        answers: [
            { text: "ol", correct:true},
            { text: "ul", correct: false},
            { text: "li", correct: false},
            { text: "list", correct: false},
            { text: "nenhuma", correct: false}
        ]
    },

    {
        question: "Qual palavra-chave é usada para declarar uma variável em JavaScript?",
        answers: [
            { text: "variavel", correct: false},
            { text: "var", correct: false},
            { text: "let", correct: true},
            { text: "const", correct: false},
            { text: "public", correct: false}
        ]
    },

    {
        question: "Qual é a função do CSS no desenvolvimento web?",
        answers: [
            { text: "Manipular o comportamento do navegador", correct: false},
            { text: "Estruturar e organizar o conteúdo de uma página web", correct: false},
            { text: "Adicionar interatividade e dinamismo a uma página web", correct: false},
            { text: "Estilizar e formatar a apresentação visual de uma página web", correct: true},
            { text: "Todas falsas", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `O jogo terminou!`;
    nextButton.innerHTML = "Reiniciar";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

