const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    let cells = [];
    let currentPlayer = 'X';
    let gameActive = true;
    let gameMode = 'human'; // 'human' or 'computer'
    let boardState = Array(9).fill('');

    document.querySelectorAll('input[name="mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        gameMode = e.target.value;
        resetGame();
      });
    });

    function initializeBoard() {
      board.innerHTML = '';
      boardState = Array(9).fill('');
      gameActive = true;
      currentPlayer = 'X';
      statusText.textContent = '';
      cells = [];

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
      }
    }

    function handleClick(e) {
      const index = e.target.dataset.index;

      if (!gameActive || boardState[index] !== '') return;

      boardState[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
      }

      if (!boardState.includes('')) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      if (gameMode === 'computer' && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
      }
    }

    function computerMove() {
      if (!gameActive) return;
      let emptyIndices = boardState.map((val, idx) => val === '' ? idx : null).filter(idx => idx !== null);
      let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      boardState[move] = 'O';
      cells[move].textContent = 'O';

      if (checkWin()) {
        statusText.textContent = `Computer wins! 🤖`;
        gameActive = false;
        return;
      }

      if (!boardState.includes('')) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
      }

      currentPlayer = 'X';
    }

    function checkWin() {
      const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
      ];

      return winPatterns.some(pattern => {
        const [a,b,c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
      });
    }

    function resetGame() {
      initializeBoard();
    }

    // Initialize on load
    initializeBoard();