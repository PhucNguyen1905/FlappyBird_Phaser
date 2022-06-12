import 'phaser';
import { PlayScene } from './Scenes/PlayScene';
import { Constants } from './Contants';

const config = {
    type: Phaser.AUTO,
    width: Constants.CANVAS_W,
    height: Constants.CANVAS_H,
    physics: {
        default: 'arcade'
    },
    scene: [PlayScene]
}

new Phaser.Game(config)


