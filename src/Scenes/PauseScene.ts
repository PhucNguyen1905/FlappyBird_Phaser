import { Constants } from '../Contants';
import { Background } from '../GameObjects/ImgObjects/Background';
import { GamePauseImg } from '../GameObjects/ImgObjects/GamePauseImg';
import { ClickSound } from '../GameObjects/Sounds/ClickSound';
import { MouseOverSound } from '../GameObjects/Sounds/MouseOverSound';

export class PauseScene extends Phaser.Scene {
    bg!: Background;
    menuItems: { scene: string, text: string }[];
    gamePauseImg!: GamePauseImg;
    fontStyle: {} = { fontSize: '30px', color: '#fff' };
    clickSound!: ClickSound;
    mouseOverSound!: MouseOverSound;
    constructor() {
        super('PauseScene');
        this.menuItems = [
            { scene: 'PlayScene', text: 'Continue' },
            { scene: 'StartScene', text: 'Exit' },
            { scene: 'Musci', text: 'Music: On' }
        ]
    }
    init() {
        this.initBackground();
        this.gamePauseImg = new GamePauseImg({ scene: this, x: Constants.CANVAS_W / 2, y: Constants.CANVAS_H / 2 - 100, key: 'game_pause' })
        this.initSounds();
    }
    create() {
        this.createMenu();
    }

    initBackground() {
        this.bg = new Background({ scene: this, x: 0, y: 0, w: Constants.CANVAS_W, h: Constants.CANVAS_H, key: 'background' })
    }
    initSounds() {
        this.clickSound = new ClickSound(this.sound);
        this.mouseOverSound = new MouseOverSound(this.sound);

        if (!this.sound.mute) {
            this.menuItems[2].text = 'Music: On'
        } else {
            this.menuItems[2].text = 'Music: Off'
        }
    }

    update(time: number, delta: number): void {
        this.bg.update();
    }

    createMenu() {
        let lastY = 60;
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
            this.mouseOverSound.play();
            textObject.setColor('#F9D923');
        })
        textObject.on('pointerout', () => {
            textObject.setColor('#fff');
        })
        textObject.on('pointerup', () => {
            this.clickSound.play();
            if (item.text == 'Continue') {
                this.scene.stop();
                this.scene.resume(item.scene);
            } else if (item.text == 'Exit') {
                this.scene.stop('PlayScene')
                this.scene.start('StartScene')
            } else {
                if (this.sound.mute) {
                    this.sound.mute = false
                    textObject.setText('Music: On')
                } else {
                    this.sound.mute = true
                    textObject.setText('Music: Off')
                }
            }
        })
    }
}