const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#Reset-button');
const newGameButton = document.querySelector('#Newgame-button');
const winner = document.querySelector('#winner');
const wcontainer = document.querySelector('#wcontainer');

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let turn0 = true;

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = '';
  });
};

const newGame = () => {
  turn0 = true;
  enableBoxes();
  wcontainer.classList.add('hide');
};

const resetGame = () => {
  newGame();
};

const showWinner = (player) => {
  winner.innerText = `🎉 Player ${player} Wins! 🎉`;
  wcontainer.classList.remove('hide');
  disableBoxes();
};

const checkForDraw = () => {
  const allFilled = Array.from(boxes).every((box) => box.innerText !== '');
  if (allFilled) {
    winner.innerText = `It's a Draw! 🤝`;
    wcontainer.classList.remove('hide');
    disableBoxes();
  }
};

const checkForWinner = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText !== '' &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};


boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turn0) {
      box.innerText = 'O';
    } else {
      box.innerText = 'X';
    }
    box.disabled = true;
    turn0 = !turn0;

    const winnerFound = checkForWinner();
    if (!winnerFound) {
      checkForDraw();
    }
  });
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);
