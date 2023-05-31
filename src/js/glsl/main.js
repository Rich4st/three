/**
 * @fileoverview cannon
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import basicVertexShader from '../../shader/basic/vertex.glsl';
import basicFragmentShader from '../../shader/basic/fragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 8);

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
})

// render a sphere by shader
const sphereGeometry = new THREE.SphereGeometry(0.5, 24, 24);
const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = - Math.PI / 2;
floor.position.set(0, -5, 0);
floor.receiveShadow = true;
scene.add(floor);

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
  const deltaTime = clock.getDelta();
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

