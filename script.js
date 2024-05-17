function getComputerChoice(userChoice) {
    const winningMoves = {
        'rock': 'paper',     // Paper beats Rock
        'paper': 'scissors', // Scissors beats Paper
        'scissors': 'rock'   // Rock beats Scissors
    };
    return winningMoves[userChoice];
}

function playGame(userChoice) {
    const bufferingElement = document.getElementById('buffering');
    const resultElement = document.getElementById('result');

    // Show buffering message
    bufferingElement.classList.remove('hidden');
    resultElement.innerHTML = '';

    // Randomize buffering time between 0.5 seconds to 2 seconds
    const bufferingTime = Math.random() * (2000 - 500) + 500;

    setTimeout(() => {
        const computerChoice = getComputerChoice(userChoice);

        // Hide buffering message and show result
        bufferingElement.classList.add('hidden');
        resultElement.innerHTML = `
            You chose: <i class="fas fa-hand-${userChoice}"></i> <br>
            Computer chose: <i class="fas fa-hand-${computerChoice}"></i> <br>
            <br>
            Computer wins! Better luck next time!
        `;
    }, bufferingTime);
}

// Function to change the heading with fade-in effect
function changeHeading() {
    const heading = document.getElementById('game-heading');
    heading.classList.add('fade-in');
    setTimeout(() => {
        heading.textContent = 'Rigged Rock-Paper-Scissors';
        heading.classList.remove('fade-in');
    }, 1000); // 1 second for the fade-in effect
}

// Change the heading after 10 seconds
setTimeout(changeHeading, 10000);