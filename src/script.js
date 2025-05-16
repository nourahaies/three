import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene

//const geometry = new THREE.BoxGeometry(1,1,1)
/**
 * 
الرقم الأول: 1

هذا الرقم يمثل نصف قطر الكرة (Radius).
يحدد حجم الكرة. إذا قمت بزيادة هذا الرقم، ستصبح الكرة أكبر. إذا قمت بتقليله، ستصبح الكرة أصغر.
وحدة القياس هنا نسبية، تعتمد على الوحدات التي تستخدمها لبقية العناصر في المشهد الخاص بك (مثل موقع الكاميرا والأضواء).
الرقم الثاني: 16

هذا الرقم يمثل عدد الشرائح الأفقية (Width Segments أو Horizontal Segments).
يحدد عدد التقسيمات أو الخطوط التي سيتم إنشاؤها حول محيط الكرة أفقياً (من القطب إلى القطب).
كلما زاد هذا الرقم، أصبحت الكرة أكثر تفصيلاً ونعومة، حيث يتم تقريب شكلها بشكل أفضل بواسطة المزيد من المضلعات الصغيرة.
إذا قللت هذا الرقم، ستبدو الكرة أكثر "تكتلاً" أو ذات أوجه مرئية.
الرقم الثالث: 16

هذا الرقم يمثل عدد القطاعات العمودية (Height Segments أو Vertical Segments).
يحدد عدد التقسيمات أو الخطوط التي سيتم إنشاؤها حول الكرة عمودياً (حول المحور من الأعلى إلى الأسفل).
مثل عدد الشرائح الأفقية، كلما زاد هذا الرقم، أصبحت الكرة أكثر نعومة وتفصيلاً.
إذا قللت هذا الرقم، ستبدو الكرة أكثر "تكتلاً" من حيث الارتفاع.
 */
const geometry = new THREE.SphereGeometry(1,16,16)

const cubeMaterial = new THREE.MeshBasicMaterial({color: "purple" , wireframe: true})

const cubeMesh = new THREE.Mesh(
  geometry,
  cubeMaterial
)
scene.add(cubeMesh)

// initialize the custom geometry 
// bameel mothaleth men verticies
//const vertices=

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

