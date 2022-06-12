import 'phaser';

export class StartScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.Image;
    constructor() {
        super('StartScene');
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause', 'assets/pause.png');
    }
    create() {
        this.scene.start('MenuScene');
    }
}