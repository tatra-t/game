import{addLocalStorageMax} from './localStorage.js';

export class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }
  
    create() {
      
      this.add.text(100, 100, "START", {
        fontSize: 36,
        color: "#fff"
      });
  
      this.input.on("pointerdown", (pointer) => {
        this.scene.start("Game");
      });
      addLocalStorageMax();
    }

  }