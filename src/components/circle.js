import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { models } from '../data';

/* ------------------------------ BASE ------------------------------ */
THREE.ColorManagement.enabled = false
const canvas = document.querySelector('canvas.circle')

const scene = new THREE.Scene();
const camera = models.camera.perspective
    camera.position.z = models.camera.z;
    camera.aspect = models.renderer.width / models.renderer.height
    camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
    renderer.setSize( models.renderer.width, models.renderer.height );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/* ------------------------------ BASE ------------------------------ */


/* ------------------------------ GEOMETRY ------------------------------ */
const geometry = new THREE.CircleGeometry( 1, 32 ); 
const material = models.material
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
/* ------------------------------ GEOMETRY ------------------------------ */


/* ------------------------------ ANIMATE ------------------------------ */
// RELOJ
const clock = new THREE.Clock()

// TIEMPO PREVIO
let previousTime = 0

function animate() {
    const elapsedTime = clock.getElapsedTime()

    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    requestAnimationFrame( animate );
    
	mesh.rotation.x += deltaTime * models.animate.rotateX;
	mesh.rotation.y += deltaTime * models.animate.rotateY;
    
	renderer.render( scene, camera );
}

animate();
/* ------------------------------ ANIMATE ------------------------------ */