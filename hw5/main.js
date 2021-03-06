import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";
import {render,onWindowResize} from "./render.js";

var scene, renderer, camera;
var meshMaterial,pointLight;
var turn = true;
var angle = 0;
var teapot=[];


function init() {

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
	
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x888888);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45,window.innerWidth /window.innerHeight,0.1,10000);
    camera.position.y = 160;
    camera.position.z = 400;
	
	window.addEventListener('resize', onWindowResize,false);

    let controls = new OrbitControls(camera, renderer.domElement);

   

    pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 3));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

 
    meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader:[
			"uniform vec3 lightpos;",
			"varying vec3 eyelightdir;",
			"varying vec3 eyenormal;",   
			"varying vec4 eyepos;",
			"void main() {",
			"gl_Position = projectionMatrix* modelViewMatrix * vec4( position, 1.0);",
			"eyepos = modelViewMatrix * vec4 (position, 1.0);",
			"vec4 eyelightpos= viewMatrix * vec4 (lightpos, 1.0);",
			"eyelightdir =  eyelightpos.xyz - eyepos.xyz;",
			"eyenormal = normalMatrix * normal;",
			"}"
		].join("\n"),
        fragmentShader:[
			"varying vec3 eyelightdir;",
			"varying vec3 eyenormal;",
			"varying vec4 eyepos;  " ,
			"void main() {",
			"float intensity = dot (normalize (eyenormal), normalize (eyelightdir));",
			"if (intensity > 0.8)",
				"intensity = 0.8;",
			"else if (intensity > 0.4)",
				"intensity = 0.4;",
			"else",
				"intensity = 0.0;",
			"vec3 diffuse = intensity*vec3 (1,1,1);",
			"gl_FragColor = vec4 (diffuse + vec3(0,0,0.13), 1.0);",
			"}"
		].join("\n")
    });

    for(var i = -135; i <= 135; i+=30){
	  for(var j = 135; j >= -135; j-=30){
		var geometry = new TeapotGeometry (7);
        var mesh = new THREE.Mesh(geometry, meshMaterial);
		mesh.position.set(j,0,i);
		teapot.push(mesh)
		scene.add(mesh);
	  }
	}
     
 
    
    
    //mesh.position.set (70, 0, 50);
    //mesh.rotation.y = Math.PI/2;
  
}

function animate() {

    
    angle += 0.01;
    
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
    
   teapot.forEach(function(a){
	a.material.uniforms.lightpos.value.copy (pointLight.position);
	a.rotation.y = 1.3*angle;});
	
    //mesh.rotation.y = 1.3*angle;
	
    requestAnimationFrame(animate);
    render();
}

export{scene,camera,init,animate,renderer};