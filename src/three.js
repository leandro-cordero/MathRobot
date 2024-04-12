import * as THREE from 'three'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import gsap from 'gsap'

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
    robot.position.x = figuras.position.x = descuentos.position.x = promedios.position.x = positionX
    
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
const mainMaterialPinkBasic = new THREE.MeshBasicMaterial({
    color: '#B18D8A',
})
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

// FIG GEOMETRICAS
const figuras = new THREE.Group()
    // Circulo
    const circulo = new THREE.Mesh(
        new THREE.CircleGeometry( 0.5, 32 ),
        accentMaterial
    )
        circulo.position.z = 0.5
    // Cuadrado
    const cuadrado = new THREE.Mesh(
        new THREE.PlaneGeometry( 1, 1 ),
        mainMaterial
    )
        cuadrado.rotation.y = Math.PI * -0.33
        cuadrado.position.x = 0.25
    // Triangulo
    const trianguloShape = new THREE.Shape()
        trianguloShape.moveTo( -0.5, 0 )
        trianguloShape.lineTo( 0, 1 )
        trianguloShape.lineTo( 0.5, 0 )
        trianguloShape.lineTo( 0, 0 )

    const triangulo = new THREE.Mesh(
        new THREE.ShapeGeometry( trianguloShape ),
        accentMaterial
    )
        triangulo.rotation.y = Math.PI * -0.66
        triangulo.position.y = -0.5
        triangulo.position.x = -0.25

figuras.add(circulo, cuadrado, triangulo)

// DESCUENTOS
const descuentos = new THREE.Group()
    // Aro 1
    const aro1 = new THREE.Mesh(
        new THREE.TorusGeometry( 0.15, 0.1, 16, 100 ),
        mainMaterial
    )
        aro1.position.x = 0.25
        aro1.position.y = -0.25
    // Aro 2
    const aro2 = new THREE.Mesh(
        new THREE.TorusGeometry( 0.15, 0.1, 16, 100 ),
        mainMaterial
    )
        aro2.position.x = -0.25
        aro2.position.y = 0.25
    // Barra
    const barra = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 1, 0.15),
        mainMaterial
    )
    barra.rotation.z = Math.PI * -0.25

descuentos.add(aro1, aro2, barra)

// PROMEDIOS
const promedios = new THREE.Group()
    // LINEA
    class CustomPath extends THREE.Curve {

        constructor( scale = 1 ) {
            super()
            this.scale = scale
        }
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
            const tx = t * 3 - 1.5
            const ty = Math.sin( 2 * Math.PI * t )
            const tz = 0

            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale )
        }
    }
    const promediosLinePath = new CustomPath( 10 )

    const promediosLine = new THREE.Mesh( 
        new THREE.TubeGeometry( promediosLinePath, 50, 0.35, 8, false ), 
        mainMaterial 
    )
        promediosLine.scale.set(0.05, 0.025, 0.05)
        promediosLine.position.y = 0.5

    // BARRA: CONSTANTES
    const promediosBarWidth = 0.175
    // BARRA 1
    const promediosBar1 = new THREE.Mesh(
        new THREE.BoxGeometry( promediosBarWidth, 0.85, promediosBarWidth ),
        mainMaterial
    )
        promediosBar1.position.y = (promediosBar1.geometry.parameters.height / 2) - 0.5  
    // BARRA 2
    const promediosBar2 = new THREE.Mesh(
        new THREE.BoxGeometry( promediosBarWidth, 1.1, promediosBarWidth ),
        mainMaterial
    )
        promediosBar2.position.x = -0.25
        promediosBar2.position.y = (promediosBar2.geometry.parameters.height / 2) - 0.5
    // BARRA 3
    const promediosBar3 = new THREE.Mesh(
        new THREE.BoxGeometry( promediosBarWidth, 1.05, promediosBarWidth ),
        mainMaterial
    )
        promediosBar3.position.x = -0.5        
        promediosBar3.position.y = (promediosBar3.geometry.parameters.height / 2) - 0.5      
    // BARRA 4
    const promediosBar4 = new THREE.Mesh(
        new THREE.BoxGeometry( promediosBarWidth, 0.7, promediosBarWidth ),
        mainMaterial
    )
        promediosBar4.position.x = 0.25
        promediosBar4.position.y = (promediosBar4.geometry.parameters.height / 2) - 0.5
    // BARRA 5
    const promediosBar5 = new THREE.Mesh(
        new THREE.BoxGeometry( promediosBarWidth, 0.75, promediosBarWidth ),
        mainMaterial
    )
        promediosBar5.position.x = 0.5
        promediosBar5.position.y = (promediosBar5.geometry.parameters.height / 2) - 0.5

    // ESFERA: CONSTANTES
    const promediosSphereRadius = 0.05
    // ESFERA 1
    const promediosSphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(promediosSphereRadius, 16, 16),
        accentMaterial
    )
        promediosSphere1.position.y = 0.65
        promediosSphere1.position.x = -0.15
    // ESFERA 2
    const promediosSphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(promediosSphereRadius, 16, 16),
        accentMaterial
    )
        promediosSphere2.position.y = 0.5
        promediosSphere2.position.x = -0.75
    // ESFERA 3
    const promediosSphere3 = new THREE.Mesh(
        new THREE.SphereGeometry(promediosSphereRadius, 16, 16),
        accentMaterial
    )
        promediosSphere3.position.y = 0.5
        promediosSphere3.position.x = 0.75

promedios.add(promediosLine, promediosBar1, promediosBar2, promediosBar3, promediosBar4, promediosBar5, promediosSphere1, promediosSphere2, promediosSphere3)

// POSICIONAMIENTO
robot.position.y = - objectsDistance * 0
figuras.position.y = - objectsDistance * 1
descuentos.position.y = - objectsDistance * 2
promedios.position.y = - objectsDistance * 3
    
robot.position.x = figuras.position.x = descuentos.position.x = promedios.position.x = positionX


// AÑADIR
scene.add(robot, figuras, descuentos, promedios)

// ARRAY DE MESHES
const sectionMeshes = [robot, figuras, descuentos, promedios]
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
        positions[i * 3 + 1] = (objectsDistance * 0.5) - Math.random() * objectsDistance * sectionMeshes.length
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
    /* alphaMap: particlesTexture_2,  */
    depthWrite: false,
    blending: THREE.AdditiveBlending,
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// Animacion
gsap.from(particles.scale, {
    duration: 2.5,
    ease: "power2.inOut",
    x: "10",
    y: "10",
    z: "10"
})

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

    if(newSection != currentSection) {
        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: "power2.inOut",
                x: "+=6",
                y: "+=3",
                z: "+=1.5"
            }
        )
    }
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

    // Animacion de Meshes
    for(const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
    }

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