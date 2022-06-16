import { IImageConstructor } from "../../ConstructInterface";
export class OverImg extends Phaser.GameObjects.Image {
    constructor(o: IImageConstructor) {
        super(o.scene, o.x, o.y, o.key);
        this.setOrigin(0.5, 0.5);

        this.setDisplaySize(300, 100)

        this.scene.add.existing(this);
    }

}