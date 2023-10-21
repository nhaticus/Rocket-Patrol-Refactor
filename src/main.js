// Assigment: Rocket Patrol Mod
// Name: Nhat Thai
// Date: 10/21/2023 
/* 
    Mods list: Allow the player to control the Rocket after it's fired (1)
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3