
// Example Pixel Shader

// uniform float exampleUniform;
uniform vec4 freq;
uniform vec4 offset1;
uniform vec4 offset2;
uniform vec4 offset3;
uniform vec4 time;
uniform vec2 iRes;
//uniform TDTexInfo uTDOutputInfo;

//float u_resolution = uTD3DInfos[0];
const float PI = 3.1415926535;

/*Prepare a funtion to draw a polygon at pos p with radius r and sides s*/
float polygonShape(vec2 p, float r, float s){
  p = p * 2.0 - 1.0; //center P over center of draw area
  float angle = atan(p.x, p.y);
  float slice = PI * 2.0 / s;

  return step(r, cos(floor(0.5 + angle / slice) * slice - angle) * length(p));
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

out vec4 fragColor;
void main()
{
	// vec4 color = texture(sTD2DInputs[0], vUV.st);

  vec2 uv = vUV.xy * 2.0 - 1.0;

  uv = rotate(cos(vec2(uv.x, uv.y*3)*1), radians(30));
  vec2 position = vec2(gl_FragCoord.x / iRes.x, gl_FragCoord.y / iRes.y);
  float polygon = clamp(polygonShape(position, .5, 6), .65, 1.0);

  float noise1 = TDSimplexNoise( vec3((uv.x + offset1.x) * freq.x, (uv.y + offset1.y) * freq.y, (offset1.z) * freq.z + time.x));
  float noise2 = TDSimplexNoise( vec3((uv.x + offset2.x) * freq.x, (uv.y + offset2.y) * freq.y, (offset2.z) * freq.z + time.x + time.y));
  float noise3 = TDSimplexNoise( vec3((uv.x + offset3.x) * freq.x, (uv.y + offset3.y) * freq.y, (offset3.z) * freq.z + time.x - time.z));

  vec4 color = TDDither(vec4(noise1,noise2,noise3,1.0) * polygon);

  fragColor = TDOutputSwizzle(color);
}
