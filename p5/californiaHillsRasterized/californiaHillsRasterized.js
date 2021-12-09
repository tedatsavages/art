// all the hills above LA, forever

var col =255;
var totalLenOSC, numPiecesOSC, tMultOSC, freqOSC, freqFXOSC, freqFYOSC, noiseFreqOSC, noiseSpeedOSC, noiseSpeedFineOSC, value;


function setup() {
  createCanvas(windowWidth, windowHeight);

  setupOsc(12000, 3335);
  /*  Turn On For Sliders if no OSC is available
  totalLength = createSlider(1, windowWidth, 1200, 1);
  numPieces = createSlider(2, 128, 128, 1);
  timeMult = createSlider(1,255,16,.25);
  freq = createSlider(0,16,128,.1);
  freqFineY = createSlider(0,2,.1,.001);
  freqFineX = createSlider(0,2,.21,.001);
  noiseFreq = createSlider(0,1,.4,.001);
  totalLength.position(10,10);
  totalLength.style('width', '500px');
  numPieces.position(10,30);
  numPieces.style('width', '500px');
  timeMult.position(10,50);
  timeMult.style('width', '500px');
  freq.position(10,70);
  freq.style('width', '500px');
  freqFineY.position(10,90);
  freqFineY.style('width', '500px');
  freqFineX.position(10,110);
  freqFineX.style('width', '500px');
  noiseFreq.position(10,130);
  noiseFreq.style('width', '500px');

  */
}


function draw() {
  let totalLen = totalLenOSC * windowWidth;
  let numPiece = numPiecesOSC;
  let tMult = tMultOSC;
  let freqFY = freqFYOSC;
  let freqFX = freqFXOSC;
  //col = mouseX;
//  background(60);
  ellipse(500*value,500,200,200);
  fill(250, 118, 222, 35);
  for (let u = 0; u < 8; u++){
    let rectY = ((windowHeight/2)-32)+(u*64)-((8*64)/2);
    fill(255,255,255,255);
    stroke(255);
    rect((windowWidth/2)-(totalLen/2)-32,rectY, 100, 100);
    for(let i = 0; i < numPiece; i ++){
        stroke(0,0,0);
        let rectX = (windowWidth/2)+ ((i * totalLen/(numPiece-1)) - (totalLen/2))-32;
        let rectXDim = 64*((1-sin((frameCount + ((i+u)*475)*((freqOSC/255))*freqFX)*(tMult/255)+(90/(u+1)))*abs(noise((frameCount*(noiseSpeedOSC*noiseSpeedFineOSC))+((i+(u*64))*noiseFreqOSC))))/2);
        let rectYDim = 64*((1-cos((frameCount + ((i+u)*475)*((freqOSC/255))*freqFY)*(tMult/255)+(90/(u+1)))*abs(noise((frameCount*(noiseSpeedOSC*noiseSpeedFineOSC))+((i+(u*64))*noiseFreqOSC))))/2);
        stroke(60);
        fill(195, 118, 222, 55);
        rect(rectX,rectY, rectXDim,rectYDim);
        stroke(255);
        line((windowWidth/2)-(totalLen/2)-32, rectY, (windowWidth/2)+(totalLen/2)+32, rectY);
        fill(0);
        stroke(0);
        rect((windowWidth/2)+(totalLen/2)-64,rectY, 100, 100);
          //text(i+1,rectX,(windowHeight/2));
        }
      }
  //ellipse(100, 200, 64,64);
  //stroke(255);
  //rect(windowWidth/2-10 , windowHeight/2-10,20,20);

}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
    totalLenOSC = value[0];
    numPiecesOSC = value[1];
    tMultOSC = value[2];
    freqOSC = value[3];
    freqFXOSC = value[4];
    freqFYOSC = value[5];
    noiseFreqOSC = value[6];
    noiseSpeedOSC = value[7];
    noiseSpeedFineOSC = value[8];
    background(0, 0, value[0]*255);
	/*if (address == '/test1') {
		//x = value[1]*10;
		y = 100;
		background(0, 0, value*255);
	}*/
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
