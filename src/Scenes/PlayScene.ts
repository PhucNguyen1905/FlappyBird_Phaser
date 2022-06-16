import { Constants } from '../Contants';
import { RocketController } from '../Controller/RocketController';
import { ScoreController } from '../Controller/ScoreController';
import { Background } from '../GameObjects/ImgObjects/Sprites/Background';
import { Bee } from '../GameObjects/ImgObjects/Sprites/Bee';
import { Bird } from '../GameObjects/ImgObjects/Sprites/Bird';
import { Coin } from '../GameObjects/ImgObjects/Sprites/Coin';
import { Enemy } from '../GameObjects/ImgObjects/Sprites/Enemy';
import { Exposion } from '../GameObjects/ImgObjects/Sprites/Explosion';
import { Pipe } from '../GameObjects/ImgObjects/Images/Pipe';
import { BgMusic } from '../GameObjects/Sounds/BgMusic';
import { ClickSound } from "../GameObjects/Sounds/ClickSound";
import { FallSound } from "../GameObjects/Sounds/FallSound";
import { FlapSound } from "../GameObjects/Sounds/FlapSound";
import { PointSound } from "../GameObjects/Sounds/PointSound";
import { StrongHitSound } from '../GameObjects/Sounds/StrongHitSound';

export class PlayScene extends Phaser.Scene {
    bg!: Background;
    bird!: Bird;
    dragon!: Enemy;
    bee!: Bee;
    coin!: Coin;
    pipes!: Phaser.GameObjects.Group;

    rocControl!: RocketController;
    scoreControl!: ScoreController;

    isFalling: boolean = false;
    isOver: boolean = false;
    isPaused: boolean = false;
    countDown: number = 3;

    pointSound!: PointSound;
    fallSound!: FallSound;
    flapSound!: FlapSound;
    clickSound!: ClickSound;
    strongHitSound!: StrongHitSound;
    bgMusic!: BgMusic;

    countDownText!: Phaser.GameObjects.Text;
    countTimeEvent!: Phaser.Time.TimerEvent;
    eventPause!: Phaser.Events.EventEmitter;

    constructor() {
        super('PlayScene');
    }
    init() {
        this.initBackground();
        this.initBird();
        this.initEnemy();
        this.initRocControl();
        this.initScoreControl();
        this.initCoin();
        this.initSounds();
        this.initGameConfig();
    }

    preload() {
    }
    create() {
        this.createPipes();
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
        this.dragon = new Enemy({ scene: this, x: 2000, y: Constants.CANVAS_H / 2, key: 'enemy_sprites' })
        this.bee = new Bee({ scene: this, x: 2000, y: Constants.CANVAS_H / 2, key: 'bee_sprites' })
    }
    initRocControl() {
        this.rocControl = new RocketController(this);
    }
    initScoreControl() {
        this.scoreControl = new ScoreController(this);
    }
    initSounds() {
        this.pointSound = new PointSound(this.sound);
        this.fallSound = new FallSound(this.sound);
        this.flapSound = new FlapSound(this.sound)
        this.clickSound = new ClickSound(this.sound)
        this.strongHitSound = new StrongHitSound(this.sound)
        this.bgMusic = new BgMusic(this.sound);
        this.bgMusic.loop = true;
        this.bgMusic.play();
    }
    initCoin() {
        this.coin = new Coin({ scene: this, x: 2000, y: Constants.CANVAS_H / 2, key: 'coin_sprites' })
    }
    initGameConfig() {
        this.countDown = 3;
        this.isFalling = false;
        this.isOver = false;
        this.isPaused = false;
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
    createPause() {
        const pauseBtn = this.add.image(Constants.CANVAS_W - 10, Constants.CANVAS_H - 10, 'pause')
            .setScale(3)
            .setOrigin(1);
        pauseBtn.setInteractive();
        pauseBtn.on('pointerdown', () => {
            this.isPaused = true;
            this.clickSound.play();
            this.bgMusic.stop();
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene')
        })
    }
    createCollider() {
        this.physics.add.collider(this.bird, this.pipes, this.birdFalling, undefined, this);
        this.physics.add.collider(this.bird, this.dragon, this.birdFalling, undefined, this);
        this.physics.add.collider(this.bird, this.bee, this.birdFalling, undefined, this);
        this.physics.add.overlap(this.bird, this.coin, () => {
            this.incScore();
            this.coin.hide();
        });
        this.physics.add.collider(this.rocControl.getRockets(), this.pipes, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            this.rocControl.rocketBoom(rocket);
        });
        this.physics.add.collider(this.rocControl.getRockets(), this.dragon, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            this.rocControl.rocketBoom(rocket);
            this.dragon.hide();
            this.incScore();
        });
        this.physics.add.collider(this.rocControl.getRockets(), this.bee, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            this.rocControl.rocketBoom(rocket);
            this.bee.hide();
            this.incScore();
        });
        this.physics.add.collider(this.rocControl.getRockets(), this.coin, (rocket: any) => {
            let expl = new Exposion({ scene: this, x: rocket.x, y: rocket.y, key: 'explosion' })
            this.strongHitSound.play();
            this.rocControl.rocketBoom(rocket);
            this.coin.hide();
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
            this.bgMusic.play();
            this.isPaused = false;
            this.countTimeEvent.remove();
        }
    }


    inputHandler() {
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
        this.input.keyboard.on('keydown-X', this.shootRocket, this);
        this.input.on('pointerdown', this.flap, this);

        this.input.keyboard.on('keyup-P', () => {
            this.isPaused = true;
            this.clickSound.play();
            this.bgMusic.stop();
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
            this.rocControl.update();
            this.coin.update();
            this.bee.update()

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
        this.dragon.setDontMove();
        this.bee.setDontMove();
        this.coin.setDontMove();
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
        if (!(this.isFalling || this.isOver)) {
            this.rocControl.shootRocket(Constants.BIRD_START_X, this.bird.y);
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
                    this.scoreControl.saveBestScore();
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
            this.dragon.genEnemy(mostRightPipeX + spaceBetPipeX, topPipeYPos + spaceBetPipeY / 2);
        }
        if (Math.random() > 0.3 && this.scoreControl.score > 1) {
            this.bee.genEnemy(mostRightPipeX + spaceBetPipeX / 2 + 10, Phaser.Math.Between(300, Constants.CANVAS_H - 300));
        }


        // Generate coin
        if (this.scoreControl.score > 1 && Math.random() > 0.1) {
            this.coin.genCoin(mostRightPipeX + spaceBetPipeX / 2 + 10, Phaser.Math.Between(200, Constants.CANVAS_H - 200));
        }


        topPipe.x = mostRightPipeX + spaceBetPipeX;
        topPipe.y = topPipeYPos;
        botPipe.x = mostRightPipeX + spaceBetPipeX;
        botPipe.y = topPipeYPos + spaceBetPipeY;
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
    gameOver() {
        this.bgMusic.stop();
        this.physics.pause();
        this.bird.setTint(0xD61C4E);
        this.scoreControl.saveBestScore();
        this.scoreControl.saveCurScore();
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
        this.scoreControl.increaseScore();
    }
}