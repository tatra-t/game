var game = new Phaser.Game(480, 320, Phaser.Canvas, null, {
    preload: preload, 
    create: create, 
    update: update
  });
  let owl;
  let background;
  let platform;

  function preload() {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('owl', 'assets/owl.png');
    game.load.image('background', 'assets/gorod-demo.png');
    game.load.image('platform', 'assets/ground_grass.png');
    
  }
  function create() {
    owl = game.add.sprite(50, 50, 'owl');
    background = game.add.sprite(0, 0, 'background');
    platform = game.add.sprite(100, 100, 'platform');
    
  }
  function update() {}