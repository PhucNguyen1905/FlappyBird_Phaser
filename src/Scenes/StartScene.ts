import 'phaser';

export class StartScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.Image;
    constructor() {
        super('StartScene');
    }
    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('bird', 'assets/bird1.png');
        this.load.image('pipe_up', 'assets/pipe_up.png');
        this.load.image('pipe_down', 'assets/pipe_down.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.spritesheet('bird_sprites', 'assets/spritesheet.png', { frameWidth: 80, frameHeight: 63 });
    }
    create() {
        this.scene.start('MenuScene');
    }
}