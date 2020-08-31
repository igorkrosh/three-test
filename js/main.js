import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

let _camera, _scene, _renderer;
let modelLoaderGLTF;

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

    LoadModels()

    sceneWrapperNode.appendChild(_renderer.domElement);

    window.addEventListener( 'resize', OnWindowResize, false );
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

function OnWindowResize()
{
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();

    _renderer.setSize( sceneWrapperNode.offsetWidth, sceneWrapperNode.offsetHeight );
}