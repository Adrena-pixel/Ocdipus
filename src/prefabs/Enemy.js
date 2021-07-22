class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'ntr', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width * 0.8, this.height*0.9);
        this.hp = 150;
        this.attack = 30;
        this.hurt = 0;

        this.diesound = scene.sound.add('ntr_die');
    }

    update() {
        this.body.setGravityY(900);
        this.body.setCollideWorldBounds(false);
        //this.body.setCircle(50, 0, 0);
        this.body.setImmovable(true);

        if (this.hp <= 0 || this.y >= 1400){
            //this.body.setVelocityX(0);
            //let x = this.x;
            //let y = this.y
            //let s = this.add.sprite(x, y, 'ntr_die').setOrigin(0, 0);
            //this.diesound.play();
            //this.anims.play('ntr_die');
                               
            this.setActive(false).setVisible(false);
            this.body.enable = false;
            this.body.destroy();
 
        }  
        
    }
    
}