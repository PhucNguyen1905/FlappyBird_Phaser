import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create
    }
}

// Loading assets: images, music, animations,...
function preload() {
    debugger
}

// 
function create() {
    debugger
}

new Phaser.Game(config);
