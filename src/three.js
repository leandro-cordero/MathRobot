import * as THREE from 'three'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)
THREE.ColorManagement.enabled = false


/* ------------------------------ BASE ------------------------------ */
// CANVAS
const canvas = document.querySelector('canvas.webgl')

// SCENE
const scene = new THREE.Scene()
/* ------------------------------ BASE ------------------------------ */


/* ------------------------------ RESIZE ------------------------------ */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// POSICION
let positionX = ((sizes.width / 2) * 2) / (1440 / 2)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // CALCULO PARA RESPONSIVE
    positionX = ((sizes.width / 2) * 2) / (1440 / 2) 
    robot.position.x = positionX
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})
/* ------------------------------ RESIZE ------------------------------ */


/* ------------------------- MATERIALES Y TEXTURAS ------------------------- */
// TEXTURAS
const textureLoader = new THREE.TextureLoader()
const toonTexture = textureLoader.load("/textures/gradients/3.jpg")
    toonTexture.magFilter = THREE.NearestFilter

// MATERIALES
const mainMaterialPink = new THREE.MeshToonMaterial({
    color: '#B18D8A',
    gradientMap: toonTexture
})
const accentMaterialPink = new THREE.MeshToonMaterial({
    color: "#D95D7A",
    gradientMap: toonTexture
})
const mainMaterial = new THREE.MeshToonMaterial({
    color: '#083140',
    gradientMap: toonTexture
})
const accentMaterial = new THREE.MeshToonMaterial({
    color: "#5DB8D9",
    gradientMap: toonTexture
})
mainMaterial.side = accentMaterial.side = THREE.DoubleSide
/* ------------------------- MATERIALES Y TEXTURAS ------------------------- */


/* ------------------------------ GEOMETRIAS ------------------------------ */
// ESPACIADO
const objectsDistance = 3

// ROBOT
const robot = new THREE.Group()
    // Cabeza
    const robotHead = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        mainMaterialPink
    )
    // Orejas
    const robotEar1 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.15, 0.25, 0.25, 32 ),
        mainMaterialPink
    )
    const robotEar2 = robotEar1.clone()
        robotEar1.position.x = -0.5
        robotEar2.position.x = 0.5
        robotEar1.rotation.z = Math.PI * 0.5
        robotEar2.rotation.z = -Math.PI * 0.5
    // Ojos
    const robotEye1 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.15, 0.10, 0.25, 32 ),
        accentMaterialPink
    )
    const robotEye2 = robotEye1.clone()
        robotEye1.position.x = -0.25
        robotEye2.position.x = 0.25
        robotEye1.position.y = robotEye2.position.y = 0.25
        robotEye1.position.z = robotEye2.position.z = 0.5
        robotEye1.rotation.x = robotEye2.rotation.x = Math.PI * 0.5
    // Boca
    const robotMouth = new THREE.Mesh(
        new THREE.CapsuleGeometry( 0.15, 0.4, 4, 8 ),
        accentMaterialPink
    )
        robotMouth.position.y = -0.25
        robotMouth.position.z = 0.5
        robotMouth.rotation.z = Math.PI * 0.5
    // Antenas
    class CustomSinCurve extends THREE.Curve {

        constructor( scale = 1 ) {
            super();
            this.scale = scale;
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
    
            const tx = t - 1.5;
            const ty = Math.cos( 2 * Math.PI * t );
            const tz = 0;
    
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        }
    }
    const path = new CustomSinCurve( 10 )
    const robotWires = new THREE.Mesh( 
        new THREE.TubeGeometry( path, 6, 0.65, 8, false ), 
        mainMaterialPink
    )
        robotWires.scale.set(0.05, 0.05, 0.05)
        robotWires.position.x = 0.5
        robotWires.position.y = 0.85
    // Antenas: bolas
    const robotWiresBall1 = new THREE.Mesh( 
        new THREE.SphereGeometry( 0.1, 32, 16 ), 
        accentMaterialPink
    )
    const robotWiresBall2 = robotWiresBall1.clone()
        robotWiresBall1.position.x = -0.25
        robotWiresBall2.position.x = 0.25
        robotWiresBall1.position.y = robotWiresBall2.position.y = 1.3

robot.add(robotHead, robotEye1, robotEye2, robotMouth, robotWires, robotWiresBall1, robotWiresBall2, robotEar1, robotEar2)

// POSICIONAMIENTO
robot.position.y = - objectsDistance * 0    
robot.position.x = positionX

// AÑADIR
scene.add(robot)
/* ------------------------------ GEOMETRIAS ------------------------------ */


/* ------------------------------ LUCES ------------------------------ */
// GENERAL
const directionalLight = new THREE.DirectionalLight("#ffffff", 1)
directionalLight.position.set(1, 1, 0)

// LUZ ROBOT
const robotLight = new THREE.PointLight( 0xff0000, 1, 10 )

// LUZ FIGURAS
const generalPointLight_1 = new THREE.PointLight( 0x0000ff, 0.5, 8 )

// LUZ DESCUENTOS
const generalPointLight_2 = generalPointLight_1.clone()

// LUZ PROMEDIOS
const generalPointLight_3 = generalPointLight_1.clone()

    robotLight.position.x = generalPointLight_1.position.x = -1
    robotLight.position.z = generalPointLight_1.position.z = 2.5
    robotLight.position.y = 1
    generalPointLight_1.position.y = 1 - (objectsDistance * 2)
    generalPointLight_2.position.y = 1 - (objectsDistance * 3)
    generalPointLight_3.position.y = 1 - (objectsDistance * 4)

scene.add(directionalLight, robotLight, generalPointLight_1, generalPointLight_2, generalPointLight_3)
/* ------------------------------ LUCES ------------------------------ */


/* ------------------------------ PARTICULAS ------------------------------ */
// CANTIDAD
const particlesCount = 400

// ARRAY de ubicaciones XYZ
const positions = new Float32Array(particlesCount * 3)
    // VALORES random de posiciones
    for(let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (objectsDistance * 0.5) - Math.random() * objectsDistance * 4
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

// GEOMETRIA libre para particulas
const particlesGeometry = new THREE.BufferGeometry()
    // ATRIBUTO de posicion
    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    )

// MATERIAL
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    sizeAttenuation: true,
    color: "#5DB8D9",
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
/* ------------------------------ PARTICULAS ------------------------------ */


/* ------------------------------ CAMARA ------------------------------ */
// GRUPO
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// CAMARA BASE
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)
/* ------------------------------ CAMARA ------------------------------ */


/* ------------------------------ RENDERER ------------------------------ */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
/* ------------------------------ RENDERER ------------------------------ */


/* ------------------------------ POSTPROCESS ------------------------------ */
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)
const effectComposer = new EffectComposer(renderer, renderTarget)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)

// Unreal Bloom
const unrealBloomPass = new UnrealBloomPass()
    unrealBloomPass.strength = 0.8
    unrealBloomPass.radius = 1
effectComposer.addPass(unrealBloomPass)
/* ------------------------------ POSTPROCESS ------------------------------ */


/* ------------------------------ LISTENERS ------------------------------ */
// SCROLL
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener("scroll", () => {
    scrollY = window.scrollY
    
    const newSection = Math.round(scrollY / sizes.height)

    const positionY = Math.min(Math.max((scrollY / 100) * 9, 0), 100)

    if(newSection != currentSection) {
        currentSection = newSection

        gsap.to(
            robot.rotation,
            {
                duration: 1.5,
                ease: "power2.inOut",
                x: "+=6",
                y: "+=3",
                z: "+=1.5"
            }
        )
    }
    gsap.to(robot.position, {
        y: -(scrollY / 2857 * 9),
        scrollTrigger: {
            trigger: "#main",
            start: "top center",
            end: "+=300",
            scrub: 1,
        }
    })
    /* gsap.to(robot.position, {
        x: - (positionX / 3),
        scrollTrigger: {
            trigger: "#heroSection",
            start: "center +=300",
            end: "-=200",
            scrub: 1,
        }
    }) */
    gsap.to(robot.scale, {
        x: 0.25,
        y: 0.25,
        z: 0.25,
        scrollTrigger: {
            trigger: "#heroSection",
            start: "center +=300",
            end: "-=200",
            scrub: 1,
        }
    })
})


// MOUSE
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})
/* ------------------------------ LISTENERS ------------------------------ */


/* ------------------------------ INTRO ANIMATION ------------------------------ */
// Master
const masterTL = gsap.timeline()
// Robot
const robotTL = gsap.timeline()
robotTL.from(robotEar1.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "-15",
    y: "-2",
    z: "-15"
}, "<")
robotTL.from(robotEar2.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "3",
    y: "0",
    z: "0"
}, "<")
robotTL.from(robotEye1.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "-2",
    y: "1",
    z: "5"
}, "<")
robotTL.from(robotEye2.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "2",
    y: "1",
    z: "5"
}, "<")
robotTL.from(robotMouth.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "0",
    y: "-2",
    z: "3"
}, "<")
robotTL.from(robotWiresBall1.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "0",
    y: "2",
    z: "-5"
}, "<")
robotTL.from(robotWiresBall2.position, {
    duration: Math.random() / 2,
    delay: Math.random() / 2,
    ease: "power2.inOut",
    x: "1",
    y: "3",
    z: "-6"
}, "<")
masterTL.add(robotTL)

// Particulas
masterTL.from(particles.scale, {
    duration: 1.2,
    ease: "power2.inOut",
    x: "10",
    y: "10",
    z: "10"
}, "2")

// Scroll
let scrollTL = gsap.timeline()

masterTL.add(scrollTL)
/* ------------------------------ INTRO ANIMATION ------------------------------ */


/* ------------------------------ ANIMACIONES ------------------------------ */
// RELOJ
const clock = new THREE.Clock()

// TIEMPO PREVIO
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    
    robot.rotation.x += deltaTime * 0.1
    robot.rotation.y += deltaTime * 0.12

    // Posicionamiento Camara
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 2 * deltaTime

    // Render
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
/* ------------------------------ ANIMACIONES ------------------------------ */