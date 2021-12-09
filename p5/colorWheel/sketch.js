var value, value1, value2, value3, stepX, stepY;

function setup() {
  createCanvas(windowWidth,windowHeight);
  setupOsc(12000,3334);
  noStroke();
  //fullscreen(true);
  colorMode(HSB, width, height, 200)
  //colorMode(HSB);
  // put setup code here
}
background(color(400, map(gridY, 0, height, 255, 10)+10, 200 ));
function draw() {


  // put drawing code here
  //let value1 = 0;
  stepX = (value1*500) + 2;
  stepY = (value2 * 100) + 2;
//  background(color(400, map(gridY, 0, height, 255, 10)+10, 200 ));
  for (var gridY = 0; gridY < height + 100; gridY += stepY){
    for (var gridX = 0; gridX < width; gridX += stepX){
      var color1 = color(100, map(gridY, 0, height, 255, 10)+10, 200 );
      var color2 = color(600, map(gridY, 0, height, 255, 10)*10, 100);

      //var color1 = color((gridX/2)+(.65*width)+100, (height - gridY), map(gridY, 0, height, 100, 85));
      //fill((gridX/20)+(.575*width), (height - gridY), map(gridY, 0, height, 255, 10));
      //let interA = lerpColor(color1, color2, gridX/width);
      let interA = lerpColor(color1, color2, gridX/windowWidth);
      fill(interA);
      rect(gridX, gridY+(sin(frameCount/10)*20), noise((gridX+gridY)*value3*.1)*stepX, stepY);
    }
  }
  //background(50, 0, value1*255);  // test OSC
}

function receiveOsc(address, value) {
	//console.log("received OSC: " + address + ", " + value);
    value1 = value[0];
    value2 = value[1];
    value3 = value[2];
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
