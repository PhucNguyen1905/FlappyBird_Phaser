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
        this.load.spritesheet('rocket_sprites', 'assets/rocket_sprites.png', { frameWidth: 60, frameHeight: 23 });
        this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enemy_sprites', 'assets/enemy_sprites.png', { frameWidth: 75, frameHeight: 74 });
        this.load.spritesheet('bee_sprites', 'assets/bee_sprites.png', { frameWidth: 75, frameHeight: 77 });
        this.load.spritesheet('coin_sprites', 'assets/coin_sprites.png', { frameWidth: 28, frameHeight: 38 });

        // Loading sound
        this.load.audio('click', 'sounds/click.mp3');
        this.load.audio('die', 'sounds/die.mp3');
        this.load.audio('hit', 'sounds/hit.mp3');
        this.load.audio('strong_hit', 'sounds/strong_hit.mp3');
        this.load.audio('point', 'sounds/point.mp3');
        this.load.audio('flap', 'sounds/wing.mp3');
        this.load.audio('mouse_over', 'sounds/mouseover.mp3');
        this.load.audio('bgmusic', 'sounds/bgmusic.mp3');
        this.load.audio('start_music', 'sounds/start_music.mp3');
        this.load.audio('over_music', 'sounds/over_music.mp3');
        this.load.audio('out_of_roc', 'sounds/out_of_roc.mp3');

    }
    create() {
        this.scene.start('StartScene');
    }
}