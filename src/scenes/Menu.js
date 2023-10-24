class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

preload() {
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion1', './assets/explosion38.wav');
    this.load.audio('sfx_explosion2', './assets/explosion-2.wav');  //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6288">Pixabay</a>
    this.load.audio('sfx_explosion3', './assets/explosion-3.wav');  //Sound Effect by <a href="https://pixabay.com/users/lordsonny-38439655/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=162883">LordSonny</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=162883">Pixabay</a>
    this.load.audio('sfx_explosion4', './assets/explosion-4.wav');  //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=45659">Pixabay</a>
    this.load.audio('sfx_explosion5', './assets/explosion-5.wav');  //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=39536">Pixabay</a>
    this.load.audio('sfx_explosion6', './assets/explosion-6.wav');  //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=102838">Pixabay</a>
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
}

    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        let menuConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width / 2, borderUISize, 'HIGH SCORE:' + highScore, menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ←→ arrows to move and (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 2 + borderPadding * 2, 'Press (D) for two player', menuConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                duo: false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                duo: false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            //easy duo mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                duo: true
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene')
        }
    }
}