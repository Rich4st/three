/**
 * @fileoverview texture loader function
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 5, 5);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/metal-map.jpg');
// const roughnessTexture = new THREE.TextureLoader().load('./textures/images.jpg');

textureLoader.manager.onProgress = function (loaded, total) {
  console.log(loaded, total);
}
const geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  map: texture,
  transparent: true,
  side: THREE.DoubleSide,
  roughness: 0.5,
  // roughnessMap: roughnessTexture,
  metalness: 1
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

camera.position.set(0, 0, 5);
scene.add(camera);

// const light = new THREE.AmbientLight('#ffffff', 1);
// scene.add(light)
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加坐标轴辅助
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})
