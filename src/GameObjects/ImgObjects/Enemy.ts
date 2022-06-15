import { IImageConstructor } from '../ConstructInterface';
export class Enemy extends Phaser.GameObjects.Sprite {
    animKey: string;
    body!: Phaser.Physics.Arcade.Body;
    isAppeared: boolean = false;

    constructor(b: IImageConstructor) {
        super(b.scene, b.x, b.y, b.key);
        this.setOrigin(0.5, 0.5);

        this.setSize(70, 68);
        this.setDisplaySize(70, 68)

        // Create animation
        this.animKey = b.key + '_anim';
        this.createAnims(b.key);

        // Set up Physics
        this.setUpPhysics();

        this.scene.add.existing(this);
    }
    setUpPhysics() {
        this.scene.physics.world.enable(this);
        // this.body.setCollideWorldBounds(true);
    }

    createAnims(key: string) {
        this.anims.create({
            key: this.animKey,
            frames: this.anims.generateFrameNumbers(key, {
                start: 0,
                end: 10
            }),
            frameRate: 30,
            repeat: -1
        })
        this.play(this.animKey);
    }

    setNewPos(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.body.setVelocityX(-200);
        this.isAppeared = true;
    }
    hide() {
        this.x = 2000;
        this.body.setVelocityX(0);
        this.isAppeared = false;
    }

    setDontMove() {
        this.body.setVelocityX(0);
    }


}