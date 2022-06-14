import { IImageConstructor } from '../ConstructInterface';
export class RestartBtn extends Phaser.GameObjects.Image {
    constructor(p: IImageConstructor) {
        super(p.scene, p.x, p.y, p.key);
        this.setOrigin(0.5, 0.5);
        this.setInteractive();

        this.setDisplaySize(150, 50)

        this.scene.add.existing(this);
    }

}