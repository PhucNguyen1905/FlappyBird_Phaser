import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { ExitBtn } from '../GameObjects/ImgObjects/ExitBtn';
import { OverImg } from "../GameObjects/ImgObjects/OverImg";
import { RestartBtn } from "../GameObjects/ImgObjects/RestartBtn";
import { ClickSound } from '../GameObjects/Sounds/ClickSound';
import { HighestText } from "../GameObjects/TextObjects/HighestText";

export class OverScene extends Phaser.Scene {
    bg!: Background;
    overImg!: OverImg;
    restartBtn!: RestartBtn;
    exitBtn!: ExitBtn;
    clickSound!: ClickSound;
    highestText!: HighestText;
    fontStyle = { fontSize: '40px', color: '#F15412' };
    constructor() {
        super('OverScene');
    }

    init() {
        this.initBackground();
        this.overImg = new OverImg({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 100, key: 'over' })
        this.restartBtn = new RestartBtn({ scene: this, x: Constants.CANVAS_W / 2 - 80, y: Constants.CANVAS_H / 2 + 80, key: 'restart' })
        this.exitBtn = new RestartBtn({ scene: this, x: Constants.CANVAS_W / 2 + 80, y: Constants.CANVAS_H / 2 + 80, key: 'exit' })

        this.initSounds();
        this.initHighestText();

    }
    create() {
        this.getBestScore()
        this.inputHandler();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initSounds() {
        this.clickSound = new ClickSound(this.sound);
    }
    initHighestText() {
        this.highestText = new HighestText({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2, content: '', style: this.fontStyle })

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
            this.scene.start('PlayScene')
        })
        this.exitBtn.on('pointerdown', () => {
            this.clickSound.play()
            this.scene.start('StartScene')
        })
    }

}