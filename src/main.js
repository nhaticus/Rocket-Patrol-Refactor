// Assigment: Rocket Patrol Mod
// Name: Nhat Thai
// Date: 10/21/2023 
/* 
    Mods list (Total Points: 5): 
    - Allow the player to control the Rocket after it's fired (1)
    - Create a new scrolling tile sprite for the background (1)
    - Display the time remaining (in seconds) on the screen (3)
*/

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3