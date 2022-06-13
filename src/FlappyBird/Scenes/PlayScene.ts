import 'phaser';
import { Constants } from '../Contants';

export class PlayScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.Image;
    bird!: Phaser.Physics.Arcade.Sprite;
    pipes!: Phaser.Physics.Arcade.Group;
    score: number = 0;
    scoreText!: Phaser.GameObjects.Text;
    constructor() {
        super('PlayScene');
    }

    preload() {
        this.pipes = this.physics.add.group();
    }
    create() {
        this.createBackground();
        this.createBird();
        this.createPipes();
        this.createScore();
        this.createPause();
        this.createCollider();
        this.inputHandler();
    }

    createBackground() {
        // Background
        this.bg = this.add.image(0, 0, 'background');
        this.bg.setOrigin(0, 0)
        this.bg.setSize(1000, 500);
    }
    createBird() {
        this.bird = this.physics.add.sprite(Constants.BIRD_START_X, Constants.BIRD_START_Y, 'bird');
        this.bird.setOrigin(0);
        this.bird.setDisplaySize(80, 70);
        this.bird.body.gravity.y = 600;
        this.bird.setCollideWorldBounds(true);

    }
    createPipes() {
        for (let i = 0; i < 4; i++) {
            const topPipe = this.pipes.create(0, 0, 'pipe_down').setOrigin(0, 1).setImmovable(true);
            const botPipe = this.pipes.create(0, 0, 'pipe_up').setOrigin(0).setImmovable(true);
            this.genPipePos(topPipe, botPipe)
        }
        this.pipes.setVelocityX(-200);
    }
    createScore() {
        const bestScore = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '30px', color: '#000' })
        this.add.text(16, 50, `Best Score: ${bestScore || 0}`, { fontSize: '20px', color: '#000' })
    }
    createPause() {
        const pauseBtn = this.add.image(Constants.CANVAS_W - 10, Constants.CANVAS_H - 10, 'pause')
            .setScale(3)
            .setOrigin(1);
        pauseBtn.setInteractive();
        pauseBtn.on('pointerdown', () => {
            console.log(123)
            this.physics.pause();
            this.scene.pause();
        })
    }
    createCollider() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, undefined, this);
    }

    inputHandler() {
        this.input.keyboard.on('keydown-SPACE', this.flap, this)
        this.input.on('pointerdown', this.flap, this)
    }

    flap() {
        this.bird.body.velocity.y = -200;
    }

    resetBird() {
        // this.bird.x = Constants.BIRD_START_X;
        // this.bird.y = Constants.BIRD_START_Y;
        // this.bird.body.velocity.y = 0;
    }
    update(time: number, delta: number): void {
        if (this.bird.getBounds().bottom >= Constants.CANVAS_H || this.bird.y <= 0) {
            this.gameOver();
        }
        this.recylePipes();
    }

    getMostRightPipeX() {
        let x = 0;
        this.pipes.getChildren().forEach((pipe: any) => {
            x = Math.max(x, pipe.x);
        })
        return x;
    }
    recylePipes() {
        let pair: any[] = [];
        this.pipes.getChildren().forEach((pipe: any) => {
            if (pipe.getBounds().right <= 0) {
                pair.push(pipe);
                if (pair.length == 2) {
                    this.genPipePos(pair[0], pair[1]);
                    pair = [];
                    this.incScore();
                    this.saveBestScore();
                }
            }

        })
    }

    genPipePos(topPipe: any, botPipe: any) {
        let spaceBetPipeY = Phaser.Math.Between(160, 200);
        let topPipeYPos = Phaser.Math.Between(50, Constants.CANVAS_H - spaceBetPipeY - 120);
        let spaceBetPipeX = Phaser.Math.Between(400, 500);
        let mostRightPipeX = this.getMostRightPipeX();

        topPipe.x = mostRightPipeX + spaceBetPipeX;
        topPipe.y = topPipeYPos;
        botPipe.x = mostRightPipeX + spaceBetPipeX;
        botPipe.y = topPipeYPos + spaceBetPipeY;
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);
        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', String(this.score));
        }
    }

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xD61C4E);
        this.saveBestScore();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        })
    }

    incScore() {
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}