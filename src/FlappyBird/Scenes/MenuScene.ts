import 'phaser';

export class MenuScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.Image;
    constructor() {
        super('MenuScene');
    }
    // preload() {
    //     this.load.image('sky', 'assets/sky.png');
    // }
    create() {
        this.createBackground();
    }
    createBackground() {
        // Background
        this.bg = this.add.image(0, 0, 'sky');
        this.bg.setOrigin(0, 0)
    }
}