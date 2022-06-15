import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { Bird } from '../GameObjects/ImgObjects/Bird';
import { Coin } from '../GameObjects/ImgObjects/Coin';
import { Enemy } from '../GameObjects/ImgObjects/Enemy';
import { Exposion } from '../GameObjects/ImgObjects/Explosion';
import { Pipe } from '../GameObjects/ImgObjects/Pipe';
import { Rocket } from '../GameObjects/ImgObjects/Rocket';
import { ClickSound } from "../GameObjects/Sounds/ClickSound";
import { FallSound } from "../GameObjects/Sounds/FallSound";
import { FlapSound } from "../GameObjects/Sounds/FlapSound";
import { PointSound } from "../GameObjects/Sounds/PointSound";
import { StrongHitSound } from '../GameObjects/Sounds/StrongHitSound';

export class PlayScene extends Phaser.Scene {
    bg!: Background;
    bird!: Bird;
    enemy!: Enemy;
    coin!: Coin;
    pipes!: Phaser.GameObjects.Group;
    rockets: Rocket[] = [];
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
    strongHitSound!: StrongHitSound;
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
        this.initEnemy();
        this.initCoin();
        this.initSounds();
        this.score = 0;
        this.countDown = 3;
        this.isFalling = false;
        this.isOver = false;
        this.isPaused = false;
    }

    preload() {
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
    initEnemy() {
        this.enemy = new Enemy({ scene: this, x: 2000, y: Constants.CANVAS_H / 2, key: 'enemy_sprites' })
    }
    initSounds() {
        this.pointSound = new PointSound(this.sound);
        this.fallSound = new FallSound(this.sound);
        this.flapSound = new FlapSound(this.sound)
        this.clickSound = new ClickSound(this.sound)
        this.strongHitSound = new StrongHitSound(this.sound)
    }
    initCoin() {
        this.coin = new Coin({ scene: this, x: 2000, y: Constants.CANVAS_H / 2, key: 'coin_sprites' })
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
        this.physics.add.collider(this.bird, this.enemy, this.birdFalling, undefined, this);
        this.physics.add.overlap(this.bird, this.coin, () => {
            this.incScore();
            this.coin.hide();
        });
        this.physics.add.collider(this.rockets, this.pipes, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            rocket.destroy();
        });
        this.physics.add.collider(this.rockets, this.enemy, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            rocket.destroy();
            this.enemy.hide();
            this.incScore();
        });
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
            this.updateRockets();
            this.coin.update();

        } else if (this.isFalling) {
            this.bird.falling();
            this.bird.update(delta, this.isPaused);
            this.checkReachGround();
        } else {
            this.gameOver();
        }
    }
    updateRockets() {
        for (const rocket of this.rockets) {
            rocket.update();
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
        this.rockets.push(rocket)
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
        let spaceBetPipeY = Phaser.Math.Between(160, 220);

        let topPipeYPos = Phaser.Math.Between(20, Constants.CANVAS_H - spaceBetPipeY - 80);
        let spaceBetPipeX = Phaser.Math.Between(400, 500);
        let mostRightPipeX = this.getMostRightPipeX();

        // Generate enemy
        if (Math.random() > 0.3) {
            this.genEnemy(mostRightPipeX + spaceBetPipeX, topPipeYPos + spaceBetPipeY / 2);
        }

        // Generate coin
        if (this.score % 3 == 0 && this.score > 1) {
            this.genCoin(mostRightPipeX + spaceBetPipeX / 2, Phaser.Math.Between(200, Constants.CANVAS_H - 200));
        }
        topPipe.x = mostRightPipeX + spaceBetPipeX;
        topPipe.y = topPipeYPos;
        botPipe.x = mostRightPipeX + spaceBetPipeX;
        botPipe.y = topPipeYPos + spaceBetPipeY;
    }
    genEnemy(x: number, y: number) {
        if (this.enemy.isAppeared) {
            return;
        }
        this.enemy.setNewPos(x + 40, y);
    }
    genCoin(x: number, y: number) {
        if (this.coin.isAppeared) {
            return;
        }
        this.coin.setNewPos(x, y);
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