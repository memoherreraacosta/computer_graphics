"use strict";
var canvas;
var engine;
var scene;
var camera;
var light;

function update() {}

function renderLoop() {
  engine.render(scene, camera);
  update();
  requestAnimationFrame(renderLoop);
}

function main() {
  // CANVAS
  canvas = document.getElementById("canvas");

  // RENDERER ENGINE
  engine = new THREE.WebGLRenderer({ canvas: canvas });
  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setClearColor(new THREE.Color(0.2, 0.2, 0.35), 1);

  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.01,
    10000
  ); // CAMERA
  camera.position.set(10, 0, 20);
  var controls = new THREE.OrbitControls(camera, canvas);
  scene.add(camera);

  // LIGHTS
  light = new THREE.AmbientLight();
  scene.add(light);

  // SCENE GRAPH
  // 3D MODEL
  var loader = new THREE.OBJLoader();
  loader.setPath("./models/obj/");
  var fileName = "bunny.obj";
  loader.load(fileName, function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ wireframe: true });
        scene.add(object);
      }
    });
  });

  // EVENT-HANDLERS
  window.addEventListener("resize", resizeWindow, false);

  // ACTION
  requestAnimationFrame(renderLoop);
}
