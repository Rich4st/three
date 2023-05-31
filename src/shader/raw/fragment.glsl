precision mediump float;

varying vec2 vUv;
varying float vElevation;

uniform sampler2D uTexture;

void main() {
    // vElevation + 0.05 * 10.0;
    // gl_FragColor = vec4(1.0 * vElevation, 0.0 , 0.0, 1.0);

    // 根据uv坐标获取纹理颜色
    vec4 color = texture2D(uTexture, vUv);
    // color.rgb *= vElevation;
    gl_FragColor = color;
}
