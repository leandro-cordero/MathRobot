import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { models } from '../data';

/* ------------------------------ BASE ------------------------------ */
THREE.ColorManagement.enabled = false
const canvas = document.querySelector('canvas.percentage')

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
/* ------------------------------ BASE ------------------------------ */


/* ------------------------------ GEOMETRY ------------------------------ */
const fontLoader = new FontLoader()

let mesh

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const geometry = new TextGeometry(
            '%', {
                font: font,
                size: 1.5,
                height: 0.2,
                curveSegments:8,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        geometry.center()
        
        const material = models.materialFilled
        mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh)
    }
)
/* ------------------------------ GEOMETRY ------------------------------ */


/* ------------------------------ LIGHTS ------------------------------ */
const ambientLight = models.lightAmbient.clone()

const directionalLight = models.lightDirectional.clone()
    directionalLight.position.set(models.lightCoordinates.x, models.lightCoordinates.y, models.lightCoordinates.z)

scene.add(ambientLight, directionalLight)
/* ------------------------------ LIGHTS ------------------------------ */


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
    
    if(mesh) {
        mesh.rotation.x += deltaTime * models.animate.rotateX;
        mesh.rotation.y += deltaTime * models.animate.rotateY;
    }
    
	renderer.render( scene, camera );
}

animate();
/* ------------------------------ ANIMATE ------------------------------ */