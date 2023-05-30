/**
 * @fileoverview Encapsulate the method for creating a star
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20);

camera.position.set(0, 0, 5);

const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
const pointsMaterial = new THREE.PointsMaterial({
  size: 0.02,
});
const points = new THREE.Points(sphereGeometry, pointsMaterial);

const createStar = (url = 'textures/snow_flake.png') => {
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load(url);

  const particlesGeometry = new THREE.BufferGeometry();
  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    // random hex color
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: Math.random() * 0.1 + 0.02,
    vertexColors: true,
    map: starTexture,
    transparent: true,
  })

  const points = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(points);
  return points;
}

const snowflake = createStar();
const star = createStar('textures/star_08.png');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);

scene.add(camera);
scene.add(axesHelper);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  snowflake.rotation.x = elapsedTime * 0.01;
  star.rotation.x = elapsedTime * 0.01;
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
