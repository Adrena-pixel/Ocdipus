class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    create (){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            //backgroundColor: '#F3B141',
            color: '#fffdf9',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            //backgroundColor: '#F3B141',
            color: '#fffdf9',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }
        let cConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            //backgroundColor: '#F3B141',
            color: '#ffd544',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }

        
        this.add.image(350, 50, 'title').setOrigin(0, 0);
        
        this.add.text(350, 250, 'press z to start', menuConfig).setOrigin(0, 0);

        this.add.text(350, 350, 'press z: jump', textConfig).setOrigin(0, 0);
        this.add.text(350, 400, 'press left/right arrow: move', textConfig).setOrigin(0, 0);
        this.add.text(350, 450, 'press z while on wall: wall jump (maximum 3 times)', textConfig).setOrigin(0, 0);
        this.add.text(350, 500, 'press x to attack', textConfig).setOrigin(0, 0);

        this.add.text(350, 650, 'Turtle Head presents', cConfig).setOrigin(0, 0);


        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
    }
    update (){
        if (Phaser.Input.Keyboard.JustDown(keyZ)) {
            // possible game settings
            //game.settings = {
              //spaceshipSpeed: 3,
              //gameTimer: 60000    
            //}
            //this.sound.play('start');
            this.scene.start('playScene');    
          }
    }
}