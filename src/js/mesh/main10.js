/**
 * @fileoverview light and shoadow
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 5, 5);
scene.add(camera);

const geometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(geometry, material);
// 3. geometry castShadow
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(8, 8);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 'skyblue',
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 4. geometry receiveShadow
plane.receiveShadow = true;
plane.rotation.x = Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

camera.position.set(0, 0, 5);
scene.add(camera);

const light = new THREE.AmbientLight('#ffffff', 0.2);
scene.add(light)
const directionLight = new THREE.DirectionalLight('#ffffff', 1);
directionLight.position.set(5, 5, 5);
// 2. add shadow
directionLight.castShadow = true;
directionLight.shadow.radius = 8
directionLight.shadow.mapSize.set(1024, 1024);

// set direction light shadow camera
directionLight.shadow.camera.near = 0.1;
directionLight.shadow.camera.far = 100;
directionLight.shadow.camera.left = -10;
directionLight.shadow.camera.right = 10;
directionLight.shadow.camera.top = 10;
directionLight.shadow.camera.bottom = -10;

scene.add(directionLight);

const gui = new GUI();
gui
  .add(directionLight.shadow.camera, 'near')
  .min(0.1)
  .max(10)
  .step(0.1)
  .onChange(() => {
    directionLight.shadow.camera.updateProjectionMatrix();
  })
  .name('near')

const renderer = new THREE.WebGLRenderer();
// 1. enable shadowMap
renderer.shadowMap.enabled = true;
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
