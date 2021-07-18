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
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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
        this.enemy = new Enemy(this, 770, 1500, 0).setOrigin(0,0);
    }
    
    createCollider() {
        //for test
        //this.physics.add.collider(this.character, this.ground);
        //this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.character, this.enemy);
        this.physics.add.collider(this.enemy, this.layer);
        this.physics.add.collider(this.character, this.layer);
        this.layer.setCollisionBetween(0,70);
    }


    update() {
        this.character.update();
        this.enemy.update();
        this.charge();
        //this.enemy_attack()

        
    }

    range_check(character, enemy){
        if (character.x >= enemy.x - 400 &&
            character.x <= enemy.x + enemy.width + 400 &&
            character.y >= enemy.y  - 400 &&
            character.y <= enemy.y + enemy.height + 400){
            return true;}

        else{
            return false;
        }
    }

    charge(){
        if (this.range_check(this.character, this.enemy)){
            if (this.enemy.x - this.character.x >= 0 && this.enemy.y - 40 <= this.character.y){
                console.log(this.enemy.body.velocity.x);
                this.enemy.body.setVelocityX(-150);
            }else if (this.enemy.x - this.character.x < 0 && this.enemy.y - 40 <= this.character.y){
                console.log(this.enemy.body.velocity.x);
                this.enemy.body.setVelocityX(150);
            }
            else {
                console.log(this.enemy.body.velocity.x);
                this.enemy.body.setVelocityX(0);
            }
        }
        else{
            this.enemy.body.setVelocityX(0);
            }
    }
    /*enemy_attack(){
        if (this.range_check(this.character, this.enemy)){
            this.attack();
            //console.log('attack');
            var resettimer = this.time.addEvent({
                delay: 5000,                // ms
                callback: this.body_reset,
                callbackScope: this,
                loop: true,
            });
        }
    }

    body_reset(){
        //console.log('reset');
        this.enemy.body.setSize(this.enemy.width, this.enemy.height, true);
        var attacktimer = this.time.addEvent({
            delay: 5000,                // ms
            callback: this.enemy_attack,
            callbackScope: this,
            loop: true,
        });
    }

    attack(){
        this.enemy.body.setSize(this.enemy.width * 4, this.enemy.height, true);

    }*/
}