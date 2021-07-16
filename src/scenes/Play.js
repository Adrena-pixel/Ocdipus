var cursors;
class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        

        this.createcharacter();
        //this.createground();//for test
        this.createenemy();
        
        this.createInput();
        this.createCameras();

        this.map = this.add.tilemap('map');
        var tile = this.map.addTilesetImage('tile', 'tiles'); //( name of tile in tiled, key)
        this.layer = this.map.createLayer('ground', tile, 0 ,0);

        this.createCollider();
        
    }

    //set key
    createInput() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    }

    createCameras() {
        this.cameras.main.startFollow(this.character);
    }

    createcharacter() {
        this.character = new Character(this, 270, 1500, 0).setOrigin(0,0);
    }
    // for test
    createground() {
        this.ground = this.physics.add.sprite(100, 500, 'ground')
        .setImmovable(true)
        .setOrigin(0,0);
    }

    createenemy() {
        this.enemy = new Enemy(this, 770, 300, 0).setOrigin(0,0);
    }
    
    createCollider() {
        //for test
        //this.physics.add.collider(this.character, this.ground);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.character, this.enemy);
        this.physics.add.collider(this.character, this.layer);
        this.physics.add.collider(this.character, this.layer);
        this.layer.setCollisionBetween(0,50);
    }

    update() {
        this.character.update();
        this.enemy.update();
    }
}