import { IImageConstructor } from '../ConstructInterface';
export class Bird extends Phaser.GameObjects.Sprite {
    animKey: string;
    body!: Phaser.Physics.Arcade.Body;
    isFalling: boolean = false;

    constructor(b: IImageConstructor) {
        super(b.scene, b.x, b.y, b.key);
        this.setOrigin(0.5, 0.5);

        // Create animation
        this.animKey = b.key + '_anim';
        this.createAnims(b.key);

        // Set up Physics
        this.setUpPhysics();

        this.scene.add.existing(this);
    }
    setUpPhysics() {
        this.scene.physics.world.enable(this);
        this.body.gravity.y = 980;
        this.body.setCollideWorldBounds(true);
    }

    createAnims(key: string) {
        this.anims.create({
            key: this.animKey,
            frames: this.anims.generateFrameNumbers(key, {
                start: 0,
                end: 16
            }),
            frameRate: 51,
            repeat: -1
        })
        this.play(this.animKey);
    }

    update(delta: number): void {
        const dt = delta / 1000;
        if (this.body.velocity.y < 0) {
            this.angle -= 650 * (dt);
            if (this.angle < -30) {
                this.angle = -30;
            }
        } else {
            this.angle += 300 * (dt);
            if (this.angle > 90) {
                this.angle = 90;
            }
        }
    }

    flyUp() {
        if (!this.isFalling) {
            this.body.velocity.y = -400;
        }
    }

    falling(): void {
        this.isFalling = true;
        this.depth = 5;
    }
    reset() {
        this.isFalling = false;
    }
}