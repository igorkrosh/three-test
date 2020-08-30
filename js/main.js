let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(10, 10, 10);
let material = new THREE.MeshNormalMaterial();
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 25;

function Render() {
    requestAnimationFrame(Render)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

Render();

