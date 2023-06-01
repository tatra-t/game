class Game extends Phaser.Scene {
  // Зберігаємо платформи, гравця у this нашого класу, щоб можно було звернутися з будь-якого методу
  cursors;
  platforms;
  player;
  scoreText;
  score = 0;
  scoreMaxText;
  gameOver = false;
  scoreMax = 0;
  max=0;
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("background", "assets/gorod-demo.png");
    this.load.image("platform", "assets/ground_grass.png");

    // завантажуємо spritesheet нашого героя
    this.load.spritesheet("owl", "assets/owl.png", {
      frameWidth: 100,
      frameHeight: 170,
    });
  }

  create() {
    
    this.add
    .sprite(0, 0, "background")
    .setScale(1.2)
    .setScrollFactor(1, 0);


    // Додаємо платформи
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 7; ++i) {
      const x = Phaser.Math.Between(0, 280);
      const y = 100 * i;

      const platform=this.platforms.create(x, y, "platform");
      const body = platform.body;
      body.updateFromGameObject();
    }

    // Додаємо гравця
    this.player = this.physics.add
      .sprite(100, 170, "owl")
      .setScale(0.4)
      .setBounce(0.2)
      .setCollideWorldBounds(false);

    
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width*1.5);

    // Додаємо інформацію про результат
    this.scoreText = this.add
    .text(0, 440, "Score: 0", {
      fontSize: "28px",
      fill: "#fff"})
    .setScrollFactor(1, 0);
    this.scoreMaxText = this.add
    .text(0, 470, "Score Max: 0", {
      fontSize: "28px",
      fill: "#fff"})
    .setScrollFactor(1, 0);

    // Додаємо відслідковування подій стрілочок
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.overlap(this.platforms, this.player, this.collectPlatforms, null, this) ;
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;
  }

  update() {

    

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } 

    this.platforms.children.iterate((child) => {
      const platform = child;
      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700){
        platform.y = scrollY - Phaser.Math.Between(30, 70);
        platform.body.updateFromGameObject();
      }
    })

  this.horizontalWrap(this.player);

   const bottomPlatform = this.findBottomMostPlatform();
   if (this.player.y > bottomPlatform.y + 200) {
   this.scene.start('EndGameScene');
   }

  }
  collectPlatforms() {
   /* if (localStorage.getItem("max")) {
    this.max = localStorage.getItem("max");
    const valueMax = `Score Max: ${this.max}`;
    this.scoreMaxText.text = valueMax;
  }*/
    this.score++;
      const value = `Score: ${this.score}`;
      this.scoreText.text = value;
      localStorage.setItem('score', this.score );
    /*if (!localStorage.getItem("max")) {
      localStorage.setItem('max', this.score);
  }
      
    if (this.max<value){
      localStorage.removeItem('max');
      const maxStore = localStorage.getItem("score");
      localStorage.setItem('max', maxStore );
      this.scoreMax = localStorage.getItem("max");
      const valueMax = `Score Max: ${this.scoreMax}`;
      this.scoreMaxText.text = valueMax; 
    }*/
    
    
      
      
  } 
  horizontalWrap(sprite) { 
    const halfWidth = sprite.displayWidth;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
      } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
  }
  }
  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];
    for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i];
      if (platform.y < bottomPlatform.y) {
         continue;
      } 
      bottomPlatform = platform;
    }
    return bottomPlatform;
  }

}
  

class Menu extends Phaser.Scene {
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
  }
}

class EndGameScene extends Phaser.Scene {
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
  }
}


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
