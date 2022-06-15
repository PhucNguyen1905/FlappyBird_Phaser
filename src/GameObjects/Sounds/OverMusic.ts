export class OverMusic extends Phaser.Sound.WebAudioSound {
    constructor(soundManager: Phaser.Sound.WebAudioSoundManager | Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager) {
        super(soundManager as Phaser.Sound.WebAudioSoundManager, 'over_music')
        soundManager.add(this.key)
    }

}