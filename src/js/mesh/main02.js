import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 5);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/photo-1613645695025-20e3f38de4a6.avif')
// 设置纹理偏移
// texture.offset = new THREE.Vector2(0.5, 0.5);
// // 纹理旋转
// texture.rotation = Math.PI / 4;
// // 纹理中心点
// texture.center = new THREE.Vector2(0.5, 0.5);
// // 纹理重复
// texture.repeat = new THREE.Vector2(2, 2);
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'transparent', map: texture });
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(mesh);

camera.position.set(0, 0, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
