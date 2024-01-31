const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateFirst = (x, y) => {
  let returnArray = [];

  returnArray.push(x);
  returnArray.push(y);

  let oldX = x + 400;
  let oldY = y;
  let newX;
  let newY;

  returnArray.push(oldX);
  returnArray.push(oldY);

  let oldDistance = Math.sqrt((oldX*oldX)+(oldY*oldY));
  let newDistance = 0;

  for (let i = 0; i < 8; i++) {
    while (newDistance < oldDistance + 50) {
      newX = oldX + (randomIntFromInterval(-3, 3)*250);
      newY = oldY + (randomIntFromInterval(-3, 3)*250);
      newDistance = Math.sqrt((newX*newX)+(newY*newY));
    }
    returnArray.push(newX);
    returnArray.push(newY);

    oldX = newX;
    oldY = newY;
    oldDistance = newDistance;
    newDistance = 0;
  }
  return returnArray;
}

export const generate = (x, y) => {
  let returnArray = [];

  let oldX = x;
  let oldY = y;
  let newX;
  let newY;

  returnArray.push(oldX);
  returnArray.push(oldY);

  let oldDistance = Math.sqrt((oldX*oldX)+(oldY*oldY));
  let newDistance = 0;

  for (let i = 0; i < 9; i++) {
    while (newDistance < oldDistance + 50) {
      newX = oldX + (randomIntFromInterval(-3, 3)*250);
      newY = oldY + (randomIntFromInterval(-3, 3)*250);
      newDistance = Math.sqrt((newX*newX)+(newY*newY));
    }
    returnArray.push(newX);
    returnArray.push(newY);

    oldX = newX;
    oldY = newY;
    oldDistance = newDistance;
    newDistance = 0;
  }
  return returnArray;
}
