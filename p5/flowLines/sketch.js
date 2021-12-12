var value, value1, b, bounds_negX, bounds_posX, bounds_negY, bounds_posY, numCols, numRows;

var grid = [];
var griduv = [];
var index = 0;
function setup() {
  createCanvas(windowWidth,windowHeight);
  setupOsc(11000,3334);

}



// put setup code here

//initialize flow lines


function draw() {
  if (frameCount=1){
    initGrid();
  }
  console.log(str(bounds_posY));
  console.log(str(bounds_posX));
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
  resolution = int(width * 0.01);
  numCols = (bounds_posX - bounds_negX) / resolution;
  numRows = (bounds_posY - bounds_negY) / resolution;
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++) {
      grid[index] = Math.PI/2;
      griduv[index]=createVector(j,i);
    }
  }
  return bounds_posY, bounds_negY, bounds_posX, bounds_negX;
}

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
