import { Exposion } from "../GameObjects/ImgObjects/Sprites/Explosion";
import { Rocket } from "../GameObjects/ImgObjects/Sprites/Rocket";
import { OutOfRocket } from "../GameObjects/Sounds/OutOfRoc";
import { StrongHitSound } from "../GameObjects/Sounds/StrongHitSound";

export class RocketController {
    curUsing: number = 0;
    maxNoRocket: number = 2;
    rockets: Rocket[] = [];
    expls: Exposion[] = [];
    strongHitSound!: StrongHitSound;
    outOfRocket!: OutOfRocket;
    constructor(scene: Phaser.Scene) {
        this.createRockets(scene);
        this.createExplosions(scene);
        this.initSounds(scene);
    }

    createRockets(scene: Phaser.Scene) {
        for (let i = 0; i < this.maxNoRocket; i++) {
            let rocket = new Rocket({ scene: scene, x: -200, y: -200, key: 'rocket_sprites' })
            rocket.body.setVelocityX(0);
            this.rockets.push(rocket)
        }
    }

    createExplosions(scene: Phaser.Scene) {
        for (let i = 0; i < this.maxNoRocket; i++) {
            let expl = new Exposion({ scene: scene, x: -200, y: -200, key: 'explosion' })
            this.expls.push(expl)
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
        let i = 0;
        for (const r of this.rockets) {
            if (rocket == r) {
                this.expls[i].boomBoom(rocket.x, rocket.y)
                this.strongHitSound.play();
                r.hide();
                this.decCurUsing();
                break;
            }
            i += 1;
        }
    }

    shootRocket(x: number, y: number) {
        if (this.curUsing < this.maxNoRocket) {
            this.curUsing += 1;
            for (const rocket of this.rockets) {
                if (!rocket.isShooting) {
                    rocket.x = x;
                    rocket.y = y;
                    rocket.isShooting = true;
                    rocket.body.setGravityX(800);
                    break;
                }
            }
        } else {
            this.outOfRocket.play();
        }
    }
    update() {
        for (const rocket of this.rockets) {
            if (rocket.isShooting) {
                rocket.update();
            }
        }
        let count = 0;
        for (const rocket of this.rockets) {
            if (rocket.isShooting) {
                count += 1;
            }
        }
        this.curUsing = count;

    }

    decCurUsing() {
        this.curUsing -= 1;
        if (this.curUsing < 0) this.curUsing = 0;
    }


}