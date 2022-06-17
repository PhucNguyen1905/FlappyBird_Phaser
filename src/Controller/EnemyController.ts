import { Bee } from "../GameObjects/ImgObjects/Sprites/Bee";
import { Dragon } from "../GameObjects/ImgObjects/Sprites/Dragon";
import { Constants } from "../Contants";


export class EnemyController {
    enemies!: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        this.initEnemy(scene);
    }
    initEnemy(scene: Phaser.Scene) {
        this.enemies = scene.add.group();
        let dragon = new Dragon({ scene: scene, x: 2000, y: Constants.CANVAS_H / 2, key: 'enemy_sprites' })
        let bee = new Bee({ scene: scene, x: 2000, y: Constants.CANVAS_H / 2, key: 'bee_sprites' })
        this.enemies.add(dragon);
        this.enemies.add(bee);
    }

    getEnemy() {
        return this.enemies;
    }

    hideEnemy(enemy: any) {
        this.enemies.getChildren().forEach((e: any) => {
            if (enemy == e) {
                e.hide();
            }
        })
    }

    update() {
        this.enemies.getChildren().forEach((e: any) => {
            e.update();
        })
    }

    setDontMove() {
        this.enemies.getChildren().forEach((e: any) => {
            e.setDontMove();
        })
    }

    genEnemy(x: number, y: number, idx: number) {
        let enemy: any = this.enemies.children.entries[idx];
        enemy.genEnemy(x, y);
    }
}