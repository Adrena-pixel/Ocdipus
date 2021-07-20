var cursors;
var character_attack = 30;
class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.beattacked = false;
        this.BounceVelocity = 250;

        
        this.createenemy();
        this.createcharacter();
        this.createInput();
        this.createCameras();

        this.map = this.add.tilemap('map');
        var tile = this.map.addTilesetImage('tile', 'tiles'); //( name of tile in tiled, key)
        this.layer = this.map.createLayer('ground', tile, 0 ,0);

        
        this.create_hitbox();
        this.createCollider();
    
        this.add_bgm();   
    }
    //add background music
    add_bgm(){
        this.bgm = this.sound.add('bgm');
            var bgmconfig = {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            }
        this.bgm.play (bgmconfig)
    }

    //set key
    createInput() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    createCameras() {
        this.cameras.main.startFollow(this.character);
        //this.camera.setBounds(0);
    }

    createcharacter() {
        this.character = new Character(this, 32, 800, 0).setOrigin(0,0);
    }


    createground() {
        this.ground = this.physics.add.sprite(100, 500, 'ground')
        .setImmovable(true)
        .setOrigin(0,0);
    }

    createenemy() {
        this.enemy = new Enemy(this, 3200, 640, 0).setOrigin(0,0);
    }
    
    createCollider() {
        this.physics.add.collider(this.character, this.enemy, this.hit, undefined, this);
        this.physics.add.collider(this.enemy, this.layer);
        this.physics.add.collider(this.character, this.layer);
        this.layer.setCollisionBetween(0,70);
        this.physics.add.overlap(this.hitbox, this.enemy, this.enemy_damage, this.hitbox_reset, this);
    }

    hit() {
        //console.log(character_hp);
        this.dx = this.character.x - (this.enemy.x);
        this.dy = -10;
        this.dir = new Phaser.Math.Vector2(this.dx, this.dy).normalize().scale(500);
        this.character.body.setVelocity(this.dir.x, this.dir.y);
        this.character.hit = 1;
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
    overlap_check(character, enemy){
        if (character.x >= enemy.x &&
            character.x + character.width <= enemy.x + enemy.width &&
            character.y >= enemy.y  &&
            character.y + character.height<= enemy.y + enemy.height){
            return true;}

        else{
            return false;
        }
    }

    charge(){
        if(this.overlap_check(this.character, this.enemy)){
            if(this.enemy.body.blocked.left){
                this.enemy.x + this.enemy.x.width + this.character.width * 1.5;
            }
            else if (this.enemy.body.blocked.right){
                this.enemy.x - this.character.width * 1.5;
            }
        }
        else if (this.range_check(this.character, this.enemy)){
            if (this.enemy.x - this.character.x >= 0 && this.enemy.y - 40 <= this.character.y){
                this.enemy.body.setVelocityX(-150);
            }else if (this.enemy.x - this.character.x < 0 && this.enemy.y - 40 <= this.character.y){
                this.enemy.body.setVelocityX(150);
            }
            else {
                this.enemy.body.setVelocityX(0);
            }
        }
        else{
            this.enemy.body.setVelocityX(0);
            }

    }



    //player attack
    //create new hitbox
    create_hitbox(){
        this.hitbox = this.add.rectangle(200, 1400, 100, 80, 0xffffff, 0).setOrigin(0, 0);
        this.physics.add.existing(this.hitbox);
        this.physics.world.remove(this.hitbox.body);
    }

    hitbox_set(){
        if(Phaser.Input.Keyboard.JustDown(keyX) && this.character.swing == false){
            //this.create_hitbox();
            this.hitbox.body.enable = true;
            if (this.character.flipX == false){
                this.hitbox.x = this.character.x + this.character.width;
                this.hitbox.y = this.character.y;
                this.physics.world.add(this.hitbox.body);
                //this.physics.add.collider(this.hitbox.body);
                this.character.swing = true;

                this.time.addEvent({
                    delay: 600,
                    callback: this.hitbox_reset,
                    callbackScope: this,
                    loop: false
                });
            }else{
                this.hitbox.x = this.character.x - this.hitbox.width;
                this.hitbox.y = this.character.y;
                this.physics.world.add(this.hitbox.body);
                //this.physics.add.collider(this.hitbox.body);
                this.character.swing = true;

                this.time.addEvent({
                    delay: 600,
                    callback: this.hitbox_reset,
                    callbackScope: this,
                    loop: false
                });
            }
           
        }
    }

    hitbox_reset(){

        this.physics.world.remove(this.hitbox.body);
        this.hitbox.body.enable = false;
        this.character.swing = false;
    }

    enemy_damage(){
        //console.log('enemy_damage');
        if (this.enemy.x - this.character.x > 0){ //the enemy is right to the player
            this.enemy.x += 100;
            this.enemy.y -= 20;
            this.enemy.hp -= character_attack;
            //console.log('attack from left');
            // console.log(this.enemy.hp);
        }
        else if (this.enemy.x - this.character.x < 0){
            this.enemy.x -= 100;
            this.enemy.y -= 20;
            this.enemy.hp -= character_attack;
            //console.log('attack from right');
            //console.log(this.enemy.hp);
        }

    }

    lose(){
        if (this.character.y >= 1024 ||
            this.character.hp <= 0){
                this.time.addEvent({
                    delay: 100,
                    callback: () => {
                        this.scene.start('loseScene');
                    },
                    loop: false
                })
            }
    }

    update() {
        
        if (this.character.hit > 0){
            ++this.character.hit;
            if (this.character.hit > 30){
                this.character.hit = 0;
            }
            return;
        }
        this.character.update();
        
        this.enemy.update();
        this.charge();
        
        this.hitbox_set();
        
        //this.physics.add.collider(this.character, this.enemy, this.attacked, undefined, this);
        //this.physics.add.overlap(this.character, this.enemy, this.attacked, undefined, this);
        // this.Bounce();        
    }
    
}