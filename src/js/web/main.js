import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 8);

const sphereGeometry = new THREE.SphereGeometry(2.8, 24, 24);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, -0.2, 2);

const triangleGroup = new THREE.Group();
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    vertices[j] = Math.random() * 10 - 5;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const material = new THREE.MeshBasicMaterial({
    color,
    opacity: Math.random(),
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  triangleGroup.add(mesh);
}

triangleGroup.position.set(0, -30, -1);
scene.add(triangleGroup);

const smallBallGroup = new THREE.Group();
const smallSphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const smallSphereMaterial = new THREE.MeshStandardMaterial()
const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
smallSphere.castShadow = true;
smallBallGroup.add(smallSphere);

const plane = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 'skyblue',
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = - Math.PI / 2;
planeMesh.position.set(0, -1, 0);

smallBallGroup.position.set(0, -60, 0);
smallBallGroup.add(planeMesh);

const light = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
pointLight.castShadow = true;
pointLight.target = smallSphere;
pointLight.shadow.radius = 8;
pointLight.angle = Math.PI / 4;
pointLight.shadow.mapSize.set(1024, 1024);

const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
)

smallBall.position.set(1, 1, 1);

smallBall.add(pointLight);
smallBallGroup.add(light);
smallBallGroup.add(smallBall);

scene.add(smallBallGroup);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const clock = new THREE.Clock();

scene.add(camera);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  camera.position.y = - (window.scrollY / window.innerHeight) * 30
  sphere.rotation.x = elapsedTime * 0.1;
  sphere.rotation.y = elapsedTime * 0.1;

  smallBall.position.x = Math.cos(elapsedTime) * 3;
  smallBall.position.z = Math.sin(elapsedTime) * 3;

  triangleGroup.rotation.x = elapsedTime * 0.1;
  renderer.render(scene, camera);
}
animate();

let currentPage = 0;

window.addEventListener('scroll', () => {
  const newPage = Math.round(window.scrollY / window.innerHeight);
  if (newPage !== currentPage) {
    currentPage = newPage;
  }
})

