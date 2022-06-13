import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }
    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('pipe_up', 'assets/pipe_up.png');
        this.load.image('pipe_down', 'assets/pipe_down.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('flappy', 'assets/flappy.png');
        this.load.image('over', 'assets/over.png');
        this.load.image('playbtn', 'assets/playbtn.png');
        this.load.image('restart', 'assets/restart.png');
        this.load.spritesheet('bird_sprites', 'assets/spritesheet.png', { frameWidth: 80, frameHeight: 63 });
    }
    create() {
        this.scene.start('OverScene');
    }
}