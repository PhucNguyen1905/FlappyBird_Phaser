import { Constants } from '../../Contants';
import { IImageConstructor } from '../ConstructInterface';
export class Exposion extends Phaser.GameObjects.Sprite {
    animKey: string;

    constructor(r: IImageConstructor) {
        super(r.scene, r.x, r.y, r.key);
        this.setOrigin(0.5, 0.5);

        // Create animation
        this.animKey = r.key + '_anim';
        this.createAnims(r.key);

        this.scene.add.existing(this);
        this.play(this.animKey);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        })
    }

    createAnims(key: string) {
        this.anims.create({
            key: this.animKey,
            frames: this.anims.generateFrameNumbers(key, {
                start: 0,
                end: 4
            }),
            frameRate: 20,
            repeat: 0
        })
    }


}