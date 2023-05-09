class Scene extends Phaser.Scene {
  preload() {
    this.load.image("owl", "assets/owl.png");
    this.load.image("background", "assets/gorod-demo.png");
    this.load.image("platform", "assets/ground_grass.png");
  }

  create() {
    this.add.sprite(0, 0, "background").setScale(1.2);
    //this.add.sprite(50, 50, "owl").setScale(0.4);
   // this.add.sprite(100, 100, "platform").setScale(0.2);
   const platforms = this.physics.add.staticGroup()
   for (let i=0; i<5; ++i){
    const x = Phaser.Math.Between(0, 320);
    const y = 50+100*i;
    const platform = platforms.create(x, y, 'platform');
    platform.scale = 0.2;
   }
    const player = this.physics.add.sprite(100, 0, 'owl').setScale(0.4);
    this.physics.add.collider(platforms, player);
    //player.setBounce(0.2);
    //player.setCollideWorldBounds(true);
  }

  update() {

  }

}

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: Scene,
};

const game = new Phaser.Game(config);