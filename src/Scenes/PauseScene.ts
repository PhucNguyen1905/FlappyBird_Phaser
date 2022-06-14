import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';

export class PauseScene extends Phaser.Scene {
    bg!: Background;
    menuItems: {}[];
    fontStyle: {} = { fontSize: '30px', color: '#fff' };
    constructor() {
        super('PauseScene');
        this.menuItems = [
            { scene: 'PlayScene', text: 'Continue' },
            { scene: 'StartScene', text: 'Exit' }
        ]
    }
    // preload() {
    //     this.load.image('sky', 'assets/sky.png');
    // }
    init() {
        this.initBackground();
    }
    create() {
        this.createMenu();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

    createMenu() {
        let lastY = 0;
        this.menuItems.forEach((item: any) => {
            const pos = [Constants.CANVAS_W / 2, Constants.CANVAS_H / 2 + lastY];
            item.textObject = this.add.text(pos[0], pos[1], item.text, this.fontStyle).setOrigin(0.5, 1);
            lastY += 35;
            this.setMenuEvent(item.textObject, item);
        })
    }
    setMenuEvent(textObject: Phaser.GameObjects.Text, item: { scene: string, text: string }) {
        textObject.setInteractive();

        textObject.on('pointerover', () => {
            textObject.setColor('#F9D923');
        })
        textObject.on('pointerout', () => {
            textObject.setColor('#fff');
        })
        textObject.on('pointerup', () => {
            if (item.text == 'Continue') {
                this.scene.stop();
                this.scene.resume(item.scene);
            } else {
                this.scene.stop('PlayScene')
                this.scene.start('StartScene')
            }
        })
    }
}