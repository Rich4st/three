precision highp float;

uniform float uTime;

varying vec2 vUv;
varying float vElevation;

// noise from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}



void main() {
    // float barX = step(0.4, mod(vUv.x  * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));

    // float strength = barX + barY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    float strength = step(0.5, random(vUv));
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
