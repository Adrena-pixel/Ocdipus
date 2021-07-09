class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super (scene, x, y, 'EnemyScene', frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    
}