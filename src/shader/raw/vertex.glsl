precision mediump float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
// time 
uniform float uTime;

varying vec2 vUv;

varying float vElevation;

void main() {
    // vUv = uv;
    // vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
    
    // modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 1.0;
    // modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;

    // vElevation = modelPosition.z;

    // gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
    // 实现旗帜随风摆动
    vUv = uv;
    vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 1.0;
    modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
    vElevation = modelPosition.z;
    gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
    
}
