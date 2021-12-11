var value, value1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  setupOsc(12000,3334);
  // put setup code here
}

function draw() {
  // put drawing code here
  background(0, 0, value1*255);  // test OSC
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
    value1 = value[0];


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
