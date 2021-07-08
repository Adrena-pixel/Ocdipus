class Load extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('character', './assets/character.png');
        this.load.image('ground', './assets/ground.png');//for test
    }

    create (){
        this.scene.start('PlayScene');
    }
}
