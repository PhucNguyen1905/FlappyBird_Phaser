import Phaser from "phaser";
import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { Bird } from '../GameObjects/ImgObjects/Bird';
import { Pipe } from '../GameObjects/ImgObjects/Pipe';

export class PlayScene extends Phaser.Scene {
    bg!: Background;
    bird!: Bird;
    pipes!: Phaser.GameObjects.Group;
    score: number = 0;
    isFalling: boolean = false;
    isOver: boolean = false;

    scoreText!: Phaser.GameObjects.Text;
    constructor() {
        super('PlayScene');
    }
    init() {
        this.initBackground();
        this.initBird();
    }

    preload() {
        this.pipes = this.physics.add.group();
    }
    create() {
        this.createPipes();
        this.createScore();
        this.createPause();
        this.createCollider();
        this.inputHandler();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initBird() {
        this.bird = new Bird({ scene: this, x: Constants.BIRD_START_X, y: Constants.BIRD_START_Y, key: 'bird_sprites' })
    }
    createPipes() {
        this.pipes = this.add.group();
        for (let i = 0; i < 4; i++) {
            const topPipe = new Pipe({ scene: this, x: 0, y: 0, key: 'pipe_down', frame: 1 })
            const botPipe = new Pipe({ scene: this, x: 0, y: 0, key: 'pipe_up', frame: 0 })

            this.genPipePos(topPipe, botPipe)
            this.pipes.add(topPipe);
            this.pipes.add(botPipe);
        }
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
            this.physics.pause();
            this.scene.pause();
        })
    }
    createCollider() {
        this.physics.add.collider(this.bird, this.pipes, this.birdFalling, undefined, this);
    }

    inputHandler() {
        this.input.keyboard.on('keydown-SPACE', this.bird.flyUp, this.bird);
        this.input.on('pointerdown', this.bird.flyUp, this.bird);
    }

    update(time: number, delta: number): void {
        if (!this.isFalling && !this.isOver) {
            this.checkGameStatus();
            this.bird.update(delta);
            this.recylePipes();
            this.bg.update();

        } else if (this.isFalling) {
            this.bird.falling();
            this.bird.update(delta);
            this.checkReachGround();
        } else {
            this.isFalling = false;
            this.isOver = false;
            this.gameOver();
        }
    }

    birdFalling() {
        this.isFalling = true;
        this.bird.setTint(0xD61C4E);
        this.physics.world.disable(this.pipes)
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= Constants.CANVAS_H || this.bird.y <= 0) {
            this.gameOver();
        }
    }
    checkReachGround() {
        if (this.bird.getBounds().bottom >= Constants.CANVAS_H) {
            this.isFalling = false;
            this.isOver = true;
        }
    }

    getMostRightPipeX() {
        let x = 0;
        this.pipes.getChildren().forEach((pipe: any) => {
            x = Math.max(x, pipe.x);
        })
        return x;
    }
    recylePipes() {
        let pair: Pipe[] = [];

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

    genPipePos(topPipe: Pipe, botPipe: Pipe) {
        let spaceBetPipeY = Phaser.Math.Between(160, 200);
        let topPipeYPos = Phaser.Math.Between(20, Constants.CANVAS_H - spaceBetPipeY - 80);
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
        this.bird.reset();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
                this.resetScore();
            },
            loop: false
        })
    }

    incScore() {
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    resetScore() {
        this.score = 0;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}