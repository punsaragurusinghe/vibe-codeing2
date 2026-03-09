const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const finalScoreDisplay = document.getElementById('final-score');
const highScoreDisplay = document.getElementById('high-score-display');
const totalRunsDisplay = document.getElementById('total-runs-display');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');

// Game constants
const CAR_WIDTH = 40;
const CAR_HEIGHT = 70;

let gameActive = false;
let score = 0;
let highScore = localStorage.getItem('turboDriftHighScore') || 0;
let totalRuns = localStorage.getItem('turboDriftTotalRuns') || 0;
let speed = 5;
let obstacles = [];
let lastTime = 0;
let spawnTimer = 0;
let spawnRate = 1500; // ms

// Initialize Displays
highScoreDisplay.innerText = highScore;
totalRunsDisplay.innerText = totalRuns;

const player = {
    x: 0,
    y: 0,
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    color: '#00f2ff', // Neon Cyan
    targetX: 0
};

function resize() {
    const container = document.getElementById('game-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Center player initially
    player.x = canvas.width / 2 - CAR_WIDTH / 2;
    player.y = canvas.height - CAR_HEIGHT - 60;
    player.targetX = player.x;
}

window.addEventListener('resize', resize);
resize();

// Controls
function handleInput(e) {
    if (!gameActive) return;
    const x = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    const rect = canvas.getBoundingClientRect();
    const relativeX = x - rect.left;
    
    // Calculate movement based on which side of the screen is tapped
    if (relativeX < canvas.width / 2) {
        player.targetX = Math.max(20, player.x - 100);
    } else {
        player.targetX = Math.min(canvas.width - CAR_WIDTH - 20, player.x + 100);
    }
}

canvas.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    handleInput(e); 
}, { passive: false });

canvas.addEventListener('mousedown', handleInput);

function spawnObstacle() {
    const width = CAR_WIDTH;
    const height = CAR_HEIGHT;
    const x = Math.random() * (canvas.width - width - 40) + 20;
    obstacles.push({
        x,
        y: -height,
        width,
        height,
        color: '#ff0055' // Neon Pink/Red
    });
}

function update(deltaTime) {
    if (!gameActive) return;

    // Smooth movement towards target position
    player.x += (player.targetX - player.x) * 0.15;

    // Update score and difficulty
    score += 1;
    scoreDisplay.innerText = Math.floor(score / 10);
    
    speed = 6 + (score / 800);
    spawnRate = Math.max(500, 1200 - (score / 15));

    // Spawn obstacles
    spawnTimer += deltaTime;
    if (spawnTimer > spawnRate) {
        spawnObstacle();
        spawnTimer = 0;
    }

    // Move obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += speed;

        // Collision detection (AABB)
        const margin = 5;
        if (
            player.x + margin < obs.x + obs.width - margin &&
            player.x + player.width - margin > obs.x + margin &&
            player.y + margin < obs.y + obs.height - margin &&
            player.y + player.height - margin > obs.y + margin
        ) {
            gameOver();
        }

        // Remove off-screen obstacles
        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
        }
    }
}

function draw() {
    // Draw Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#0f0f1a');
    grad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Road Lines
    ctx.setLineDash([40, 40]);
    ctx.strokeStyle = 'rgba(112, 0, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.moveTo((canvas.width / 3) * 2, 0);
    ctx.lineTo((canvas.width / 3) * 2, canvas.height);
    ctx.stroke();

    // Draw Obstacles
    obstacles.forEach(obs => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = obs.color;
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(obs.x + 4, obs.y + 10, obs.width - 8, 15);
    });

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(player.x + 4, player.y + 8, player.width - 8, 12);
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 4, player.y + 2, 8, 4);
    ctx.fillRect(player.x + player.width - 12, player.y + 2, 8, 4);
}

function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    draw();

    if (gameActive) {
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    gameActive = true;
    score = 0;
    speed = 5;
    obstacles = [];
    spawnTimer = 0;
    lastTime = 0;
    
    // Increment Runs
    totalRuns++;
    localStorage.setItem('turboDriftTotalRuns', totalRuns);
    totalRunsDisplay.innerText = totalRuns;

    player.x = canvas.width / 2 - CAR_WIDTH / 2;
    player.targetX = player.x;

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameActive = false;
    const finalScore = Math.floor(score / 10);
    finalScoreDisplay.innerText = finalScore;
    
    if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem('turboDriftHighScore', highScore);
        highScoreDisplay.innerText = highScore;
    }
    
    gameOverScreen.classList.remove('hidden');
}

function resetData() {
    if (confirm("Are you sure you want to reset all high scores and run data?")) {
        localStorage.removeItem('turboDriftHighScore');
        localStorage.removeItem('turboDriftTotalRuns');
        location.reload();
    }
}

// Global scope binding
window.startGame = startGame;
window.resetData = resetData;
