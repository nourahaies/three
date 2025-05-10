import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
/********************* 
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "purple" , wireframe: true})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)***************************/

// initialize the custom geometry 
const vertices=

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  30)
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias:true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


// initialize the controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true
//controls.autoRotate=true

window.addEventListener('resize', ()=>{
  camera.aspect=window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth,window.innerHeight)
})

// initialize the clock
const clock = new THREE.Clock()
let previousTime=0

// render the scene
const renderloop=() =>{
  const currentTime= clock.getElapsedTime()
  const delta = currentTime - previousTime
  previousTime= currentTime

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20
  //cubeMesh.scale.x=(Math.sin(currentTime))  
  //cubeMesh.position.x=(Math.sin(currentTime))  + 2
/*
* delta: نضرب زاوية الدوران في دلتا.
هذا يعني أن مقدار الدوران في كل إطار يعتمد على مقدار الوقت الذي مر منذ الإطار السابق.
كلما كان دلتا أكبر (أي أن الإطارات أبطأ)،
 زادت قيمة الدوران في هذا الإطار لتعويض البطء والحفاظ على سرعة دوران ثابتة ظاهرياً.
 */
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
}

renderloop()

