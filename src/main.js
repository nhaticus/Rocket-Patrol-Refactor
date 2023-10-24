/** 
 * Name: Nhat Thai
 * Title: Rocket Patrol: Better
 * Time took(hours): 9
 * Mods list (Total Points: 20): 
 * - Allow the player to control the Rocket after it's fired (1)
 * - Create a new scrolling tile sprite for the background (1)
 * - Implement the speed increase that happens after 30 seconds in the original game (1)
 * - Track a high score that persists across scenes and display it in the UI (1)
 * - Display the time remaining (in seconds) on the screen (3)
 * - Create 4 new explosion sound effects and randomize which one plays on impact (3)
 * - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (5)
 * - Implement an alternating two-player mode (5)
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

let keyD, keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let highScore = 0;
let done = false;
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3