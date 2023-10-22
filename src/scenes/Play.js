class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield-mod', './assets/starfield-mod.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0 , endFrame: 9})
    }

    create() {
        //background
        this.starfieldMod = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield-mod').setOrigin(0, 0);

        //green banner
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //white outline
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //player
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket.alpha = 1;
        this.p2Rocket.alpha = 0;

        //spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship',0 , 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        //movements
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.win1 = false;

        //explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });

        this.scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Rocket.score, this.scoreConfig);

        this.gameOver = false;

        this.scoreConfig.fixedWidth = 0;
        
        //high score
        this.add.text(game.config.width / 2, borderUISize, 'HIGH SCORE:' + highScore, this.scoreConfig).setOrigin(0.5);

        if(!this.game.settings.duo) {
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
                this.gameOver = true;
                if (this.p1Rocket.score > highScore) { highScore = this.p1Rocket.score; };
            }, null, this);
        } else {
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                done = true;
                this.text1 = this.add.text(game.config.width/2, game.config.height/2, 'Player1 Score:'+ this.p1Rocket.score, this.scoreConfig).setOrigin(0.5);
                this.text2 = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player2 turn, press (D) to Continue', this.scoreConfig).setOrigin(0.5);
            }, null, this);
        }


        this.timer = this.add.text(game.config.width / 2 + borderUISize, borderUISize + borderPadding * 2,  this.remaining , this.scoreConfig);

    }

    update() {

        if (this.game.settings.duo && done && Phaser.Input.Keyboard.JustDown(keyD)) {
            //setting up game for second player/ resetting
            this.scoreLeft.text = 0;
            this.p1Rocket.alpha = 0;
            this.p2Rocket.alpha = 1;
            //reset ships position
            this.ship01.x = game.config.width + borderUISize * 6;
            this.ship02.x = game.config.width + borderUISize * 3;
            this.ship03.x = game.config.width;
            //get rid of text
            this.text1.destroy();
            this.text2.destroy();

            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'Player1 Score:' + this.p1Rocket.score + '| Player2 Score:' + this.p2Rocket.score, this.scoreConfig).setOrigin(0.5);
                if (this.p1Rocket.score > this.p2Rocket.score) {
                    this.win1 = true;
                }
                if (this.p1Rocket.score == this.p2Rocket.score) {
                    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'TIE! press (R) to Rematch', this.scoreConfig).setOrigin(0.5);
                } else {
                    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, this.win1 ? 'Player1 WINS' : 'Player2 WINS', this.scoreConfig).setOrigin(0.5);
                }
                this.gameOver = true;
                this.p1Rocket.alpha = 1;
                this.p2Rocket.alpha = 0;
                done = false;
            }, null, this);
        }

        this.timer.text = 'Time Remain:' + Math.round(this.clock.getOverallRemainingSeconds());

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.game.settings.duo = false;
            this.scene.start('menuScene');
        }

        this.starfieldMod.tilePositionX -= 4;

        if (!this.gameOver && !done) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

        } else if (!this.gameOver && done) {
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        if (!done) {
            //collisions check
            if (this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.shipExplode(this.p1Rocket, this.ship01);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
            if (this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.shipExplode(this.p1Rocket, this.ship02);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
            if (this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.shipExplode(this.p1Rocket, this.ship03);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
        }  else {
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship01);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship02);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
            if (this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship03);
                //add time when scored
                this.clock.delay = this.clock.delay + 1000;
            }
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
            return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //add score
        rocket.score += ship.points;
        this.scoreLeft.text = rocket.score;
        this.sound.play('sfx_explosion');
    }
}