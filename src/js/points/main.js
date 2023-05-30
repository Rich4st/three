/**
 * @fileoverview point material
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 5);

const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
const pointsMaterial = new THREE.PointsMaterial({
  size: 0.02,
});
const points = new THREE.Points(sphereGeometry, pointsMaterial);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);

scene.add(camera);
scene.add(points);
scene.add(axesHelper);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
