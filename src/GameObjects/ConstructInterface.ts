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

export interface ITextConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    content: string;
    style: {
        fontSize: string,
        color: string
    }
}