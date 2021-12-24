import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {mycandle} from "./Candle.js";
import {pickevent,onWindowResize,render} from "./others.js";

var candles=[];
var camera, scene, renderer;
var raycaster,mouse;
var flameOff = false;

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
	renderer.setClearColor (0x888888);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
  camera.position.x=50;
  camera.position.y=60;
  camera.position.z = 150;

	let controls = new THREE.OrbitControls (camera, renderer.domElement);
   controls.minPolarAngle=THREE.Math.degToRad(50);
   controls.maxPolarAngle=THREE.Math.degToRad(60);
   controls.minDistance=100;
 	 controls.maxDistance=150;
   
   let floor = new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshPhongMaterial());
   floor.rotation.x=-Math.PI/2;
   scene.add(floor);
   
  candles[0]=new mycandle(40,0,0);
  candles[1]=new mycandle(-40,0,1);
  candles[2]=new mycandle(0,-35,2);
  candles[3]=new mycandle(25,50,3);
  candles[4]=new mycandle(-25,50,4);
  ////////////////////////////////////////////////////////////
  candles.forEach(function (a){ a.makeFlame2();})
  
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  document.addEventListener ('pointerdown',pickevent,false);  

  window.addEventListener('resize', onWindowResize, false);
  
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // billboard
  // candle.lookAt (camera.position)  // does not work
  //console.log(candles[0].candle);
  candles.forEach(function(a){a.flameMesh.lookAt(camera.position.x, 0, camera.position.z);});
  
}

export{camera,scene,renderer,mouse,candles};
export{init,animate};