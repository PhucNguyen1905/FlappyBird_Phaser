import 'phaser';
import { PlayScene } from './Scenes/PlayScene';
import { Constants } from './Contants';
import { MenuScene } from './Scenes/MenuScene';
import { StartScene } from './Scenes/StartScene';

const config = {
    type: Phaser.AUTO,
    width: Constants.CANVAS_W,
    height: Constants.CANVAS_H,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [StartScene, MenuScene, PlayScene]
}

new Phaser.Game(config)


