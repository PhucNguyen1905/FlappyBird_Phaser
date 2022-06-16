import { IImageConstructor } from '../ConstructInterface';
export class Bee extends Phaser.GameObjects.Sprite {
    animKey: string;
    body!: Phaser.Physics.Arcade.Body;
    speed: number = 2;
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
                end: 12
            }),
            frameRate: 36,
            repeat: -1
        })
        this.play(this.animKey);
    }

    setNewPos(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.body.setVelocityX(-200);
        this.isAppeared = true;
    }

    hide() {
        this.x = 2000;
        this.body.setVelocityX(0);
        this.isAppeared = false;
        this.speed = 0;
    }

    setDontMove() {
        this.body.setVelocityX(0);
        this.speed = 0;
    }

    genEnemy(x: number, y: number) {
        if (this.isAppeared) {
            return;
        }
        this.setNewPos(x + 40, y);
    }

    update(...args: any[]): void {
        if (this.x < -50) {
            this.hide();
            return;
        }
        this.y += this.speed;
        if (this.y < 200 || this.y > 450) {
            this.speed *= -1;
        }
    }


}