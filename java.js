const recuadros = document.querySelectorAll('.recuadro');
let currentPlayer = 'X';

recuadros.forEach(recuadro => {
    recuadro.addEventListener('click', () => {
        if (!recuadro.dataset.played) {
            const imageToShow = recuadro.querySelector(`.${currentPlayer.toLowerCase()}`);
            if (imageToShow) imageToShow.style.display = 'block';

            recuadro.dataset.played = true;

            if (checkWinner()) {
                alert(`¡${currentPlayer} gana!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("¡Es un empate!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWinner() {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    const isWinner = wins.some(pattern =>
        pattern.every(index => {
            const recuadro = recuadros[index];
            const imageToCheck = recuadro.querySelector(`.${currentPlayer.toLowerCase()}`);
            return imageToCheck && imageToCheck.style.display === 'block';
        })
    );

    if (isWinner) {
        let score1 = document.getElementById('score1');
        let score2 = document.getElementById('score2');

        if (currentPlayer === 'X') {
            score1.textContent = parseInt(score1.textContent) + 1;
        } else {
            score2.textContent = parseInt(score2.textContent) + 1;
        }
    }

    return isWinner;
}

function isBoardFull() {
    return Array.from(recuadros).every(recuadro => recuadro.dataset.played);
}

function resetGame() {
    recuadros.forEach(recuadro => {
        const images = recuadro.querySelectorAll('img');
        images.forEach(img => img.style.display = 'none');
        delete recuadro.dataset.played;
    });
    currentPlayer = 'X';

    const tier = document.getElementById('tier');
    tier.textContent = parseInt(tier.textContent) + 1;
}

// Nueva función para reiniciar todo
function reloadGame() {
    // Reiniciar los contadores
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';
    document.getElementById('tier').textContent = '0';

    // Reiniciar el tablero
    recuadros.forEach(recuadro => {
        const images = recuadro.querySelectorAll('img');
        images.forEach(img => img.style.display = 'none');
        delete recuadro.dataset.played;
    });

    // Reiniciar el turno
    currentPlayer = 'X';
}

// Asignar evento al botón reload
document.getElementById('reload').addEventListener('click', reloadGame);
