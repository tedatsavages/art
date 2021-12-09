
// Example Pixel Shader

// uniform float exampleUniform;

uniform vec4 freq;
uniform vec2 t;

float pi = 3.14159;
vec4 color;

out vec4 fragColor;
void main()
{
	//vec4 color = texture(sTD2DInputs[0], vUV.st);
  vec2 uv = vUV.st;

  uv = uv * 2.0 - 1.0;

  // color is Red, Green, Blue, Alpha
  float mySine = abs(sin(((uv.x + (t.x * t.y)) * pi * freq.x)));
  float myCosine = abs(cos(uv.y * pi * freq.y));
  // vec4 color = vec4(1 - vUV.x,1 - vUV.y,1 - vUV.y, 1.0);
  color.r = 1-((mySine/pi) / 1-myCosine);
  color.g = freq.z*mySine/(myCosine*freq.a*(pi/3));
  color.b = 1 - myCosine;
  color.a = 1.0;

  //vec4 color = vec4(1-((mySine/2) / 1-myCosine), freq.z*mySine/(myCosine*freq.a), 1 - myCosine, 1.0);
  fragColor = TDOutputSwizzle(color);
}
