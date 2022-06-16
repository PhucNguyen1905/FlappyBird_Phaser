import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { ExitBtn } from '../GameObjects/ImgObjects/ExitBtn';
import { OverImg } from "../GameObjects/ImgObjects/OverImg";
import { RestartBtn } from "../GameObjects/ImgObjects/RestartBtn";
import { ClickSound } from '../GameObjects/Sounds/ClickSound';
import { MouseOverSound } from '../GameObjects/Sounds/MouseOverSound';
import { OverMusic } from '../GameObjects/Sounds/OverMusic';
import { HighestText } from "../GameObjects/TextObjects/HighestText";
import { ScoreText } from '../GameObjects/TextObjects/ScoreText';

export class OverScene extends Phaser.Scene {
    bg!: Background;
    overImg!: OverImg;
    restartBtn!: RestartBtn;
    exitBtn!: ExitBtn;
    clickSound!: ClickSound;
    mouseOverSound!: MouseOverSound;
    overMusic!: OverMusic;
    scoreText!: ScoreText;
    highestText!: HighestText;
    fontStyle = { fontSize: '40px', color: '#F15412' };
    constructor() {
        super('OverScene');
    }

    init() {
        this.initBackground();
        this.initButtons();
        this.initSounds();
        this.initHighestText();
        this.initScoreText();

    }
    create() {
        this.getScore();
        this.getBestScore()
        this.inputHandler();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initButtons() {
        this.overImg = new OverImg({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 100, key: 'over' })
        this.restartBtn = new RestartBtn({ scene: this, x: Constants.CANVAS_W / 2 - 80, y: Constants.CANVAS_H / 2 + 80, key: 'restart' })
        this.exitBtn = new RestartBtn({ scene: this, x: Constants.CANVAS_W / 2 + 80, y: Constants.CANVAS_H / 2 + 80, key: 'exit' })

    }
    initSounds() {
        this.clickSound = new ClickSound(this.sound);
        this.mouseOverSound = new MouseOverSound(this.sound);
        this.overMusic = new OverMusic(this.sound);
        this.overMusic.loop = true;
        this.overMusic.play();
    }
    initScoreText() {
        this.scoreText = new ScoreText({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 30, content: '', style: this.fontStyle })
    }
    initHighestText() {
        this.highestText = new HighestText({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 + 10, content: '', style: this.fontStyle })
    }
    getScore() {
        const score = this.registry.get('score');
        this.scoreText.setText(`Your Score: ${score || 0}`);
        this.scoreText.setOrigin(0.5);
        this.scoreText.setColor('#3AB0FF')
    }
    getBestScore() {
        const bestScore = localStorage.getItem('bestScore');
        this.highestText.setText(`Highest Score: ${bestScore || 0}`)
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

    inputHandler() {
        this.restartBtn.on('pointerdown', () => {
            this.clickSound.play()
            this.overMusic.stop();
            this.scene.start('PlayScene')
        })
        this.input.keyboard.on('keydown-SPACE', () => {
            this.clickSound.play()
            this.overMusic.stop();
            this.scene.start('PlayScene')
        })
        this.restartBtn.on('pointerover', () => {
            this.mouseOverSound.play();
        })
        this.exitBtn.on('pointerdown', () => {
            this.clickSound.play()
            this.overMusic.stop();
            this.scene.start('StartScene')
        })
        this.exitBtn.on('pointerover', () => {
            this.mouseOverSound.play();
        })
    }

}