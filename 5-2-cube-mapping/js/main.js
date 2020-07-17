"use strict"
var canvas;
var engine;
var scene;
var camera;
var light;

function update()
{

}

function renderLoop() 
{
    engine.render(scene, camera);
    update();
    requestAnimationFrame(renderLoop);
}

function main()
{ 
    // CANVAS
    canvas = document.getElementById("canvas");

    // RENDERER ENGINE
    engine = new THREE.WebGLRenderer({canvas: canvas});
    engine.setSize(window.innerWidth, window.innerHeight);
    engine.setClearColor(new THREE.Color(0.2, 0.2, 0.35), 1.);   

    // SCENE
    scene = new THREE.Scene();  

    // CAMERA
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., 0., 3.);           
    var controls = new THREE.OrbitControls(camera, canvas);   
    scene.add(camera);  

    // LIGHTS
    light = new THREE.AmbientLight();  
    scene.add(light); 

    // SCENEGRAPH
    // CUBE
    var geometry = new THREE.BoxGeometry();
    var cubeMaterials = [
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/rocks.jpg"), side: THREE.FrontSide}),
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/happy-face.jpg"), side: THREE.FrontSide}),
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/red-brick.jpg"), side: THREE.FrontSide}),
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/green-grass.jpg"), side: THREE.FrontSide}),
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/sirewall.jpg"), side: THREE.FrontSide}),
                         new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/water.jpg"), side: THREE.FrontSide})
                        ];
    var mesh = new THREE.Mesh(geometry, cubeMaterials); 
    scene.add(mesh);           
                               
    // EVENT-HANDLERS
    window.addEventListener('resize', resizeWindow, false);

    // ACTION
    requestAnimationFrame(renderLoop);           
}




