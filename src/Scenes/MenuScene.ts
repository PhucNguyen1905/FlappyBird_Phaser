import 'phaser';
import { Constants } from '../Contants';

export class MenuScene extends Phaser.Scene {
    bg!: Phaser.GameObjects.TileSprite;
    menuItems: {}[];
    fontStyle: {} = { fontSize: '30px', color: '#fff' };
    constructor() {
        super('MenuScene');
        this.menuItems = [
            { scene: 'PlayScene', text: 'Play' },
            { scene: 'ScoreScene', text: 'Score' },
            { scene: 'Exit', text: 'Exit' }
        ]
    }
    // preload() {
    //     this.load.image('sky', 'assets/sky.png');
    // }
    create() {
        this.createBackground();
        this.createMenu();
    }
    createBackground() {
        this.bg = this.add.tileSprite(0, 0, Constants.CANVAS_W, Constants.CANVAS_H, 'background');
        this.bg.setOrigin(0, 0);
    }

    update(time: number, delta: number): void {
        this.bg.tilePositionX += 1.2;
    }

    createMenu() {
        let lastY = 0;
        this.menuItems.forEach((item: any) => {
            const pos = [Constants.CANVAS_W / 2, Constants.CANVAS_H / 2 + lastY];
            item.textObject = this.add.text(pos[0], pos[1], item.text, this.fontStyle).setOrigin(0.5, 1);
            lastY += 35;
            this.setMenuEvent(item.textObject, item.scene);
        })
    }
    setMenuEvent(textObject: Phaser.GameObjects.Text, scene: string) {
        textObject.setInteractive();

        textObject.on('pointerover', () => {
            textObject.setColor('#F9D923');
        })
        textObject.on('pointerout', () => {
            textObject.setColor('#fff');
        })
        textObject.on('pointerup', () => {
            if (scene == 'Exit') {
                this.game.destroy(true);
            } else {
                this.scene.start(scene);
            }
        })
    }
}