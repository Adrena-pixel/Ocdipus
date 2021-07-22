//视角切换上下键
//近战（x）远程（c）
var character_hp;
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'character', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width * 0.7, this.height * 0.95);
        this.jumpSound = scene.sound.add('jump');
        this.jumpcount = 0;

        this.direction = 'left';
        this.swing = false;
        this.air_swing = false;
        this.moving = false;
        this.hit = 0;
        this.hp = 100;
        

    }

    update() {
        this.jump = false;
        this.secondjump = 2;
        this.body.setGravityY(1000);
        this.body.setCollideWorldBounds(false);

        const onFloor = this.body.onFloor();
        const onWall = this.body.onWall();


        //add animation
        if (keyLEFT.isDown && keyRIGHT.isUp && onFloor && !this.swing && this.hit == 0) {
            this.anims.play( "character_walk_right", true);
        }
        else if(keyRIGHT.isDown && keyLEFT.isUp && onFloor && !this.swing && this.hit == 0){
            this.anims.play( "character_walk_right", true);
        }
        else if (onFloor && !this.swing && this.hit == 0){
            this.anims.play( "character_stand_right", true);
        } else if (!onFloor && !this.swing && this.hit == 0){
            this.anims.play( "character_jump", true);
        }else if (onFloor && this.swing && this.hit == 0){
            this.anims.play( "c_attack", true);
        }else if (!onFloor && this.swing && this.hit == 0){
            this.anims.play( "c_airattack", true);
        }else if ( this.hit == 1){
            this.anims.play( "c_hurt", true);
        }

        
        if (Phaser.Input.Keyboard.JustDown(keyZ) && (onFloor || (onWall && this.jumpcount < this.secondjump))){
            this.jumpcount++
            this.body.velocity.y = -550;
            this.jumpSound.play();
            if(onFloor) {
                this.jumpcount = 0;
                this.air_swing = false;
            }
        }

        if (keyLEFT.isDown && keyRIGHT.isUp) {
            
            this.body.setVelocityX(-250);
            this.moving = true;
            this.flipX = true;
        } else if (keyRIGHT.isDown && keyLEFT.isUp ) {
            this.body.setVelocityX(250);
            this.moving = true;
            this.flipX = false;
        } else {
            this.moving = false;
            this.body.velocity.x = 0;
        }

        if (this.swing == true && onFloor){
            this.body.velocity.x = 0;
        }
            
        /*if (keySHIFT.isDown && keyLEFT.isDown && keyRIGHT.isUp && onFloor ) {
            this.body.setVelocityX(-300);
        } else if (keySHIFT.isDown && keyRIGHT.isDown && keyLEFT.isUp && onFloor ) {
            this.body.setVelocityX(300);
        }*/
        
        
    }
}