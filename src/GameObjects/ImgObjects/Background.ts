import Phaser from 'phaser';
import { ITitleSpriteConstructor } from '../ConstructInterface';

export class Background extends Phaser.GameObjects.TileSprite {
    constructor(b: ITitleSpriteConstructor) {
        super(b.scene, b.x, b.y, b.w, b.h, b.key);
        this.setOrigin(0);

        this.scene.add.existing(this);
    }
    update(...args: any[]): void {
        this.tilePositionX += 1.2;
    }
}