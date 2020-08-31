import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

let _camera, _scene, _renderer;
let modelLoaderGLTF;

Init()
Animate()

function Init() 
{
    modelLoaderGLTF = new GLTFLoader();
    
    _scene = new THREE.Scene();

    _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    _camera.position.z = 10;

    _renderer = new THREE.WebGLRenderer({alpha: true});
    _renderer.setSize(window.innerWidth, window.innerHeight);

    LoadModels()

    document.body.appendChild(_renderer.domElement);
}

function Animate()
{
    requestAnimationFrame(Animate);
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

            model.position.y -= 7;
            model.rotation.x = -0.16;
            model.rotation.y = -0.7;
        }
    )
}