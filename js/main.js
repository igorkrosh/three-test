import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

let _camera, _scene, _renderer;
let modelLoaderGLTF;
let particle;

let deer = {
    model: {},
    states: [
        {
            position: {
                x: -0.45,
                y: -7.35,
                z: -3
            },
            rotation: {
                x: 0,
                y: -0.66,
                z: -0.09
            },
        },
        {
            position: {
                x: -5,
                y: -9.79,
                z: 3.34
            },
            rotation: {
                x: 0,
                y: -0.66,
                z: -0.09
            },
        },
        {
            position: {
                x: 1.14,
                y: -9.79,
                z: 3.34
            },
            rotation: {
                x: 0,
                y: -2.14,
                z: 0.21
            },
        }
    ]
};


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

    TWEEN.update();

    _renderer.render(_scene, _camera);
}

function LoadModels()
{
    modelLoaderGLTF.setPath('../models/');
    modelLoaderGLTF.load('deer.glb', 
        function (gltf) {
            deer.model = gltf.scene;
            _scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            deer.model.traverse((o) => {
                if (o.isMesh) o.material = new THREE.MeshNormalMaterial();
            });

            deer.model.position.x = deer.states[0].position.x;
            deer.model.position.y = deer.states[0].position.y;
            deer.model.position.z = deer.states[0].position.z;

            deer.model.rotation.x = deer.states[0].rotation.x;
            deer.model.rotation.y = deer.states[0].rotation.y;
            deer.model.rotation.z = deer.states[0].rotation.z;
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

function ModelTransition(model, position)
{
    let tween = new TWEEN.Tween(model.position).to(position, 500);

    tween.start();

    tween.onUpdate(function() {
        model.position.x = this.x;
        model.position.y = this.y;
        model.position.z = this.z;
    });
}

function ModelChangeState(model, states, progress)
{
    let stateIndex = parseInt(progress);

    if (stateIndex >= states.length - 1)
    {
        return;
    }

    progress = progress % 1;

    model.position.x = states[stateIndex].position.x + (states[stateIndex + 1].position.x - states[stateIndex].position.x) * progress;
    model.position.y = states[stateIndex].position.y + (states[stateIndex + 1].position.y - states[stateIndex].position.y) * progress;
    model.position.z = states[stateIndex].position.z + (states[stateIndex + 1].position.z - states[stateIndex].position.z) * progress;

    model.rotation.x = states[stateIndex].rotation.x + (states[stateIndex + 1].rotation.x - states[stateIndex].rotation.x) * progress;
    model.rotation.y = states[stateIndex].rotation.y + (states[stateIndex + 1].rotation.y - states[stateIndex].rotation.y) * progress;
    model.rotation.z = states[stateIndex].rotation.z + (states[stateIndex + 1].rotation.z - states[stateIndex].rotation.z) * progress;  
}

document.querySelectorAll('.btn-scrolldown')[0].addEventListener('click', function() 
{
   
})

window.addEventListener('scroll', function(e) {
    let scrollProcess = window.scrollY / window.innerHeight;

    ModelChangeState(deer.model, deer.states, scrollProcess);

    SetNavbarBtnsActive(parseInt(scrollProcess + 0.3));
})

function SetNavbarBtnsActive(index)
{
    let activeBtn = document.querySelector('.btn-navbar.active');
    
    if (activeBtn != null)
    {
        document.querySelector('.btn-navbar.active').classList.remove('active')
    }

    document.querySelectorAll('.btn-navbar')[index].classList.add('active')
}