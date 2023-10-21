/** 
 * Name: Nhat Thai
 * Title: Rocket Patrol: Better
 * Time took(hours): 4 so far
 * Mods list (Total Points: 10): 
 * - Allow the player to control the Rocket after it's fired (1)
 * - Create a new scrolling tile sprite for the background (1)
 * - Display the time remaining (in seconds) on the screen (3)
 * - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (5)
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