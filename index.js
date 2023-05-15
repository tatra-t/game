class Scene extends Phaser.Scene {
  // Зберігаємо платформи, гравця у this нашого класу, щоб можно було звернутися з будь-якого методу
  cursors;
  platforms;
  player;
  scoreText;

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
    this.add.sprite(0, 0, "background").setScale(1.2);

    // Додаємо платформи
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(0, 300);
      const y = 50 + 90 * i;

      this.platforms.create(x, y, "platform");
    }

    // Додаємо гравця
    this.player = this.physics.add
      .sprite(100, 170, "owl")
      .setScale(0.4)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    //this.camera.main.startFollow(this.player);
    // Додаємо інформацію про результат
    this.scoreText = this.add.text(150, 470, "score: 0", {
      fontSize: "28px",
      fill: "#fff",
    });

    // Додаємо відслідковування подій стрілочок
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.platforms, this.player);
  }

  update() {
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
  scene: Scene,
};

const game = new Phaser.Game(config);
