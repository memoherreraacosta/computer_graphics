"use strict"
var canvas;
var engine;
var scene;
var camera;
var light;

class Square extends THREE.Mesh
{
    constructor()
    {
        super();
        // GEOMETRY
        var positions = [-0.5, 0.5, 0.,
                     -0.5, -0.5, 0.,
                      0.5, -0.5, 0.,
                      0.5, 0.5, 0.];
        var coordTexture = [0., 1.,
                            0., 0.,
                            1., 0.,
                            1., 1.];
        var indices = [0,1,2, 0,2,3];

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        this.geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(coordTexture), 2));
        this.geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));

        this.geometry.computeFaceNormals();     // Normals

        var texture = new THREE.TextureLoader().load("img/happy-face.jpg");
        texture.wrapS = THREE.ReapeatWrapping;
        texture.wrapT = THREE.ReapeatWrapping;
        texture.repeat.set(1, 1);

        this.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    }
}

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
    // SQUARE
    //var square = new Square();
    var texture = new THREE.TextureLoader().load("./img/happy-face.jpg");
    var cube = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({map: texture}));
    scene.add(cube);           
                               
    // EVENT-HANDLERS
    window.addEventListener('resize', resizeWindow, false);

    // ACTION
    requestAnimationFrame(renderLoop);           
}




