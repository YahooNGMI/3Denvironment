import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)
const cantoTexture = new THREE.TextureLoader().load('https://arweave.net/CD56U1-hKJ2TqV5ECVHyLPVxQbWcsf0KkIS5SJqq_B0')
const geometry = new THREE.CylinderGeometry(10, 10, 2, 100);
const material = new THREE.MeshStandardMaterial({ map: cantoTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// const ngmiTexture = new THREE.TextureLoader().load('nealo11.jpg');
// 

// const pandaBox = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new THREE.MeshBasicMaterial({ map: ngmiTexture })
// )

torus.position.x =30;
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg')
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

const ngmiTexture = new THREE.TextureLoader().load('https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fwww.arweave.net%2FMKBhn32i_8UNnF_Mwgr2MefWBiYocUW6oapsJuH9Bt4%3Fext%3Dpng');


const pandaBox = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: ngmiTexture })
)

scene.add(pandaBox)

const moonTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Moon_texture.jpg/2560px-Moon_texture.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  pandaBox.rotation.y += 0.01;
  pandaBox.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;



moon.position.z = 30;
moon.position.setX(-10);

animate();