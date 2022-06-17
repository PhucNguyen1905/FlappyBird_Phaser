import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Sprites/Background';
import { FlappyImg } from '../GameObjects/ImgObjects/Images/FlappyImg';
import { PlayBtn } from '../GameObjects/ImgObjects/Buttons/PlayBtn';
import { ClickSound } from "../GameObjects/Sounds/ClickSound";
import { MouseOverSound } from '../GameObjects/Sounds/MouseOverSound';
import { StartMusic } from '../GameObjects/Sounds/StartMusic';

export class StartScene extends Phaser.Scene {
    bg!: Background;
    flappyImg!: FlappyImg;
    playBtn!: PlayBtn;
    clickSound!: ClickSound;
    mouseOverSound!: MouseOverSound;
    startMusic!: StartMusic;

    constructor() {
        super('StartScene');
    }

    init() {
        this.initBackground();
        this.initSounds();
        this.flappyImg = new FlappyImg({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 100, key: 'flappy' })
        this.playBtn = new PlayBtn({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 + 100, key: 'playbtn' })

        this.inputHandler();
    }
    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initSounds() {
        this.clickSound = new ClickSound(this.sound);
        this.mouseOverSound = new MouseOverSound(this.sound);
        this.startMusic = new StartMusic(this.sound);
        this.startMusic.loop = true;
        this.startMusic.play();
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

    inputHandler() {
        this.playBtn.on('pointerdown', () => {
            this.clickSound.play();
            this.startMusic.stop();
            this.scene.start('PlayScene')
        })
        this.input.keyboard.on('keydown-SPACE', () => {
            this.clickSound.play();
            this.startMusic.stop();
            this.scene.start('PlayScene')
        })
        this.playBtn.on('pointerover', () => {
            this.mouseOverSound.play();
        })
    }
}