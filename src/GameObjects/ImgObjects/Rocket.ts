import { Constants } from '../../Contants';
import { IImageConstructor } from '../ConstructInterface';
export class Rocket extends Phaser.GameObjects.Sprite {
    animKey: string;
    body!: Phaser.Physics.Arcade.Body;

    constructor(r: IImageConstructor) {
        super(r.scene, r.x, r.y, r.key);
        this.setOrigin(0.5, 0.5);

        // Create animation
        this.animKey = r.key + '_anim';
        this.createAnims(r.key);

        // Set up Physics
        this.setUpPhysics();

        this.scene.add.existing(this);
    }
    setUpPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setVelocityX(300);

    }

    createAnims(key: string) {
        this.anims.create({
            key: this.animKey,
            frames: this.anims.generateFrameNumbers(key, {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        })
        this.play(this.animKey);
    }

    update(): void {
        if (this.x > Constants.CANVAS_W) {
            console.log('destroy')
            this.destroy();
        }
    }


}