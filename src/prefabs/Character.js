//视角切换上下键
//近战（x）远程（c）
var character_hp = 100;
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'character', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.jumpSound = scene.sound.add('jump');
        this.jump_airSound = scene.sound.add('jump_air');
        this.jumpcount = 0;

        this.direction = 'left';
        this.swing = false;
        this.moving = false;
        this.hit = 0;

    }

    update() {
        this.jump = false;
        this.secondjump = 2;
        this.body.setGravityY(800);
        this.body.setCollideWorldBounds(false);

        const onFloor = this.body.onFloor();
        const onWall = this.body.onWall();
        
        if (Phaser.Input.Keyboard.JustDown(keyZ) && (onFloor || (onWall && this.jumpcount < this.secondjump))){
            this.jumpcount++
            this.body.velocity.y = -550;

            if(onFloor) {
                this.jumpcount = 0;
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

        if (keySHIFT.isDown && keyLEFT.isDown && keyRIGHT.isUp && onFloor ) {
            this.body.setVelocityX(-350);
        } else if (keySHIFT.isDown && keyRIGHT.isDown && keyLEFT.isUp && onFloor ) {
            this.body.setVelocityX(350);
        }

        // if (this.character_hp == 0){
        //     this.body.enable = false;
        //     this.setActive(false).setVisible(false);
        //     this.body.destroy();
        //     console.log(character_hp);
        // }

    }
}