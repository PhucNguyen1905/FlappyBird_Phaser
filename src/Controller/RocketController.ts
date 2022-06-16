import { Rocket } from "../GameObjects/ImgObjects/Rocket";

export class RocketController {
    curUsing: number = 0;
    maxNoRocket: number = 4;
    rockets: Rocket[] = [];
    constructor(scene: Phaser.Scene) {
        this.createRockets(scene)
    }

    createRockets(scene: Phaser.Scene) {
        for (let i = 0; i < this.maxNoRocket; i++) {
            let rocket = new Rocket({ scene: scene, x: -200, y: -200, key: 'rocket_sprites' })
            rocket.body.setVelocityX(0);
            this.rockets.push(rocket)
        }
    }

    getRockets() {
        return this.rockets;
    }

    rocketBoom(rocket: Rocket) {
        // Modify Rocket.ts to reset original pos
        for (const r of this.rockets) {
            if (rocket == r) {
                r.hide();
                this.decCurUsing();
                break;
            }
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
                    rocket.body.setVelocityX(300);
                    break;
                }
            }
        } else {
            console.log('Out of rocket')
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