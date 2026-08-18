const words = [
    {
        word: "JAVASCRIPT",
        hint: "Linguagem muito usada no desenvolvimento web"
    },

    {
        word: "HTML",
        hint: "Linguagem usada para estruturar páginas"
    },

    {
        word: "CSS",
        hint: "Usado para deixar as páginas bonitas"
    },

    {
        word: "GITHUB",
        hint: "Plataforma muito usada para guardar código"
    },

    {
        word: "PROGRAMACAO",
        hint: "Atividade de escrever código"
    },

    {
        word: "COMPUTADOR",
        hint: "Máquina usada para executar programas"
    },

    {
        word: "ALGORITMO",
        hint: "Sequência de passos para resolver um problema"
    },

    {
        word: "BANCO",
        hint: "Onde podemos armazenar dados"
    },

    {
        word: "SERVIDOR",
        hint: "Computador que fornece serviços para outros computadores"
    },

    {
        word: "PYTHON",
        hint: "Linguagem famosa pela sintaxe simples"
    }
];


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


let selectedWord;

let selectedHint;

let guessedLetters = [];

let errors = 0;

const maxErrors = 6;


// Elementos HTML

const wordElement = document.getElementById("word");

const hintElement = document.getElementById("hint");

const keyboardElement = document.getElementById("keyboard");

const errorsElement = document.getElementById("errors");

const restartButton = document.getElementById("restart");

const modal = document.getElementById("modal");

const modalTitle = document.getElementById("modal-title");

const modalMessage = document.getElementById("modal-message");

const modalIcon = document.getElementById("modal-icon");

const modalButton = document.getElementById("modal-button");


// Partes da forca

const hangmanParts = [
    "head",
    "body",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg"
];


// =============================
// NOVO JOGO
// =============================

function newGame() {

    const randomIndex = Math.floor(
        Math.random() * words.length
    );

    selectedWord = words[randomIndex].word;

    selectedHint = words[randomIndex].hint;

    guessedLetters = [];

    errors = 0;

    errorsElement.textContent = errors;

    hintElement.textContent = `Dica: ${selectedHint}`;

    modal.classList.add("hidden");

    resetHangman();

    createKeyboard();

    updateWord();
}


// =============================
// MOSTRAR PALAVRA
// =============================

function updateWord() {

    wordElement.innerHTML = "";

    let completed = true;


    selectedWord.split("").forEach(letter => {

        const span = document.createElement("span");


        if (guessedLetters.includes(letter)) {

            span.textContent = letter;

        } else {

            span.textContent = "_";

            completed = false;
        }


        wordElement.appendChild(span);

    });


    if (completed) {

        endGame(true);
    }
}


// =============================
// CRIAR TECLADO
// =============================

function createKeyboard() {

    keyboardElement.innerHTML = "";


    letters.forEach(letter => {

        const button = document.createElement("button");

        button.textContent = letter;

        button.classList.add("key");

        button.addEventListener(
            "click",
            () => guessLetter(letter, button)
        );


        keyboardElement.appendChild(button);

    });
}


// =============================
// TENTAR LETRA
// =============================

function guessLetter(letter, button) {

    button.disabled = true;


    if (selectedWord.includes(letter)) {

        guessedLetters.push(letter);

        button.classList.add("correct");

        updateWord();

    } else {

        button.classList.add("wrong");

        errors++;

        errorsElement.textContent = errors;

        showHangmanPart();

        if (errors >= maxErrors) {

            endGame(false);
        }
    }
}


// =============================
// DESENHAR BONECO
// =============================

function showHangmanPart() {

    const part = document.getElementById(
        hangmanParts[errors - 1]
    );

    if (part) {

        part.style.visibility = "visible";
    }
}


// =============================
// RESETAR FORCA
// =============================

function resetHangman() {

    hangmanParts.forEach(part => {

        const element = document.getElementById(part);

        element.style.visibility = "hidden";

    });
}


// =============================
// FINAL DO JOGO
// =============================

function endGame(won) {

    setTimeout(() => {

        modal.classList.remove("hidden");


        if (won) {

            modalIcon.textContent = "🎉";

            modalTitle.textContent = "Você conseguiu! 💕";

            modalMessage.textContent =
                `Parabéns! Você descobriu "${selectedWord}".`;

        } else {

            modalIcon.textContent = "😢";

            modalTitle.textContent = "Quase!";

            modalMessage.textContent =
                `A palavra era "${selectedWord}".`;
        }

    }, 400);
}


// =============================
// BOTÕES
// =============================

restartButton.addEventListener(
    "click",
    newGame
);

modalButton.addEventListener(
    "click",
    newGame
);


// =============================
// TECLADO DO COMPUTADOR
// =============================

document.addEventListener(
    "keydown",
    event => {

        const letter = event.key.toUpperCase();


        if (!letters.includes(letter)) {
            return;
        }


        const buttons =
            document.querySelectorAll(".key");


        buttons.forEach(button => {

            if (
                button.textContent === letter &&
                !button.disabled
            ) {

                button.click();
            }

        });

    }
);


// =============================
// INICIAR
// =============================

newGame();