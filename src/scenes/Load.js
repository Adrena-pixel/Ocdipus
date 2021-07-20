class Load extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('character', './assets/Character.png');
        this.load.image('ground', './assets/ground.png');//for test
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('attack', './assets/attack.png');

        this.load.image('tiles', './assets/tile.png');
        this.load.image('title', './assets/title.png');
        this.load.tilemapTiledJSON('map','./assets/mapsheet.json'); //load tile map

        this.load.audio('jump', './assets/Jump01.wav');
        this.load.audio('jump_air', './assets/Jump_air.wav');
        this.load.audio('range_attack', './assets/rangedAttack1.wav');
        this.load.audio('bgm', './assets/OdpsBGM.mp3');
    }

    create (){
        this.scene.start('menuScene');

        /*const map = this.make.tilemap({key: 'map'});
        const tileset = tilemap.addTilesetImage('maptile', 'tiles');
        map.createLayer('earth', tileset);*/

    }
}