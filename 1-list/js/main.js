"use strict"
var canvas;
var engine;
var scene;
var camera;
var person = {height: 1.8};
var light;
var cube,
    sphere,
    cone,
    torus,
    ring,
    circle;
var guiControls;
var currentMesh = undefined;

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

    // MODELS
    // CUBE
    cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
    cube.name = "Cube";
    cube.visible = false;
    // SPHERE
    sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial());
    sphere.name = "Sphere";
    sphere.visible = false;
     // CONE
    cone = new THREE.Mesh(new THREE.ConeGeometry(), new THREE.MeshBasicMaterial());
    cone.name = "Cone";
    cone.visible = false;

    // TORUS
    torus = new THREE.Mesh(new THREE.TorusGeometry(), new THREE.MeshBasicMaterial());
    torus.name = "Torus";
    torus.visible = false;

    // RING
    ring = new THREE.Mesh(new THREE.RingGeometry(), new THREE.MeshBasicMaterial());
    ring.name = "Ring";
    ring.visible = false;

    // circle
    circle = new THREE.Mesh(new THREE.CircleGeometry(), new THREE.MeshBasicMaterial());
    circle.name = "Circle";
    circle.visible = false;

    // SCENEGRAPH
    scene = new THREE.Scene();  
    scene.add(cube);    // CUBO   
    scene.add(sphere);  // SPHERE
    scene.add(cone);    // CONE
    scene.add(torus);   // TORUS
    scene.add(ring);    // RING
    scene.add(circle);   // circle

    // CAMERA
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., person.height, 3.);           
    var controls = new THREE.OrbitControls(camera, canvas);   
    scene.add(camera);  

    // LIGHTS
    light = new THREE.AmbientLight();  
    scene.add(light); 

    // GUI
    var nameList = ["Select"];
    for(var i = 0; i < scene.children.length - 2; i++)
    {
        nameList.push(scene.children[i].name);
    }

    guiControls = { geomList: "Select" };
    var datGui = new dat.GUI();
    var list = datGui.add(guiControls, 'geomList', nameList).name('Geometry');
    datGui.close();
                               
    // EVENT-HANDLERS
    window.addEventListener('resize', resizeWindow, false);
    list.onChange(listOnChange);

    // ACTION
    requestAnimationFrame(renderLoop);           
}