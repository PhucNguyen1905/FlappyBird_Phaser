import Phaser from "phaser";
import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { FlappyImg } from '../GameObjects/ImgObjects/FlappyImg';
import { PlayBtn } from '../GameObjects/ImgObjects/PlayBtn';

export class StartScene extends Phaser.Scene {
    bg!: Background;
    flappyImg!: FlappyImg;
    playBtn!: PlayBtn;

    constructor() {
        super('StartScene');
    }

    init() {
        this.initBackground();
        this.flappyImg = new FlappyImg({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 100, key: 'flappy' })
        this.playBtn = new PlayBtn({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 + 100, key: 'playbtn' })

        this.inputHandler();
    }
    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

    inputHandler() {
        this.playBtn.on('pointerdown', () => {
            this.scene.start('MenuScene')
        })
    }
}