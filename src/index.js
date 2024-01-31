import Phaser from 'phaser';
import { generateFirst } from './generate';

const gameState = {};
let count = 0;
const firstBatch = {};
const secondBatch = {};
firstBatch.firstArray = [];
firstBatch.secondArray = [];
firstBatch.thirdArray = [];
firstBatch.fourthArray = [];
secondBatch.firstArray = [];
secondBatch.secondArray = [];
secondBatch.thirdArray = [];
secondBatch.fourthArray = [];
firstBatch.firstActive = true;
firstBatch.secondActive = false;
firstBatch.thirdActive = false;
firstBatch.fourthActive = false;
secondBatch.firstActive = false;
secondBatch.secondActive = false;
secondBatch.thirdActive = false;
secondBatch.fourthActive = false;
firstBatch.firstFlag = true;
firstBatch.secondFlag = false;
firstBatch.thirdFlag = false;
firstBatch.fourthFlag = false;
secondBatch.firstFlag = false;
secondBatch.secondFlag = false;
secondBatch.thirdFlag = false;
secondBatch.fourthFlag = false;
let batchFlag = true;
const ROTATE_NEG = -0.005;
const ROTATE_POS = 0.005;

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
    const some_function = (e) => {
      console.log(e.detail);
    };
    window.addEventListener('dialog', some_function);

    // for (let i = 0; i < 100; i++) {
    //   for (let j = 0; j < 100; j++) {
    //     this.add.rectangle(i*100, j*100, 20, 20, 0x000000);
    //     // this.add.curve()
    //   }
    // }
    
    gameState.car = this.matter.add.rectangle(700, 0, 40, 20, { frictionAir: 0.01, friction: 0, chamfer: 2, collisionFilter: 0 });

    var carGraphics = this.add.graphics();
    carGraphics.fillStyle(0xFFFFFF, 1);
    carGraphics.fillRoundedRect(-20, -10, 40, 20, 5);
    this.matter.add.gameObject(carGraphics, gameState.car, true).setDepth(1);


    // const curve = new Phaser.Curves.Spline([
    //   0, 0,
    //   200, 0,
    //   300, 500,
    //   450, 700,
    //   600, 900,
    //   300, 1100,
    //   900, 1300
    // ]);
    // let gen = new Phaser.Curves.Spline([
    //   300, 700,
    //   700, 700
    // ]);

    // const genPoints = gen.getDistancePoints(15);

    // for (let l = 0; l < genPoints.length; l++) {
    //   // var kDistanceRatio = k*15/curveLength;
    //   this.matter.add.gameObject(this.add.circle(genPoints[l].x, genPoints[l].y, 80, 0x000000), this.matter.add.circle(genPoints[l].x, genPoints[l].y, 80, {isStatic: true}), true);
    // }

    // console.log(generate(0,0));
    const curve = new Phaser.Curves.Spline(generateFirst(700,0));


    const curveLength = curve.getLength();
    const curvePoints = curve.getDistancePoints(15);


    for (let k = 0; k < curvePoints.length; k++) {
      let oneQuarter = curvePoints.length/4;
      if (k < oneQuarter) {
        firstBatch.firstArray.push(this.matter.add.gameObject(this.add.circle(curvePoints[k].x, curvePoints[k].y, 80, 0x000000), this.matter.add.circle(curvePoints[k].x, curvePoints[k].y, 80, {isStatic: true}), true));
      } else if (k < oneQuarter * 2) {
        firstBatch.secondArray.push(this.matter.add.gameObject(this.add.circle(curvePoints[k].x, curvePoints[k].y, 80, 0x008000), this.matter.add.circle(curvePoints[k].x, curvePoints[k].y, 80, {isStatic: true}), true));
      } else if (k < oneQuarter * 3) {
        firstBatch.thirdArray.push(this.matter.add.gameObject(this.add.circle(curvePoints[k].x, curvePoints[k].y, 80, 0xFF0000), this.matter.add.circle(curvePoints[k].x, curvePoints[k].y, 80, {isStatic: true}), true));
      } else {
        firstBatch.fourthArray.push(this.matter.add.gameObject(this.add.circle(curvePoints[k].x, curvePoints[k].y, 80, 0x0000FF), this.matter.add.circle(curvePoints[k].x, curvePoints[k].y, 80, {isStatic: true}), true));
      }
    }




    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(gameState.car.gameObject, true);
    this.cameras.main.setOrigin(0.5, 0.7);

  }

  update ()
  {
    // console.log(Math.floor(Math.random() * (400 - -400 + 1) + -400))
    // if (!this.matter.overlap(gameState.car)) {
    //   console.log('not over' + count);
    // }
    if (firstBatch.firstActive && this.matter.overlap(gameState.car, firstBatch.firstArray)) {
      if (firstBatch.firstFlag) {
        firstBatch.firstFlag = false;
        firstBatch.secondFlag = true;
        firstBatch.secondActive = true;
        secondBatch.thirdActive = false;
      }
    } else if (firstBatch.secondActive && this.matter.overlap(gameState.car, firstBatch.secondArray)) {
      if (firstBatch.secondFlag) {
        firstBatch.secondFlag = false;
        firstBatch.thirdFlag = true;
        firstBatch.thirdActive = true;
        secondBatch.fourthActive = false;
      }
    } else if (firstBatch.thirdActive && this.matter.overlap(gameState.car, firstBatch.thirdArray)) {
      if (firstBatch.thirdFlag) {
        firstBatch.thirdFlag = false;
        firstBatch.fourthFlag = true;
        firstBatch.fourthActive = true;
        firstBatch.firstActive = false;
        //add the generate handler function
      }
    } else if (firstBatch.fourthActive && this.matter.overlap(gameState.car, firstBatch.fourthArray)) {
      if (firstBatch.fourthFlag) {
        firstBatch.fourthFlag = false;
        secondBatch.firstFlag = true;
        secondBatch.firstActive = true;
        firstBatch.secondActive = false;
      }
    } else if (secondBatch.firstActive && this.matter.overlap(gameState.car, secondBatch.firstArray)) {
      if (secondBatch.firstFlag) {
        secondBatch.firstFlag = false;
        secondBatch.secondFlag = true;
        secondBatch.secondActive = true;
        firstBatch.thirdActive = false;
      }
    } else if (secondBatch.secondActive && this.matter.overlap(gameState.car, secondBatch.firstArray)) {
      if (secondBatch.secondFlag) {
        secondBatch.secondFlag = false;
        secondBatch.thirdFlag = true;
        secondBatch.thirdActive = true;
        firstBatch.fourthActive = false;
      }
    } else if (secondBatch.thirdActive && this.matter.overlap(gameState.car, secondBatch.firstArray)) {
      if (secondBatch.thirdFlag) {
        secondBatch.thirdFlag = false;
        secondBatch.fourthFlag = true;
        secondBatch.fourthActive = true;
        secondBatch.firstActive = false;
      }
    } else if (secondBatch.fourthActive && this.matter.overlap(gameState.car, secondBatch.fourthArray)) {
      if (secondBatch.fourthFlag) {
        secondBatch.fourthFlag = false;
        firstBatch.firstFlag = true;
        firstBatch.firstActive = true;
        secondBatch.secondActive = false;
      }
    } else {
      console.log('not over' + count);
    }

    // console.log(gameState.car.position)
    if (count === 500) {
      const customEvent = new CustomEvent('start');
      window.dispatchEvent(customEvent);


      // curvey = new Phaser.Curves.Spline([
      //   900, 1300,
      //   1000, 2000,
      //   900, 2500,
      //   2000, 2600
      // ]);

      // const curveLength = curvey.getLength();
      // const curvePoints = curvey.getDistancePoints(15);

      // for (let k = 0; k < curvePoints.length; k++) {
      //   // var kDistanceRatio = k*15/curveLength;
      //   var circle = this.matter.add.circle(curvePoints[k].x, curvePoints[k].y, 100, {isStatic: true, chamfer: 20, collisionFilter: 0});
      //   this.matter.add.gameObject(this.add.circle(curvePoints[k].x, curvePoints[k].y, 100, 0x000000), circle, true);
      // }
    }
    if (count === 600) {
      // gameState.firstBatch.forEach(element => {
      //   element.destroy();
      // });
      // gameState.firstBatch = [];



    }



    count++;

    const velocityAngle = Math.atan2(gameState.car.velocity.y, gameState.car.velocity.x);

    if (gameState.car.velocity.y === 0 && gameState.car.velocity.x === 0) {
      this.cameras.main.setRotation(-1*(gameState.car.angle+Math.PI/2));
    } else {
      this.cameras.main.setRotation(-1*(velocityAngle+Math.PI/2));
    }

    if (gameState.cursors.up.isDown) {
      Phaser.Physics.Matter.Matter.Body.applyForce(gameState.car, gameState.car.position, {x: Math.cos(gameState.car.angle)/3000, y: Math.sin(gameState.car.angle)/3000});
    } else if (gameState.car.speed < 0.5) {
      Phaser.Physics.Matter.Matter.Body.setSpeed(gameState.car, 0);
    }

    if (gameState.cursors.down.isDown) {
      if (gameState.car.speed !== 0) {
        Phaser.Physics.Matter.Matter.Body.setSpeed(gameState.car, gameState.car.speed*0.984);
      }
    }
    if (gameState.cursors.left.isDown && gameState.cursors.right.isDown) {
      // nothing
    } else if (gameState.cursors.left.isDown && gameState.car.speed !== 0) {
      if (gameState.car.speed > 1.5 &&gameState.car.speed < 6 && gameState.cursors.up.isDown) {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, -0.025);
        if (canRotateVelocity(velocityAngle, false)) {
          var cos = Math.cos(ROTATE_NEG), sin = Math.sin(ROTATE_NEG);
          Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y});
        }
      } else {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, -0.02);
        if (canRotateVelocity(velocityAngle, false)) {
          var cos = Math.cos(ROTATE_NEG), sin = Math.sin(ROTATE_NEG);
          Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y});
        }
      }
    } else if (gameState.cursors.right.isDown && gameState.car.speed !== 0) {
      if (gameState.car.speed > 1.5 &&gameState.car.speed < 6 && gameState.cursors.up.isDown) {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, 0.025);
        if (canRotateVelocity(velocityAngle, true)) {
          var cos = Math.cos(ROTATE_POS), sin = Math.sin(ROTATE_POS);
          Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y});
        }
      } else {
        Phaser.Physics.Matter.Matter.Body.rotate(gameState.car, 0.02);
        if (canRotateVelocity(velocityAngle, true)) {
          var cos = Math.cos(ROTATE_POS), sin = Math.sin(ROTATE_POS);
          Phaser.Physics.Matter.Matter.Body.setVelocity(gameState.car, {x: cos * gameState.car.velocity.x - sin * gameState.car.velocity.y, y: sin * gameState.car.velocity.x + cos * gameState.car.velocity.y});
        }
      }
    }
  }
}

// function rotateVelocity (body, angle) {
//   var cos = Math.cos(angle), sin = Math.sin(angle);
//   Phaser.Physics.Matter.Matter.Body.setVelocity(body, {x: cos * body.velocity.x - sin * body.velocity.y, y: sin * body.x + cos * body.velocity.y});
// }
const canRotateVelocity = (velAngle, right) => {
  let endZone;
  let carAngle = convertAngle(gameState.car.angle);
  if (right) {
    endZone = convertAngle(velAngle + (Math.PI/2));
    if (endZone > velAngle) {
      if (carAngle < velAngle) {
        return false;
      } else {
        if (carAngle < endZone) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (carAngle > velAngle) {
        return true;
      } else {
        if (carAngle < endZone) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    endZone = convertAngle(velAngle - (Math.PI/2));
    if (velAngle > endZone) {
      if (carAngle < endZone) {
        return false;
      } else {
        if (carAngle < velAngle) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (carAngle > endZone) {
        return true;
      } else {
        if (carAngle < velAngle) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}

const convertAngle = (angle) => {
  if (angle > 0) {
    return angle % (2*Math.PI);
  } else {
    return (angle % (2*Math.PI)) + (2*Math.PI);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 540,
  height: 960,
  backgroundColor: '#E3E3E3',
  physics: {
    default: 'matter',
    matter: {
        gravity: {
            y: 0,
            x: 0
        },
        debug: false
    }
  },
  scene: MyGame
};

const game = new Phaser.Game(config);


// debug: {
//   showVelocity: false
// },
// debugBodyColor: 0xffffff