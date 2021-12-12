var value, value1, b, bounds_negX, bounds_posX, bounds_negY, bounds_posY, numCols, numRows, index;

var grid = [];
var griduv = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  //setupOsc(11000,3334);
  noSmooth();
  strokeWeight(4);
  randomSeed(8);
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

background(0);
advectGrid(grid, griduv);
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      push();

        translate(j*resolution,i*resolution);
        rotate(grid[index]);
        stroke(grid[index]*100,0,0,35);
        line(0,0,0,-72);
        index++;
      pop();
    }
  }
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      push();

        translate(j*resolution,i*resolution);
        rotate(grid[index]);
        stroke(0,grid[index-60]*100,0,65);
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
        rotate(grid[index]);
        stroke(0,0,grid[index-1]*100,65);
        line(5,5,5,-36);
        index++;
      pop();
    }
  }

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
  bounds_negX = int(width * 0.25);
  bounds_posX = int(width * .75);
  bounds_negY = int(height * .250);
  bounds_posY = int(height * .750);
  resolution = int(width * .0085);
  numCols = (bounds_posX - bounds_negX) / resolution;
  numRows = (bounds_posY - bounds_negY) / resolution;
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {

      griduv[index]=createVector(j,i);
      grid[index] = noise((frameCount*.1+j)*(resolution/360), (frameCount*.1+i)*(resolution/360))*4;
      index++;

    }
  }
  return bounds_posY, bounds_negY, bounds_posX, bounds_negX, grid, griduv, numRows, numCols, resolution;
}

function advectGrid(grid, griduv) {
  index = 0;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {

    grid[index]+=((map(sin(((frameCount+120)*.075)), -1, 1, -0.5,.5))*.005*(index/numCols*numRows*.01))%2;
      grid[index] += noise((frameCount/16)+griduv[index].x, (frameCount*.5)*(resolution/360))*.1;
      index++;
    }
  }
    return grid;

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
