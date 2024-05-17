function getComputerChoice(userChoice) {
    const winningMoves = {
        'rock': 'paper',     // Paper beats Rock
        'paper': 'scissors', // Scissors beats Paper
        'scissors': 'rock'   // Rock beats Scissors
    };
    return winningMoves[userChoice];
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice(userChoice);

    document.getElementById('result').innerHTML = `
        You chose: <i class="fas fa-hand-${userChoice}"></i> <br>
        Computer chose: <i class="fas fa-hand-${computerChoice}"></i> <br>
        <br>
        Computer wins! Better luck next time!
    `;
}
