import { IImageConstructor } from "../../ConstructInterface";
export class Pipe extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;
    constructor(p: IImageConstructor) {
        super(p.scene, p.x, p.y, p.key);
        this.setOrigin(0, p.frame);

        // Set up Physics
        this.setUpPhysics();

        this.scene.add.existing(this);
    }

    setUpPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setVelocityX(-200);
    }
}