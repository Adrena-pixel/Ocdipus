class Load extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('character', './assets/Character.png');
        this.load.image('ground', './assets/ground.png');//for test
        this.load.image('enemy', './assets/enemy.png');

        this.load.image('tiles', './assets/tile.png');
        this.load.image('title', './assets/title.png');
        this.load.image('hitbox', './assets/hitbox.png')
        this.load.tilemapTiledJSON('map','./assets/mapsheet.json'); //load tile map

        this.load.audio('jump', './assets/JumpOdps.wav');
        this.load.audio('attack', './assets/meleeAttack.wav');
        this.load.audio('be_hit', './assets/beHit.wav');
        this.load.audio('bgm', './assets/OdpsBGM.mp3');

        this.load.spritesheet('attack', './assets/attack.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0, 
            endFrame: 6
        });
    }

    create (){
        this.scene.start('menuScene');

        /*const map = this.make.tilemap({key: 'map'});
        const tileset = tilemap.addTilesetImage('maptile', 'tiles');
        map.createLayer('earth', tileset);*/

    }
}