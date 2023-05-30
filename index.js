class Game extends Phaser.Scene {
  // Зберігаємо платформи, гравця у this нашого класу, щоб можно було звернутися з будь-якого методу
  cursors;
  platforms;
  player;
  scoreText;
  score = 0;
  gameOver = false;

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
    this.cameras.main.setBounds(0,0,0,9900);
    this.add
    .sprite(0, 0, "background")
    .setScale(1.2)
    .setScrollFactor(1, 0);


    // Додаємо платформи
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(0, 300);
      const y = 100 * i;

      this.platforms.create(x, y, "platform");
      //const body = platform.body;
      //body.updateFromGameObject();
    }

    // Додаємо гравця
    this.player = this.physics.add
      .sprite(100, 170, "owl")
      .setScale(0.4)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    
    this.cameras.main.startFollow(this.player);
    
    // Додаємо інформацію про результат
    this.scoreText = this.add
    .text(150, 470, "score: 0", {
      fontSize: "28px",
      fill: "#fff",
    })
    .setScrollFactor(1, 0);

    // Додаємо відслідковування подій стрілочок
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.overlap(this.platforms, this.player, collectPlatforms, null, this);
   
  }

  update() {

    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } 
    
  }

 
  
}
class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    this.add.text(25, 100, "CLICK TO START", {
      fontSize: 32,
      color: "#fff"
    });

    this.input.on("pointerdown", (pointer) => {
      this.scene.start("Game");
    });
  }
}

class EndGameScene extends Phaser.Scene {
  constructor() {
    super("End");
  }

  create() {
    this.add.text(25, 100, "CLICK TO START AGAIN", {
      fontSize: 32,
      color: "#fff"
    });

    this.input.on("pointerdown", (pointer) => {
      this.scene.start("Game");
    });
  }
}
function collectPlatforms( ) {
  this.score++;
  this.scoreText.setText(`Score: ${this.score}`);
}

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 500,
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
