export interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    frame?: number
}
export interface ITitleSpriteConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    w: number,
    h: number,
    key: string;
}