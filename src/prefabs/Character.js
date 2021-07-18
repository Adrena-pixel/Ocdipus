//视角切换上下键
//近战（x）远程（c）
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'character', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.jumpSound = scene.sound.add('jump');
        this.jump_airSound = scene.sound.add('jump_air');

    }

    update() {
        this.jump = false;
        this.secondjump = 1;
        this.jumpcount = 0;
        this.body.setGravityY(800);
        this.body.setCollideWorldBounds(false);

        const onFloor = this.body.onFloor();
        const onWall = this.body.onWall();

        if (Phaser.Input.Keyboard.JustDown(keyZ) && (onFloor || (onWall && this.jumpcount < this.secondjump))){
            this.jumpcount++
            this.body.velocity.y = -600;

            if(onFloor) {
                this.jumpcount = 0;
            }
        }

        if (keyLEFT.isDown && keyRIGHT.isUp ) {
            this.body.setVelocityX(-200);
        } else if (keyRIGHT.isDown && keyLEFT.isUp ) {
            this.body.setVelocityX(200);
        } else {
            this.body.velocity.x = 0;
        }

        if (keySHIFT.isDown && keyLEFT.isDown && keyRIGHT.isUp && onFloor ) {
            this.body.setVelocityX(-250);
        } else if (keySHIFT.isDown && keyRIGHT.isDown && keyLEFT.isUp && onFloor ) {
            this.body.setVelocityX(250);
        }

        //wall jump
        /*if (this.body.onWall() && this.body.blocked.left && this.jumpcount < this.secondjump){
            if (keyLEFT.isDown && Phaser.Input.Keyboard.JustDown(keyZ)){
                this.body.setGravityY(-800);
                this.body.setVelocityX(550);
                this.jumpcount++;     
            }
            
        }
        if (onFloor) {
            this.jumpcount = 0;
        }*/
        
    }
}