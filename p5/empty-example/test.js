var col =255;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
}


function draw() {
  let totalLen = totalLength.value();
  let numPiece = numPieces.value();
  let tMult = timeMult.value();
  let freqFY = freqFineY.value();
  let freqFX = freqFineX.value();
  //col = mouseX;
  background(60);

  fill(250, 118, 222, 35);
  for (let u = 0; u < 8; u++){
    let rectY = ((windowHeight/2)-32)+(u*64)-((8*64)/2);
    fill(255,255,255,255);
    stroke(255);
    rect((windowWidth/2)-(totalLen/2)-32,rectY, 100, 100);
    for(let i = 0; i < numPiece; i ++){
        stroke(0,0,0);
        let rectX = (windowWidth/2)+ ((i * totalLen/(numPiece-1)) - (totalLen/2))-32;
        let rectXDim = 64*((1-sin((frameCount + ((i+u)*475)*((freq.value()/255))*freqFX)*(tMult/255)+(180/(u+1)))*abs(noise((frameCount/180)+((i+(u*64))*noiseFreq.value()))))/2);
        let rectYDim = 64*((1-cos((frameCount + ((i+u)*475)*((freq.value()/255))*freqFY)*(tMult/255)+(180/(u+1)))*abs(noise((frameCount/180)+((i+(u*64))*noiseFreq.value()))))/2);
        stroke(60);
        fill(250, 118, 222, 55);
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
