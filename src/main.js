let config = {
    type: Phaser.AUTO,
    height: 730,
    width: 1300,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Menu,  Play, Lose, Win]
}
var game = new Phaser.Game(config);
//set keys
let keySHIFT, keyLEFT, keyRIGHT, keyZ, keyX, keyDOWN;