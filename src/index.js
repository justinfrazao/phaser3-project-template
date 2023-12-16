import Phaser from 'phaser';

const gameState = {};

var isLoose = false;
var leftCount = 0;
var rightCount = 0;

class MyGame extends Phaser.Scene
{
  constructor ()
  {
    super();
  }
  preload ()
  {

  }
    
  create ()
  {
    gameState.ref = this.add.rectangle(290, 110, 25, 50, 0x000000);

    gameState.car = this.matter.add.rectangle(390, 210, 40, 20, { frictionAir: 0.01, friction: 0, chamfer: 2 });
    // Phaser.Physics.Matter.Matter.Body.setInertia(gameState.car, 500);

    var carGraphics = this.add.graphics();
    carGraphics.fillStyle(0x000000, 1);
    carGraphics.fillRoundedRect(-20, -10, 40, 20, 5);
    this.matter.add.gameObject(carGraphics, gameState.car, true);


    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(gameState.car.gameObject, true);
    this.cameras.main.setOrigin(0.5, 0.75);
  }

  update ()
  {
    
    // this.cameras.main.setRotation(-1*(gameState.car.angle+Math.PI/2));
    if (gameState.car.velocity.y === 0 && gameState.car.velocity.x === 0) {
      this.cameras.main.setRotation(-1*(gameState.car.angle+Math.PI/2));
    } else {
      this.cameras.main.setRotation(-1*(Math.atan2(gameState.car.velocity.y, gameState.car.velocity.x)+Math.PI/2));
    }

    // console.log(gameState.car.speed)
    if (gameState.cursors.up.isDown) {
      // console.log(gameState.car)
      // console.log(Math.sqrt(gameState.car.velocity.x * gameState.car.velocity.x + gameState.car.velocity.y * gameState.car.velocity.y))
      Phaser.Physics.Matter.Matter.Body.applyForce(gameState.car, gameState.car.position, {x: Math.cos(gameState.car.angle)/3000, y: Math.sin(gameState.car.angle)/3000});
      // console.log(gameState.car)
    } else if (gameState.car.speed < 0.5) {
      Phaser.Physics.Matter.Matter.Body.setSpeed(gameState.car, 0);
    }

    if (gameState.cursors.down.isDown) {
      // console.log(gameState.car)
      // console.log(Math.sqrt(gameState.car.velocity.x * gameState.car.velocity.x + gameState.car.velocity.y * gameState.car.velocity.y))
      if (gameState.car.speed !== 0) {
        Phaser.Physics.Matter.Matter.Body.setSpeed(gameState.car, gameState.car.speed*0.97);
      }
    }
    if (gameState.cursors.left.isDown && gameState.cursors.right.isDown) {
      leftCount = 0;
      rightCount = 0;
    } else if (gameState.cursors.left.isDown && gameState.car.speed !== 0) {
      rightCount = 0;
      leftCount++;
      if (isLoose) {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, -0.02);
      } else {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, -0.02);
        var cos = Math.cos(-0.02), sin = Math.sin(-0.02);
        Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y})
      }
    } else if (gameState.cursors.right.isDown && gameState.car.speed !== 0) {
      leftCount = 0;
      rightCount++;
      if (isLoose) {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, 0.02);
      } else {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, 0.02);
        var cos = Math.cos(0.02), sin = Math.sin(0.02);
        Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y});
      }
    } else {
      leftCount = 0;
      rightCount = 0;
    }

    if (leftCount > 40 || rightCount > 40) isLoose = true;
    
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 540,
  height: 960,
  backgroundColor: '#0c9fc7',
  physics: {
    default: 'matter',
    matter: {
        gravity: {
            y: 0,
            x: 0
        },
        debug: {
          showVelocity: true
        },
        debugBodyColor: 0xffffff
    }
  },
  scene: MyGame
};

const game = new Phaser.Game(config);
