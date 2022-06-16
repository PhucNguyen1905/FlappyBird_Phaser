import { ScoreText } from "../GameObjects/TextObjects/ScoreText";

export class ScoreController {
    scoreText!: ScoreText;
    bestText!: ScoreText;
    score: number = 0;
    fontStyle: { fontSize: string, color: string } = { fontSize: '30px', color: '#000' };

    constructor(scene: Phaser.Scene) {
        this.initScoreText(scene);
        this.initBestText(scene);
    }
    initScoreText(scene: Phaser.Scene) {
        this.scoreText = new ScoreText({ scene: scene, x: 16, y: 16, content: `Score: ${this.score}`, style: this.fontStyle });
    }
    initBestText(scene: Phaser.Scene) {
        const bestScore = localStorage.getItem('bestScore');
        this.bestText = new ScoreText({ scene: scene, x: 16, y: 50, content: `Best Score: ${bestScore || 0}`, style: this.fontStyle })
    }

    increaseScore() {
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);
        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', String(this.score));
        }
    }


}