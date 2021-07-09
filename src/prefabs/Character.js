//视角切换上下键
//近战（x）远程（c）
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'character', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        this.jump = false;
        this.secondjump = 1;
        this.body.setGravityY(250);
        this.body.setCollideWorldBounds(true);

        const onFloor = this.body.onFloor();

        if (Phaser.Input.Keyboard.JustDown(keyZ) && (onFloor || this.jumpcount < this.secondjump)) {
            this.body.velocity.y = -150;
            this.jumpcount++;
            if (onFloor) {
                this.jumpcount = 0;
            }
        }

        if (keyLEFT.isDown && keyRIGHT.isUp) {
            this.body.setVelocityX(-75);
        } else if (keyRIGHT.isDown && keyLEFT.isUp) {
            this.body.setVelocityX(75);
        } else {
            this.body.velocity.x = 0;
        }

        if (keySHIFT.isDown && keyLEFT.isDown && keyRIGHT.isUp) {
            this.body.setVelocityX(-150);
        } else if (keySHIFT.isDown && keyRIGHT.isDown && keyLEFT.isUp) {
            this.body.setVelocityX(150);
        }


    }
}