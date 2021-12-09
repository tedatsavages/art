
// Example Pixel Shader

// uniform float exampleUniform;
uniform vec4 radius;

vec4 color;

out vec4 fragColor;
void main()
{
	// vec4 color = texture(sTD2DInputs[0], vUV.st);
  vec2 uv = vUV.st * 2.0 - 1.0; //center the coordinate space

  uv *= 2;  // zoom
  uv.x += 1; // offset x
  uv.y += -.25; //offsetY
  float dist = distance(uv, vec2(0,0));
  float stepDist = step(radius.x, 1.0-dist);
  float smoothDist = smoothstep(radius.x - 0.01, radius.x + 0.01, 1-dist);
  float innerCircle = smoothstep((radius.x * radius.y) - 0.01, (radius.x * radius.y) + 0.01, 1.0 - dist);

  vec2 distSquare = abs(uv);
  float square = max(distSquare.x, distSquare.y);

  color.a = 1.0;
  color.r = dist;
  color.b = step(0.5,1.0-square);
  color.g = innerCircle-smoothDist;
	fragColor = TDOutputSwizzle(color);
}
