var value, value1, b, bounds_negX, bounds_posX, bounds_negY, bounds_posY, numCols, numRows, index, stepSizeX, stepSizeY, initX, initY, drawX, drawY, attribScale, attribQuant;

var grid = [];
var griduv = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  //setupOsc(11000,3334);
  smooth();
  strokeWeight(4);
  stroke(4);
  initGrid();

}



// put setup code here

//initialize flow lines


function draw() {
  /*
  DEBUG TO CONSOLE
  console.log(str(bounds_posY));
  console.log(str(bounds_posX));
  mousePX = mouseX;
  console.log(griduv[int((mousePX/width)*width)]);
*/

  background(64);
  //advectGrid(grid, griduv);
  index = 0;
  vizGrid(grid);
  stepSizeX = 15;
  stepSizeY = 15;
  initX = 800;
  initY = 400;
  drawX = 0;
  drawY = 0;
  noFill();

  beginShape();
  curveVertex(initX, initY);
  for (let i = 0; i < 128; i++){
    let x = drawX;
    let y = drawY;
    xOffset = x - bounds_negX;
    yOffset = y - bounds_negY;
    colIndex = int(xOffset/resolution);
    rowIndex = int(yOffset/resolution);
    gridAngle = griduv[colIndex][rowIndex];
    let xStep = stepSizeX * (sin(gridAngle) *1);
    let yStep = stepSizeY * (cos(gridAngle) *1);
    console.log(xStep, yStep, initY);
    let x2 = x + xStep;
    let y2 = y + yStep;
    stroke(128);
    //line(x+initX, y+initY, x2+initX, y2+initY);
    curveVertex(x2+initX, y2+initY);
    drawX =  x2;
    drawY =  y2;
  }
  //initX = mouseX;
  //initY = mouseY;
  endShape();

}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('good', 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
  value1 = value[1];
}

function initGrid() {
  bounds_negX = int(width * -0.5);
  bounds_posX = int(width * 1.5);
  bounds_negY = int(height * -0.5);
  bounds_posY = int(height * 1.5);
  resolution = int(width * .0175);
  numCols = (bounds_posX - bounds_negX) / resolution;
  numRows = (bounds_posY - bounds_negY) / resolution;
  index = 0;
  attribScale = 1;
  attribQuant = PI/6;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      noiseSeed(98);
      griduv[index] = [];
      //griduv[index]=createVector(j,i);
      noiseDetail(1,0.2);
      griduv[i][j]=(noise((j+1900)*0.15, (i)*0.15)*8);
      griduv[i][j]/=attribQuant;
      grid[index] = noise((j)*(resolution/1060), (i)*(resolution/1060))*4;
      index++;

    }
  }
  return bounds_posY, bounds_negY, bounds_posX, bounds_negX, grid, griduv, numRows, numCols, resolution, attribScale, attribQuant;
}

function advectGrid(grid, griduv) {
  randomSeed(8);
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
    noiseDetail(1,0.2);
    grid[index]+=((map(sin(((frameCount+120)*.075)), -1, 1, -0.5,.5))*.005*(index/numCols*numRows*.01))%2;
    //griduv[i][j] += noise((frameCount/16)+griduv[i][j], (frameCount*.5)*(resolution/360))*.01;
    griduv[i][j]=(noise((j)*0.05, (i+frameCount*.1)*0.05,(i)*0.05)*4);
    griduv[i][j]/=attribQuant;
    index++;
    }
  }
    return grid;

}

function vizGrid(grid) {
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      push();
        translate(j*resolution,i*resolution);
        rotate(griduv[i][j] - (PI/2));
        stroke(255,0,0,35);
        line(0,0,0,15);
        stroke(255,255,0,35);
        line(-15, 0, 0, 15);
        index++;
      pop();
    }
  }
  /*
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      push();

        translate(j*resolution,i*resolution);
        rotate(griduv[i][j]);
        stroke(0,griduv[i][j]*100,0,65);
        line(3,3,3,-64);
        index++;
      pop();
    }
  }
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      push();

        translate(j*resolution,i*resolution);
        rotate(griduv[i][j]);
        stroke(0,0,griduv[i][j]*100,65);
        line(5,5,5,-36);
        index++;
      pop();
    }
  }
  return grid; */
}
/*
function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
  var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
*/
