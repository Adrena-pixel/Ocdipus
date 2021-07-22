class Load extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('character', './assets/Character.png');
        this.load.image('ground', './assets/ground.png');//for test
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('ntr', './assets/ntr.png');
        this.load.image('bg', './assets/bg.png');

        this.load.image('tiles', './assets/tile.png');
        this.load.image('title', './assets/title.png');
        this.load.image('hitbox', './assets/hitbox.png');
        this.load.image('win', './assets/goal.png');
        this.load.tilemapTiledJSON('map','./assets/mapsheet.json'); //load tile map

        this.load.audio('jump', './assets/JumpOdps.wav');
        this.load.audio('attack', './assets/meleeAttack.wav');
        this.load.audio('be_hit', './assets/beHit.wav');
        this.load.audio('ntr_die', './assets/mntrDie.wav');
        this.load.audio('ntr_hurt', './assets/hitEnemy.wav');
        this.load.audio('c_die', './assets/charaDie.wav');
        this.load.audio('bgm', './assets/OdpsBGM.mp3');


        this.load.spritesheet('attack', './assets/attack.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0, 
            endFrame: 6
        });
        this.load.spritesheet('attack_left', './assets/attack(left).png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0, 
            endFrame: 6
        });
        this.load.spritesheet('stand_right', './assets/stand_right.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 3
        });
        this.load.spritesheet('walk_right', './assets/walk_right.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 3
        });
        this.load.spritesheet('jump', './assets/jump.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 1
        });
        this.load.spritesheet('c_attack', './assets/c_attack.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 4
        });
        this.load.spritesheet('c_airattack', './assets/c_airattack.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 5
        });
        this.load.spritesheet('c_hurt', './assets/c_hurt.png', {
            frameWidth: 50,
            frameHeight: 100,
            startFrame: 0, 
            endFrame: 1
        });
        this.load.spritesheet('ntr_charge', './assets/ntr_charge.png', {
            frameWidth: 120,
            frameHeight: 150,
            startFrame: 0, 
            endFrame: 3
        });
        this.load.spritesheet('ntr_stand', './assets/ntr_stand.png', {
            frameWidth: 120,
            frameHeight: 150,
            startFrame: 0, 
            endFrame: 4
        });
        this.load.spritesheet('ntr_die', './assets/ntr_die.png', {
            frameWidth: 120,
            frameHeight: 150,
            startFrame: 0, 
            endFrame: 9
        });
        this.load.spritesheet('ntr_hurt', './assets/ntr_hurt.png', {
            frameWidth: 120,
            frameHeight: 150,
            startFrame: 0, 
            endFrame: 1
        });
        this.load.spritesheet('goal', './assets/finalAtgny.png', {
            frameWidth: 60,
            frameHeight: 150,
            startFrame: 0, 
            endFrame: 2
        });
        
    }

    create (){
        this.scene.start('menuScene');

        /*const map = this.make.tilemap({key: 'map'});
        const tileset = tilemap.addTilesetImage('maptile', 'tiles');
        map.createLayer('earth', tileset);*/

    }
}