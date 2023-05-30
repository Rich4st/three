/**
 * @fileoverview point material
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 5);

const params = {
  count: 200,
  size: 0.02,
  radius: 5,
  branches: 20,
  spin: 1,
  randomness: 0.1,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

const generateGalaxy = () => {
  // generate random points
  const points = [];
  for (let i = 0; i < params.count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * params.radius;
    const spinAngle = radius * params.spin;
    const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;
    const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
    const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
    points.push(
      Math.cos(angle + spinAngle + branchAngle) * radius + randomX,
      randomY,
      Math.sin(angle + spinAngle + branchAngle) * radius + randomY,
    );
  }

  // generate colors
  const colors = [];
  const inside = new THREE.Color(params.insideColor);
  const outside = new THREE.Color(params.outsideColor);
  for (let i = 0; i < params.count; i++) {
    const mixedColor = inside.clone();
    mixedColor.lerp(outside, points[i * 3 + 1] / params.radius);
    colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
  }

  // generate geometry
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // generate material
  const particlesMaterial = new THREE.PointsMaterial({
    size: params.size,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // generate points
  const pointsGeo = new THREE.Points(particlesGeometry, particlesMaterial);
  return pointsGeo;
}

const points = generateGalaxy();

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
