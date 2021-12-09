var value, value1, offset, sum;
let noiseXSum = 0;
let noiseXSumDraw = 0;
let noiseYSum = 0;
let noiseYSumDraw = 0;
let noiseX = [];
let noiseY = [];
let noiseXAddNoise= [];
var sliceCountX = 17;



function setup() {
  createCanvas(windowWidth,windowHeight);
  setupOsc(12000,3334);
  frameRate(60);
  // put setup code here
  randomSeed(5);
}

function genNoiseX(){
  let offset = 1;
  let noiseAmp =170;
  for (let i = 0; noiseXSum < width *3; i++){
    noiseX[i] = noise(frameCount+i*offset) * noiseAmp;
    noiseXSum = noiseXSum + noiseX[i];
    //text(str(noiseXSum),20, i*12, 20, 20);
  }
  //noiseX[sliceCountX] = noise(sliceCountX + offset) * noiseAmp;
  //text(str(noiseXSum),20, (sliceCountX + 1)*12, 20, 20);
  //background(0, 0, value1*255);  // test OSC
  return noiseX;
}

function genNoiseY(){
  let offset = 3339;
  let noiseAmp = 40;
  for (let o = 0; noiseYSum < height; o++){
    noiseY[o] = noise(o+offset+(frameCount*.725)) * noiseAmp;
    noiseYSum = noiseYSum + noiseY[o];
    //text(str(noiseXSum),20, i*12, 20, 20);
  }
  //noiseX[sliceCountY] = noise(sliceCountY + offset) * noiseAmp;
  //text(str(noiseXSum),20, (sliceCountX + 1)*12, 20, 20);
  //background(0, 0, value1*255);  // test OSC
  return noiseY;
}

function addNoiseX(noiseX) {
  for (let p = 0; p < noiseX.length; p++){
    //noiseX[p] *= 1+ (map(noise(frameCount/8), 0, 1, -.5,.5)*0.01);
    noiseX[p] += sin(frameCount/36+(noiseYSumDraw/20)/2)*.55;
}
  return noiseXAddNoise;
}

//background(255);
function draw() {
  genNoiseX();
  genNoiseY();

  for (let j = 0; j < noiseY.length; j++){

    for (let i = 0; i < noiseX.length; i++){

      fill((i/noiseX.length)*(255));

      rect(noiseXSumDraw,noiseYSumDraw,noiseX[i],noiseY[j]);
      noiseXSumDraw = noiseXSumDraw + noiseX[i];

      /*
      text(str(noiseY[j]), 10, j * 10+50, 10);
      text(str(noiseY.length), 130, j * 10+50, 10);
      text(str(noiseX.length), 150, j * 10+50, 10);
      text(str(noiseYSumDraw), 180, j * 10+50, 10);
      */
      }
      addNoiseX(noiseX);
      noiseYSumDraw = noiseYSumDraw + noiseY[j];
      noiseXSumDraw = 0;
      //addNoiseX(noiseX);
    }
    //noLoop();
    noiseYSumDraw = 0;
    noiseXSumDraw = 0;
    genNoiseX();
    genNoiseY();

}




function receiveOsc(address, value) {
//	console.log("received OSC: " + address + ", " + value);
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
