import * as THREE from 'three';


const scene = new THREE.Scene();
// 添加坐标轴辅助
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const light = new THREE.AmbientLight('#ffffff', 1);
scene.add(light)
