import {Game} from './game.js'; 
import {Menu} from './menu.js';
import {EndGameScene } from './endgame.js';


const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 500,
  backgroundColor: "172EA2",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [Menu, Game, EndGameScene],
};

const game = new Phaser.Game(config);
