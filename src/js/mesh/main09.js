/**
 * @fileoverview cubeTexture hdr scene background
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 5, 5);
scene.add(camera);

// const textureLoader = new THREE.CubeTextureLoader();
// const texture = textureLoader.load('textures/HDR_040_Field_Bg.jpg',);


// const roughnessTexture = new THREE.TextureLoader().load('./textures/images.jpg');

// textureLoader.manager.onProgress = function (loaded, total) {
//   console.log(loaded, total);
// }
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync('./textures/HDR_040_Field_Ref.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularRefractionMapping;
  scene.environment = texture;
  scene.background = texture;
})

const geometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.1,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

scene.environment = './textures/HDR_040_Field_Bg.jpg'

camera.position.set(0, 0, 5);
scene.add(camera);

const light = new THREE.AmbientLight('#ffffff', 1);
scene.add(light)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// < --- >

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
