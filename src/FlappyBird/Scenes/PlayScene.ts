import 'phaser';
import { Constants } from '../Contants';

export class PlayScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.Image;
    bird!: Phaser.Physics.Arcade.Sprite;
    pipes!: Phaser.Physics.Arcade.Group;
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.pipes = this.physics.add.group();

    }
    create() {
        this.createBackground();
        this.createBird();
        this.createPipes();
        this.createCollider();
        this.inputHandler();
    }

    createBackground() {
        // Background
        this.bg = this.add.image(0, 0, 'sky');
        this.bg.setOrigin(0, 0)
    }
    createBird() {

        // Bird
        this.bird = this.physics.add.sprite(Constants.BIRD_START_X, Constants.BIRD_START_Y, 'bird');
        this.bird.setOrigin(0);
        this.bird.body.gravity.y = 200;

    }
    createPipes() {
        // Pipe
        for (let i = 0; i < 4; i++) {
            const topPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
            const botPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0);
            this.genPipePos(topPipe, botPipe)
        }
        this.pipes.setVelocityX(-200);
    }
    createCollider() {
        this.physics.add.collider(this.bird, this.pipes);
    }

    inputHandler() {
        this.input.keyboard.on('keydown-SPACE', this.flap, this)
        this.input.on('pointerdown', this.flap, this)
    }

    flap() {
        this.bird.body.velocity.y = -200;
    }

    resetBird() {
        this.bird.x = Constants.BIRD_START_X;
        this.bird.y = Constants.BIRD_START_Y;
        this.bird.body.velocity.y = 0;
    }
    update(time: number, delta: number): void {
        if (this.bird.y >= Constants.CANVAS_H || this.bird.y <= 0) {
            this.resetBird();
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
                }
            }

        })
    }

    genPipePos(topPipe: any, botPipe: any) {
        let spaceBetPipeY = Phaser.Math.Between(150, 250);
        let topPipeYPos = Phaser.Math.Between(0 + 30, Constants.CANVAS_H - 30 - spaceBetPipeY);
        let spaceBetPipeX = Phaser.Math.Between(400, 500);
        let mostRightPipeX = this.getMostRightPipeX();

        topPipe.x = mostRightPipeX + spaceBetPipeX;
        topPipe.y = topPipeYPos;
        botPipe.x = mostRightPipeX + spaceBetPipeX;
        botPipe.y = topPipeYPos + spaceBetPipeY;
    }
}