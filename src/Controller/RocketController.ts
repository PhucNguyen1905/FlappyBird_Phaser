import { Exposion } from "../GameObjects/ImgObjects/Sprites/Explosion";
import { Rocket } from "../GameObjects/ImgObjects/Sprites/Rocket";
import { OutOfRocket } from "../GameObjects/Sounds/OutOfRoc";
import { StrongHitSound } from "../GameObjects/Sounds/StrongHitSound";

export class RocketController {
    curUsing: number = 0;
    maxNoRocket: number = 2;
    rockets!: Phaser.GameObjects.Group;
    expls!: Phaser.GameObjects.Group;
    strongHitSound!: StrongHitSound;
    outOfRocket!: OutOfRocket;

    constructor(scene: Phaser.Scene) {
        this.createRockets(scene);
        this.createExplosions(scene);
        this.initSounds(scene);
    }

    createRockets(scene: Phaser.Scene) {
        this.rockets = scene.add.group();
        for (let i = 0; i < this.maxNoRocket; i++) {
            let rocket = new Rocket({ scene: scene, x: -200, y: -200, key: 'rocket_sprites' })
            rocket.body.setVelocityX(0);
            rocket.active = false;
            this.rockets.add(rocket)
        }
    }

    createExplosions(scene: Phaser.Scene) {
        this.expls = scene.add.group();
        for (let i = 0; i < this.maxNoRocket; i++) {
            let expl = new Exposion({ scene: scene, x: -200, y: -200, key: 'explosion' })
            expl.active = false;
            this.expls.add(expl)
        }
    }

    initSounds(scene: Phaser.Scene) {
        this.strongHitSound = new StrongHitSound(scene.sound)
        this.outOfRocket = new OutOfRocket(scene.sound);
    }

    getRockets() {
        return this.rockets;
    }

    rocketBoom(rocket: Rocket) {
        this.rockets.getChildren().forEach((r: any) => {
            if (r == rocket) {
                this.strongHitSound.play();
                this.startExplosion(r.x, r.y)
                r.hide();
            }
        })
    }

    startExplosion(x: number, y: number) {
        const expl = this.expls.getFirstDead(false, x - 10, y);
        expl.active = true;
        expl.boomBoom();
    }

    shootRocket(x: number, y: number) {
        if (this.rockets.countActive(true) < this.maxNoRocket) {
            const rocket = this.rockets.getFirstDead(false, x, y);
            rocket.active = true;
            rocket.body.setGravityX(800);
        } else {
            this.outOfRocket.play();
        }
    }

    update() {
        this.rockets.getChildren().forEach((r: any) => {
            if (r.active) {
                r.update();
            }
        })
    }

}