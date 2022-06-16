import { ITextConstructor } from '../ConstructInterface';

export class ScoreText extends Phaser.GameObjects.Text {
    constructor(h: ITextConstructor) {
        super(h.scene, h.x, h.y, h.content, h.style);
        this.setOrigin(0, 0)
        this.depth = 5;

        this.scene.add.existing(this);
    }
}