import {maxLocalStorage} from './localStorage.js';
export class EndGameScene extends Phaser.Scene {
    constructor() {
      super("EndGameScene");
    }
  
    create() {
      this.add.text(40, 100, "START AGAIN", {
        fontSize: 36,
        color: "#fff"
      });
      this.input.on("pointerdown", (pointer) => {
        this.scene.start("Game");
      });
      maxLocalStorage();
    }
  
  }