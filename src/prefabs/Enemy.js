class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'enemy', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        this.body.setGravityY(250);
        this.body.setCollideWorldBounds(true);
    }
}