import {camera,scene,renderer,mouse,raycaster,candles} from "./main.js";
import {pickables}from "./candle.js";


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  renderer.render(scene, camera);
}

function pickevent(event){
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects(pickables);
  
  if (intersects.length > 0)
  {
     if(intersects[0].object.parent.n==0)
     {
      if(intersects[0].object.parent.children[1].visible){
		  intersects[0].object.parent.children[1].visible = false;
		  intersects[0].object.parent.children[2].visible = false;
			candles[0].restart();
			}
      
     }
     else if(intersects[0].object.parent.n==1)
     {
      if(intersects[0].object.parent.children[1].visible){
		  intersects[0].object.parent.children[1].visible = false;
		  intersects[0].object.parent.children[2].visible = false;
			candles[1].restart();
			}
     
     }
     else if(intersects[0].object.parent.n==2)
     {
      if(intersects[0].object.parent.children[1].visible){
		  intersects[0].object.parent.children[1].visible = false;
		  intersects[0].object.parent.children[2].visible = false;
			candles[2].restart();
			}
      
     }
     else if(intersects[0].object.parent.n==3)
     {
      if(intersects[0].object.parent.children[1].visible){
		  intersects[0].object.parent.children[1].visible = false;
		  intersects[0].object.parent.children[2].visible = false;
			candles[3].restart();
			}
      
     }
     else if(intersects[0].object.parent.n==4)
     {
      if(intersects[0].object.parent.children[1].visible){
		  intersects[0].object.parent.children[1].visible = false;
		  intersects[0].object.parent.children[2].visible = false;
			candles[4].restart();
			}
      
     }
  }
  else
  {
   console.log('nothing picked...');
  }
}

export{pickevent,onWindowResize,render};