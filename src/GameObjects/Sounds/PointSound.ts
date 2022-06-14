export class PointSound extends Phaser.Sound.WebAudioSound {
    constructor(soundManager: Phaser.Sound.WebAudioSoundManager | Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager) {
        super(soundManager as Phaser.Sound.WebAudioSoundManager, 'point')
        soundManager.add(this.key)
    }

}