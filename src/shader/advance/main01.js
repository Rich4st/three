/**
 * @fileoverview water model
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Water } from 'three/examples/jsm/objects/Water2.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 8);

const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync('assets/spiaggia_di_mondello_4k.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
})

const gltfLoader = new GLTFLoader();
gltfLoader.loadAsync('assets/models/pagani_huayra_bc/scene.gltf').then((gltf) => {
  scene.add(gltf.scene);
})

const water = new Water(
  new THREE.PlaneGeometry(10, 10),
  {
    color: '#ffffff',
    scale: 1,
    flowDirection: new THREE.Vector2(1, 1),
    textureWidth: 1024,
    textureHeight: 1024,

  }
)

// scene.add(water);
// water.rotation.x = - Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

scene.add(axesHelper);
scene.add(camera);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

