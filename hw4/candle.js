import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from "./main.js";

var pickables=[];

class mycandle{
   
   x;
   z;
   count;
   spotLight;
   flameMesh;
   
  constructor(x,z,n){
  this.x=x;
  this.z=z;
  this.candle=new THREE.Group();
  this.candle.n=n;
   var body = new THREE.Mesh (new THREE.CylinderGeometry(5,5,20,60), new THREE.MeshNormalMaterial());
   this.candle.add(body);
   body.position.y=10;
   
   this.spotLight = new THREE.SpotLight( 0xffffff );
	 this.candle.add(this.spotLight);
   this.spotLight.angle = Math.PI/4;
   this.spotLight.position.y = 15;
   this.spotLight.target = body;
   this.spotLight.penumbra = 0.3;
   
   this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
}


 makeFlame2() {
  //var flameMesh;
  
  var loader = new THREE.TextureLoader();
    // load a resource
  var texture=loader.load(
    // URL ...
    'https://i.imgur.com/M2tr5Tm.png?1',
    // onLoad ...
    function(texture) {
      // do something with the texture
      // Plane with default texture coordinates [0,1]x[0,1]
       },
		undefined, // onProgress
    // onError ...
    function(xhr) {
      console.log('An error happened');
    }
  );
      var texMat = new THREE.MeshBasicMaterial({
        map: texture,
        alphaTest:0.5
      });
      
      this.flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), texMat);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    	texture.repeat.set (1/3,1/3);
      texture.offset.set (0,2/3);
      //scene.add (flameMesh);
      this.candle.add (this.flameMesh);
      pickables.push(this.candle);
      scene.add (this.candle);
      this.flameMesh.position.y = 28;
      this.candle.position.set(this.x,0.1,this.z);
   

}

textureAnimate() {
  this.count = (this.count === undefined) ? 1 : this.count;

//console.log (textureAnimate.count)
	if (this.flameMesh!== undefined) {
    var texture = this.flameMesh.material.map;
  //console.log (`${textureAnimate.count}: [${texture.offset.x},${texture.offset.y}]`);
    texture.offset.x += 1/3;
 
 		if (this.count % 3 === 0) {
    	texture.offset.y -= 1/3;
    }
    this.count++;
  }
}

restart(){
  clearInterval (this.flameInterval);
	setTimeout(this.restart2.bind(this),3000);
}

restart2(){
    this.flameMesh.visible = true;
	  this.spotLight.visible = true;
    this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
}

}

export{mycandle,pickables};