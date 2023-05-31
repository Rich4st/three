/**
 * @fileoverview cannon
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import basicVertexShader from '../../shader/raw/vertex.glsl';
import basicFragmentShader from '../../shader/raw/fragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 8);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/assets/texture.jpg');

// 创建着色器材质
const shaderMaterial = new THREE.RawShaderMaterial({
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
  // wireframe: true,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0,
    },
    uTexture: {
      value: normalTexture,
    }
  }
})

// render a sphere by shader
const sphereGeometry = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3, 20, 20),
  shaderMaterial
)
scene.add(sphereGeometry);

const light = new THREE.AmbientLight(0xffffff, 0.5);
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.castShadow = true;
scene.add(light)
scene.add(directionLight);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

scene.add(axesHelper);
scene.add(camera);


function animate() {
  const elapsedTime = clock.getElapsedTime();
  shaderMaterial.uniforms.uTime.value = elapsedTime;
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

