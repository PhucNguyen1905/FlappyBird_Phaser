import { Constants } from "../Contants";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(350, Constants.CANVAS_H / 2, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 30,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2 + 5,
            y: height / 2 + 22,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 60,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value: number) {
            percentText.setText((value * 100).toFixed(2) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x3AB0FF, 1);
            progressBar.fillRect(360, Constants.CANVAS_H / 2 + 10, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file: Phaser.Loader.File) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // Loading image
        this.load.image('background', 'assets/bg.png');
        this.load.image('pipe_up', 'assets/pipe_up.png');
        this.load.image('pipe_down', 'assets/pipe_down.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('game_pause', 'assets/game_pause.png');
        this.load.image('flappy', 'assets/flappy.png');
        this.load.image('over', 'assets/over.png');
        this.load.image('playbtn', 'assets/playbtn.png');
        this.load.image('restart', 'assets/restart.png');
        this.load.image('exit', 'assets/exit.png');

        // Loading spritesheet
        this.load.spritesheet('bird_sprites', 'assets/spritesheet.png', { frameWidth: 80, frameHeight: 63 });

        // Loading sound
        this.load.audio('click', 'sounds/click.mp3');
        this.load.audio('die', 'sounds/die.mp3');
        this.load.audio('hit', 'sounds/hit.mp3');
        this.load.audio('point', 'sounds/point.mp3');
        this.load.audio('flap', 'sounds/wing.mp3');
        this.load.audio('mouse_over', 'sounds/mouseover.mp3');

    }
    create() {
        this.scene.start('StartScene');
    }
}