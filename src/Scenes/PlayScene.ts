import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { Bird } from '../GameObjects/ImgObjects/Bird';
import { Exposion } from '../GameObjects/ImgObjects/Explosion';
import { Pipe } from '../GameObjects/ImgObjects/Pipe';
import { Rocket } from '../GameObjects/ImgObjects/Rocket';
import { ClickSound } from "../GameObjects/Sounds/ClickSound";
import { FallSound } from "../GameObjects/Sounds/FallSound";
import { FlapSound } from "../GameObjects/Sounds/FlapSound";
import { PointSound } from "../GameObjects/Sounds/PointSound";

export class PlayScene extends Phaser.Scene {
    bg!: Background;
    bird!: Bird;
    pipes!: Phaser.GameObjects.Group;
    // rockets!: Phaser.GameObjects.Group;
    score: number = 0;
    isFalling: boolean = false;
    isOver: boolean = false;
    isPaused: boolean = false;
    countDown: number = 3;
    countDownText!: Phaser.GameObjects.Text;
    pointSound!: PointSound;
    fallSound!: FallSound;
    flapSound!: FlapSound;
    clickSound!: ClickSound;
    countTimeEvent!: Phaser.Time.TimerEvent;
    eventPause!: Phaser.Events.EventEmitter;
    fontStyle: { fontSize: string, color: string } = { fontSize: '30px', color: '#000' };

    scoreText!: Phaser.GameObjects.Text;
    constructor() {
        super('PlayScene');
    }
    init() {
        this.initBackground();
        this.initBird();
        this.initSounds();
        this.score = 0;
        this.countDown = 3;
        this.isFalling = false;
        this.isOver = false;
        this.isPaused = false;
    }

    preload() {
        this.pipes = this.physics.add.group();
        // this.rockets = this.physics.add.group();
    }
    create() {
        this.createPipes();
        this.createScore();
        this.createPause();
        this.createCollider();
        this.inputHandler();
        this.listenOnEvents();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initBird() {
        this.bird = new Bird({ scene: this, x: Constants.BIRD_START_X, y: Constants.BIRD_START_Y, key: 'bird_sprites' })
    }
    initSounds() {
        this.pointSound = new PointSound(this.sound);
        this.fallSound = new FallSound(this.sound);
        this.flapSound = new FlapSound(this.sound)
        this.clickSound = new ClickSound(this.sound)
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
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, this.fontStyle)
        this.add.text(16, 50, `Best Score: ${bestScore || 0}`, this.fontStyle)
    }
    createPause() {
        const pauseBtn = this.add.image(Constants.CANVAS_W - 10, Constants.CANVAS_H - 10, 'pause')
            .setScale(3)
            .setOrigin(1);
        pauseBtn.setInteractive();
        pauseBtn.on('pointerdown', () => {
            this.isPaused = true;
            this.clickSound.play();
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene')
        })
    }
    createCollider() {
        this.physics.add.collider(this.bird, this.pipes, this.birdFalling, undefined, this);
        // this.physics.add.collider(this.rockets, this.pipes, this.colideRocket, undefined, this);
    }
    listenOnEvents() {
        if (this.eventPause) return;
        this.eventPause = this.events.on('resume', () => {
            this.countDown = 3;
            this.countDownText = this.add.text(Constants.CANVAS_W / 2 - 100, Constants.CANVAS_H / 2, 'Continue in ' + this.countDown, { fontSize: '30px', color: '#1363DF' })
            this.countTimeEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDownTime,
                callbackScope: this,
                loop: true
            })

        })
    }
    countDownTime() {
        this.countDown -= 1;
        this.countDownText.setText('Continue in ' + this.countDown);
        if (this.countDown <= 0) {
            this.countDownText.setText('');
            this.physics.resume();
            this.isPaused = false;
            this.countTimeEvent.remove();
        }
    }

    inputHandler() {
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
        this.input.keyboard.on('keydown-X', this.shootRocket, this);
        this.input.on('pointerdown', this.flap, this);

        this.input.keyboard.on('keyup-P', () => {
            this.clickSound.play();
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene')
        })
    }

    update(time: number, delta: number): void {
        if (!this.isFalling && !this.isOver) {
            this.checkGameStatus();
            this.bird.update(delta, this.isPaused);
            this.recylePipes();
            this.bg.update();

        } else if (this.isFalling) {
            this.bird.falling();
            this.bird.update(delta, this.isPaused);
            this.checkReachGround();
        } else {
            this.gameOver();
        }
    }

    birdFalling() {
        this.fallSound.play();
        this.isFalling = true;
        this.bird.setTint(0xD61C4E);
        this.bird.anims.stop();
        this.physics.world.disable(this.pipes)
    }
    flap() {
        if (!this.isPaused) {
            !this.isFalling && this.flapSound.play();
            this.bird.flyUp();
        }
    }

    shootRocket() {
        let rocket = new Rocket({ scene: this, x: Constants.BIRD_START_X, y: this.bird.y, key: 'rocket_sprites' })
        this.physics.add.collider(rocket, this.pipes, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            rocket.destroy();
            // expl.destroy()
        })
        // this.rockets.add(rocket)
    }
    colideRocketPipes() {
        console.log('Boommm')
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= Constants.CANVAS_H) {
            this.isOver = true;
            this.bird.anims.stop();
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
        if (x != 0) return x;
        return 800;
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
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('OverScene')
            },
            loop: false
        })
    }

    incScore() {
        this.pointSound.play()
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}