class QuantumPainter {
    constructor() {
        this.canvas = Array(5).fill().map(() => Array(5).fill(null));
        this.quantumBrush = ['red', 'blue', 'green', 'yellow'];
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.currentColor = null;
        this.powerUpCells = [];
        this.gameOver = false;
        this.levelUp = false;

        this.initGame();
    }

    initGame() {
        this.createCanvas();
        this.addEventListeners();
        this.startGame();
    }

    createCanvas() {
        const canvasElement = document.getElementById('canvas');
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => {
                    if (!this.gameOver) {
                        const color = this.applyBrush(x, y);
                        if (color) {
                            cell.style.backgroundColor = color;
                            if (this.powerUpCells.includes(`${x},${y}`)) {
                                cell.classList.add('power-up');
                                setTimeout(() => {
                                    cell.classList.remove('power-up');
                                }, 1000);
                            }
                        }
                    }
                });
                canvasElement.appendChild(cell);
            }
        }
    }

    addEventListeners() {
        document.getElementById('restart-button').addEventListener('click', () => {
            this.restartGame();
        });
    }

    startGame() {
        this.observeQuantumBrush();
        this.updateScoreDisplay();
        this.updateLevelDisplay();
        this.updateLivesDisplay();
    }

    observeQuantumBrush() {
        this.currentColor = this.quantumBrush[Math.floor(Math.random() * this.quantumBrush.length)];
        document.getElementById('current-color').textContent = `Current Color: ${this.currentColor}`;
        return this.currentColor;
    }

    applyBrush(x, y) {
        if (this.canvas[y][x] === null) {
            const color = this.observeQuantumBrush();
            this.canvas[y][x] = color;
            this.updateScore(x, y, color);
            this.checkForPowerUps(x, y);
            return color;
        }
        return null;
    }

    updateScore(x, y, color) {
        const adjacentColors = this.getAdjacentColors(x, y);
        if (adjacentColors.includes(color)) {
            this.score += 1;
        }
        if (new Set(adjacentColors).size === 4) {
            this.score += 5;
        }
        this.updateScoreDisplay();
        this.checkForLevelUp();
    }

    getAdjacentColors(x, y) {
        const adjacent = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && this.canvas[ny][nx] !== null) {
                adjacent.push(this.canvas[ny][nx]);
            }
        }
        return adjacent;
    }

    checkForPowerUps(x, y) {
        if (Math.random() < 0.1) {
            this.powerUpCells.push(`${x},${y}`);
        }
    }

    updateScoreDisplay() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
    }

    updateLevelDisplay() {
        document.getElementById('level').textContent = `Level: ${this.level}`;
    }

    updateLivesDisplay() {
        document.getElementById('lives').textContent = `Lives: ${this.lives}`;
    }

    checkForLevelUp() {
        if (this.score >= this.level * 10) {
            this.level++;
            this.updateLevelDisplay();
            this.observeQuantumBrush(); // Change color when leveling up
        }
    }

    restartGame() {
        this.canvas = Array(5).fill().map(() => Array(5).fill(null));
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.powerUpCells = [];
        this.gameOver = false;
        this.initGame();
    }
}

// Create a new instance of the game
window.onload = () => {
    new QuantumPainter();
};
