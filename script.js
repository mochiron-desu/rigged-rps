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

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Function to cache app assets
const cacheAssets = async () => {
    const cache = await caches.open('rps-assets');
    return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/icons/apple-touch-icon.png',
        '/icons/favicon-16x16.png',
        '/icons/favicon-32x32.png',
        '/icons/android-chrome-192x192.png',
        '/icons/android-chrome-512x512.png',
    ]);
};

// Cache app assets on install
self.addEventListener('install', event => {
    event.waitUntil(cacheAssets());
});

// Fetch cached assets
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
