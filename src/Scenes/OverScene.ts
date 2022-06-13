import Phaser from "phaser";
import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { OverImg } from "../GameObjects/ImgObjects/OverImg";

export class OverScene extends Phaser.Scene {
    bg!: Background;
    overImg!: OverImg;
    fontStyle: {} = { fontSize: '30px', color: '#fff' };
    constructor() {
        super('OverScene');
    }

    init() {
        this.initBackground();
    }
    create() {

    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

}