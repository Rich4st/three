/**
 * @fileoverview point light
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

const planeGeometry = new THREE.PlaneGeometry(20, 20);
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

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
pointLight.castShadow = true;

pointLight.shadow.radius = 8
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.target = sphere;
pointLight.angle = Math.PI / 4;

const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
)

smallBall.position.set(1, 1, 1);

pointLight.target = smallBall
smallBall.add(pointLight);
scene.add(smallBall);

const gui = new GUI();
gui
  .add(pointLight.position, 'x')
  .min(-10)
  .max(10)
  .step(1)
  .name('near')

gui
  .add(pointLight, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)

gui
  .add(pointLight, 'distance')
  .min(0)
  .max(100)
  .step(0.01)
  .name('far')


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

const clock = new THREE.Clock();

function animate() {
  let time = clock.getElapsedTime();
  smallBall.position.x = Math.cos(time) * 3;
  smallBall.position.z = Math.sin(time) * 3;

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
