var cursors;
var character_attack = 30;
//var ntr_group;
class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.beattacked = false;
        this.BounceVelocity = 250;

        this.bg = this.add.sprite(-80, -50, 'bg').setOrigin(0,0);
        this.bg.setScrollFactor(0,0);
        //this.bg.fixedToCamera = true;

        this.createenemy();
        this.createcharacter();
        this.createInput();
        this.createCameras();
        this.create_animation();

        this.goal = this.add.sprite(8000, 138,'win').setOrigin(0,0);
        this.goal.anims.play('goal');
        this.physics.add.existing(this.goal);

        this.map = this.add.tilemap('map');
        var tile = this.map.addTilesetImage('tile', 'tiles'); //( name of tile in tiled, key)
        this.layer = this.map.createLayer('ground', tile, 0 ,0);

        this.create_hitbox();
        this.createCollider();
        this.display_hp();
        this.add_bgm();   
    }

    update() {
        if (this.character.hit > 0){
            ++this.character.hit;
            if (this.character.hit > 20){
                this.character.hit = 0;
            }
            return;
        }
        this.character.update();
        
        this.enemy.update();
        this.ntr_2.update();
        this.ntr_3.update();
        this.ntr_4.update();
        this.ntr_5.update();
        this.add_ntr_anims();
        this.add_charge();
        this.lose();
        //this.win();
        this.hitbox_set();
        
        if (this.character.swing == true && !this.character.onFloor && !this.character.air_swing){
            let x = this.character.body.velocity.x;
            let y = this.character.body.velocity.y;
            this.character.body.velocity.x = 0;
            this.character.body.velocity.y = 0;

            this.time.addEvent({
                delay: 600,
                callback: () => {
                    this.character.body.velocity.x = x;
                    //this.character.body.velocity.y = y;
                    this.character.air_swing = true;
                },
                loop: false
            })
        }
    }

    display_hp(){
        this.hpText = this.add.text(100,0, `Hp: ${this.character.hp}`, { fontSize: '32px', fill: '#f65439'}).setOrigin(0,0);
        this.hpText.setScrollFactor(0,0);
        this.hpTimer = this.time.addEvent({
            delay: 0,
            callback: ()=> {
                //this.hpText = this.character.hp;
                if (this.character.hp <= 0){
                    this.hpText.setText(`Hp: ${0}`);
                }else{
                    this.hpText.setText(`Hp: ${this.character.hp}`);
                }
            },
            callbackScope: this,
            loop: true
        });
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

    create_animation(){
        this.anims.create({
            key: "character_attack",
            frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 6, first: 0}),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: "character_attack_left",
            frames: this.anims.generateFrameNumbers('attack_left', { start: 0, end: 6, first: 0}),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: "character_stand_right",
            frames: this.anims.generateFrameNumbers('stand_right', { start: 0, end: 3, first: 0}),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: "character_walk_right",
            frames: this.anims.generateFrameNumbers('walk_right', { start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "character_jump",
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 1, first: 0}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "c_attack",
            frames: this.anims.generateFrameNumbers('c_attack', { start: 0, end: 4, first: 0}),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: "c_airattack",
            frames: this.anims.generateFrameNumbers('c_airattack', { start: 0, end: 5, first: 0}),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: "c_hurt",
            frames: this.anims.generateFrameNumbers('c_hurt', { start: 0, end: 1, first: 0}),
            frameRate: 15,
            repeat: 2
        });
        this.anims.create({
            key: "ntr_charge",
            frames: this.anims.generateFrameNumbers('ntr_charge', { start: 0, end: 3, first: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "ntr_stand",
            frames: this.anims.generateFrameNumbers('ntr_stand', { start: 0, end: 4, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: "ntr_die",
            frames: this.anims.generateFrameNumbers('ntr_die', { start: 0, end: 9, first: 0}),
            frameRate: 6,
            repeat: 1
        });
        this.anims.create({
            key: "ntr_hurt",
            frames: this.anims.generateFrameNumbers('ntr_hurt', { start: 0, end: 1, first: 0}),
            frameRate: 12,
            repeat: 1
        });
        this.anims.create({
            key: "goal",
            frames: this.anims.generateFrameNumbers('goal', { start: 0, end: 2, first: 0}),
            frameRate: 6,
            repeat: -1
        });

    }

    createCameras() {
        this.cameras.main.startFollow(this.character);
        this.cameras.y -= 400;
        this.cameras.main.zoom = 0.9;
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
        this.ntr_group =  this.add.group();
        this.enemy = new Enemy(this, 3200, 640, 0).setOrigin(0,0);
        this.ntr_2 = new Enemy(this, 4800, 750, 0).setOrigin(0,0);
        this.ntr_3 = new Enemy(this, 5440, 750, 0).setOrigin(0,0);
        this.ntr_4 = new Enemy(this, 5440, 300, 0).setOrigin(0,0);
        this.ntr_5 = new Enemy(this, 6720, 600, 0).setOrigin(0,0);
        this.ntr_group.add(this.enemy);
        this.ntr_group.add(this.ntr_2);
        this.ntr_group.add(this.ntr_3);
        this.ntr_group.add(this.ntr_4);
        this.ntr_group.add(this.ntr_5);
    }
    
    createCollider() {
       
        this.physics.add.collider(this.ntr_group, this.layer);
        this.physics.add.collider(this.character, this.layer);
        this.layer.setCollisionBetween(0,70);
        this.ntr_group.getChildren().forEach(function(enemy) {
            this.physics.add.collider(this.character, enemy, function(){ this.hit(enemy);}, undefined, this);
          }, this);
        this.ntr_group.getChildren().forEach(function(enemy) {
            this.physics.add.overlap(this.hitbox, enemy, function(){ this.ntr_damage(enemy);}, undefined, this);
          }, this);

        this.physics.add.collider(this.character, this.goal, this.win, undefined, this);

    }

    hit(enemy) {
        //console.log(character_hp);
        this.sound.play('be_hit');
        this.character.hp -= enemy.attack;
        let dx = this.character.x - (enemy.x);
        let dy = -10;
        let dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(500);
        this.character.body.setVelocity(dir.x, dir.y);
        this.character.hit = 1;
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.character.hit = 0;
            },
            loop: false
        })
        
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
   
    add_charge(){
        this.ntr_group.getChildren().forEach(function(enemy) {
            if (this.range_check(this.character, enemy)){
                
                if (enemy.x - this.character.x >= 0 && enemy.y - 60 <= this.character.y){
                    enemy.flipX = false;
                    enemy.body.setVelocityX(-150);
                    
                    
                }else if (enemy.x - this.character.x < 0 && enemy.y - 60 <= this.character.y){
                    enemy.flipX = true;
                    enemy.body.setVelocityX(150);
                }
                else {
                    enemy.body.setVelocityX(0);
                }
            }
            else{
                enemy.body.setVelocityX(0);
                }
          }, this);
    }
    add_ntr_anims(){
        this.ntr_group.getChildren().forEach(function(enemy) {
            if (enemy.body.velocity.x == 0 && enemy.hurt == 0){
                //enemy.anims.stop('ntr_charge');
                enemy.anims.play('ntr_stand', true);
            }
            else if (enemy.body.velocity.x != 0 && enemy.hurt == 0){
                //enemy.anims.stop('ntr_stand');
                enemy.anims.play('ntr_charge', true);
            }
            else if (enemy.hurt == 1){
                enemy.anims.play('ntr_hurt', true);
            }
        });
    }
 
    //player attack
    //create new hitbox
    create_hitbox(){
        //this.hitbox = this.add.rectangle(200, 1400, 100, 80, 0xffffff, 0).setOrigin(0, 0);
        this.hitbox = this.add.sprite(200, 1400, 'hitbox').setOrigin(0, 0);
        this.physics.add.existing(this.hitbox);
        this.physics.world.remove(this.hitbox.body);
    }

    hitbox_set(){
        if(Phaser.Input.Keyboard.JustDown(keyX) && this.character.swing == false){
            this.sound.play('attack');
            this.hitbox.alpha = 1;

            if (this.character.flipX == false){
                this.hitbox.anims.play('character_attack');
                this.hitbox.x = this.character.x + this.character.width;
                this.hitbox.y = this.character.y;
                this.physics.world.add(this.hitbox.body);
                //this.physics.add.collider(this.hitbox.body);
                this.character.swing = true;

                this.time.addEvent({
                    delay: 300,
                    callback: this.hitbox_reset,
                    callbackScope: this,
                    loop: false
                });
            }else{
                this.hitbox.anims.play('character_attack_left');
                this.hitbox.x = this.character.x - this.hitbox.width;
                this.hitbox.y = this.character.y;
                this.physics.world.add(this.hitbox.body);
                //this.physics.add.collider(this.hitbox.body);
                this.character.swing = true;

                this.time.addEvent({
                    delay: 300,
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
        //this.hitbox.alpha = 0;
        this.character.swing = false;
    }
    
    ntr_damage(enemy){
        this.sound.play('ntr_hurt');
        //console.log('enemy_damage');
        //enemy.anims.stop();
        enemy.hurt = 1;
        if (enemy.x - this.character.x > 0){ //the enemy is right to the player
            enemy.x += 100;
            enemy.y -= 20;
            enemy.hp -= character_attack;
        }
        else if (enemy.x - this.character.x < 0){
            enemy.x -= 100;
            enemy.y -= 20;
            enemy.hp -= character_attack;
        }
        this.time.addEvent({
            delay: 500,
            callback: ()=> {
               enemy.hurt = 0;
            },
            callbackScope: this,
            loop: false
        });
    }


    lose(){
        if (this.character.y >= 1400 ||
            this.character.hp <= 0){
                this.character.body.enable = false;
                this.character.setActive(false);
                this.character.body.destroy();
                this.sound.play('c_die');
                this.bgm.stop();
                this.time.addEvent({
                    delay: 10,
                    callback: () => {
                        this.scene.start('loseScene');
                    },
                    loop: false
                })
            }
    }
    win(){
        this.bgm.stop();
        this.scene.start('winScene');
    }
   
    
}

