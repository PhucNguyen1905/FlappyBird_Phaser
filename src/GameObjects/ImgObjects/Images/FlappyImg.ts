import { IImageConstructor } from '../../ConstructInterface';
export class FlappyImg extends Phaser.GameObjects.Image {
    constructor(f: IImageConstructor) {
        super(f.scene, f.x, f.y, f.key);
        this.setOrigin(0.5, 0.5);

        this.scene.add.existing(this);
    }

}