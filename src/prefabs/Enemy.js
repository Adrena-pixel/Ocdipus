class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'ntr', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.hp = 120;
        this.attack = 30;
    }

    update() {
        this.body.setGravityY(900);
        this.body.setCollideWorldBounds(false);
        //this.body.setCircle(50, 0, 0);
        this.body.setImmovable(true);

        if (this.hp == 0){
            this.body.enable = false;
            this.setActive(false).setVisible(false);
            this.body.destroy();
        }
        
    }

   

    
    
}