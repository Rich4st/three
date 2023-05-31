precision mediump float;

varying vec2 vUv;
varying float vElevation;

void main() {
  vElevation + 0.5 * sin(vUv.x * 10.0) + 0.5 * cos(vUv.y * 10.0);
    gl_FragColor = vec4(1.0, 0.0 , 0.0, 1.0);
}
