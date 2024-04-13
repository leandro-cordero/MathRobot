import * as THREE from 'three'

/* --------------------DOM-------------------- */
export const data = {
    title: "Math.Robot",
    subtitle: "Calculate easier with me",
    geometryTitle: "Geometries",
    discountTitle: "Discounts",
    averagesTitle: "Averages",
}
/* --------------------DOM-------------------- */


/* --------------------THREE MODELS-------------------- */
export const models = {
    material: new THREE.MeshBasicMaterial({
        color: "#5DB8D9",
        side: THREE.DoubleSide,
        wireframe: true,
    }),
    materialFilled: new THREE.MeshLambertMaterial({
        color: "#5DB8D9",
        side: THREE.DoubleSide,
    }),
    materialSecondary: new THREE.MeshLambertMaterial({
        color: "#083140",
        side: THREE.DoubleSide,
    }),
    lightAmbient: new THREE.AmbientLight("#ffffff", 0.1),
    lightDirectional: new THREE.DirectionalLight("#ffffff", 1),
    lightCoordinates: {
        x: 0,
        y: 1,
        z: 1,
    },
    animate: {
        rotateX: 0.1, /* 0.1 */
        rotateY: 0.12, /* 0.12 */
    },
    camera: {
        perspective: new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100),
        z: 4,
    },
    renderer: {
        width: 100,
        height: 100,
    }
}
/* --------------------THREE MODELS-------------------- */