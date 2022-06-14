import Phaser from "phaser";
import { PlayScene } from './Scenes/PlayScene';
import { Constants } from './Contants';
import { PauseScene } from './Scenes/PauseScene';
import { StartScene } from './Scenes/StartScene';
import { OverScene } from './Scenes/OverScene';
import { LoadScene } from './Scenes/LoadScene';

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
    scene: [LoadScene, StartScene, PlayScene, PauseScene, OverScene]
}

new Phaser.Game(config)


