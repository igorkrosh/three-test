import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

let _camera, _scene, _renderer;
let modelLoaderGLTF;
let particle;

let sceneWrapperId = 'background'
let sceneWrapperNode;
Init()
Animate()

function Init() 
{
    modelLoaderGLTF = new GLTFLoader();
    
    _scene = new THREE.Scene();

    _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    _camera.position.z = 10;

    sceneWrapperNode = document.getElementById(sceneWrapperId);

    _renderer = new THREE.WebGLRenderer({alpha: true});
    _renderer.setSize(sceneWrapperNode.offsetWidth, sceneWrapperNode.offsetHeight);

    CreateParticle();
    _scene.add(particle);

    SetLight();

    LoadModels()

    sceneWrapperNode.appendChild(_renderer.domElement);

    window.addEventListener( 'resize', OnWindowResize, false );
}

function Animate()
{
    requestAnimationFrame(Animate);

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0005;

    _renderer.render(_scene, _camera);
}

function LoadModels()
{
    modelLoaderGLTF.setPath('../models/');
    modelLoaderGLTF.load('deer.glb', 
        function (gltf) {
            let model = gltf.scene;
            _scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            model.traverse((o) => {
                if (o.isMesh) o.material = new THREE.MeshNormalMaterial();
            });

            model.position.x = -0.45;
            model.position.y = -7.35;
            model.position.z = -3;

            model.rotation.x = 0;
            model.rotation.y = -0.66;
            model.rotation.z = -0.09;
        }
    )
}

function OnWindowResize()
{
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();

    _renderer.setSize( sceneWrapperNode.offsetWidth, sceneWrapperNode.offsetHeight );
}

function CreateParticle()
{
    particle = new THREE.Object3D();

    let geometry = new THREE.TetrahedronGeometry(2, 0);

    let material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    for (let i = 0; i < 1000; i++) 
    {
        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

        particle.add(mesh);
    }
}

function SetLight()
{
    let ambientLight = new THREE.AmbientLight(0x999999 );
    _scene.add(ambientLight);

    let lights = [];

    lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
    lights[0].position.set( 1, 0, 0 );

    lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
    lights[1].position.set( 0.75, 1, 0.5 );

    lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
    lights[2].position.set( -0.75, -1, 0.5 );

    _scene.add( lights[0] );
    _scene.add( lights[1] );
    _scene.add( lights[2] );
}

document.querySelectorAll('.btn-scrolldown')[0].addEventListener('click', function() {
    var qm = new THREE.Quaternion();
    THREE.Quaternion.slerp(_camera.quaternion, destRotation, qm, 0.07);
    _camera.quaternion = qm;
    _camera.quaternion.normalize();
})