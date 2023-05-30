/**
 * @fileoverview 置换贴图
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 5);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/Leaf 02 back colour.jpg')
// 透明材质
const alphaTexture = textureLoader.load('./textures/Leaf 02 back alpha.jpg')
const displacementTexture = textureLoader.load('./textures/images.jpg')

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: texture,
  alphaMap: alphaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  displacementMap: displacementTexture,
  displacementScale: 0.2
});
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5, 200, 200),
  cubeMaterial
)
plane.position.set(3, 0, 0)
scene.add(plane);

// 灯光 环境光
const light = new THREE.AmbientLight('#ffffff', 1);
scene.add(light)
// 直线光
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
// directionalLight.position.set(2, 2, 2);
// scene.add(directionalLight);

scene.add(mesh);

camera.position.set(0, 0, 5);
scene.add(camera);

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

// gsap 动画
// gsap.to(plane.position, { duration: 1, delay: 1, x: 2 })

const gui = new GUI();
// 设置x y z的值
var folder = gui.addFolder('folder');
folder.add(mesh.position, 'x', -3, 3, 0.01).name('x轴位置');
folder.add(mesh.position, 'y', -3, 3, 0.01).name('y轴位置');
folder.add(mesh.position, 'z', -3, 3, 0.01).name('z轴位置');

gui.add(mesh, 'visible').name('显示隐藏');
gui.add(mesh.material, 'wireframe').name('线框模式');
gui.addColor({ color: '#00ff00' }, 'color').onChange((e) => {
  mesh.material.color.set(e)
}).name('颜色')
gui.add({ 'opacity': 1 }, 'opacity', 0, 1, 0.01).onChange((e) => {
  mesh.material.opacity = e
}).name('透明度')

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// window.addEventListener('dblclick', () => {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//     return
//   }
//   renderer.domElement.requestFullscreen();
// }, false)
