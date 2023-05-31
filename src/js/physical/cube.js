/**
 * @fileoverview cannon
 */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 8);

const cubeArray = [];
const cMaterial = new CANNON.Material('cube');
const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

function createCube() {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereMaterial = new THREE.MeshStandardMaterial();
  const cube = new THREE.Mesh(cubeGeometry, sphereMaterial);
  cube.castShadow = true;
  scene.add(cube);

  const cubeBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 10, 0),
    shape: cubeShape,
    material: cMaterial,
  })

  // cube collide event
  cubeBody.addEventListener('collide', (e) => {
    sphereMaterial.color.set(0xff0000);
    // hitVoice.play();
  })

  cubeBody.applyLocalForce(
    new CANNON.Vec3(0, 100, 0),
    new CANNON.Vec3(0, 0, 0),
  )

  world.addBody(cubeBody);

  cubeArray.push({
    cube,
    cubeBody,
  })
}


const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = - Math.PI / 2;
floor.position.set(0, -5, 0);
floor.receiveShadow = true;
scene.add(floor);

const light = new THREE.AmbientLight(0xffffff, 0.5);
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.castShadow = true;
scene.add(light)
scene.add(directionLight);

// create physical world
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});

window.addEventListener('click', createCube);


const physicalFloor = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, -5, 0),
})
physicalFloor.material = new CANNON.Material('floor');
physicalFloor.addShape(new CANNON.Plane());
physicalFloor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), - Math.PI / 2);

const defaultContactMaterial = new CANNON.ContactMaterial(
  cMaterial,
  floor.material, {
  // 摩擦力
  friction: 0.3,
  // 弹力
  restitution: 0.7,
}
)

// 材料关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial);

world.addBody(physicalFloor);

// create physical voice
const hitVoice = new Audio('./assets/voice.wav');

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

scene.add(axesHelper);
scene.add(camera);


function animate() {
  const deltaTime = clock.getDelta();
  world.step(1 / 60, deltaTime);

  // cube.position.copy(cubeBody.position);
  cubeArray.forEach(item => {
    item.cube.position.copy(item.cubeBody.position);
    // 渲染物理跟随物理物理旋转
    item.cube.quaternion.copy(item.cubeBody.quaternion);
  })
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

