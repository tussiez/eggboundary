import * as THREE from '/threejs.js'

var camera, scene, renderer;
var ballgeo, ballmat, ballmesh;
var roadgeo;
var roadmat;
var roadmesh;
var counting = false;
var obstaclegeo;
var onPowerup = false;
var countdown = document.getElementById('countdown');
var timeLeft = 0;

var csm;
var obstaclemat;
var obstaclemeshes = [];
var keys = [];
var turnSpeed = 0.0
var rollSpeed = 0;
var startTime = 0;
var died = false;
var isInv = false;
var scored = 0;
var roadCt = 10;
var arr = [];
var powerupmeshes = [];
var score = ESCRIPT.GetElement('score');
var title = ESCRIPT.GetElement('title');
var title1 = ESCRIPT.GetElement("title1");
var intersec;
var raycaster = new THREE.Raycaster();
var frompos;
var basic = window.location.href.split('?')[1] == 'basic' ? true : false;
console.log('Basic Mode: ' + basic)
var powerupgeo;
var powerupmat;
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'namecanvas');
canvas.setAttribute('style', 'z-index:9;position:absolute;top:0;left:0');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '20px Arial';
ctx.fillStyle = 'green';
var dist = ESCRIPT.GetElement('dist');
var topos = new THREE.Vector3(0, -1, 0);
var randomgeos = [new THREE.IcosahedronBufferGeometry(.5), new THREE.CylinderBufferGeometry(.5, .5, 1.2, .4), new THREE.BoxBufferGeometry(.6, 1, .5), new THREE.ConeBufferGeometry(.5, 1, 16)]
function createObstacles() {
  if (basic == false) {
    obstaclemat = new THREE.MeshPhongMaterial({ color: 'red', wireframe: false, transparent: true, opacity: 1 });
  } else {
    obstaclemat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true, transparent: true, opacity: 1 });
  }

  obstaclemat.shininess = 120;
  for (var i = 0; i < 1000; i++) {
    var obstaclegeo2 = randomgeos[Math.floor(Math.random() * randomgeos.length)];
    var obstaclemat2 = obstaclemat.clone();
    if(basic == false) {
    obstaclemat2.color = new THREE.Color(ESCRIPT.Color());
    }
    var mesh = new THREE.Mesh(obstaclegeo2, obstaclemat2);
    mesh.direction = Math.random() > 0.5 ? true : false;//dir
    obstaclemeshes.push(mesh);
    mesh.position.z = -Math.random() * 5000;
    mesh.position.x = (Math.random() * 5);
    mesh.position.x -= 2;
    mesh.position.y -= .15
    mesh.position.z -= 10;
    mesh.name = 'obstacle';
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(obstaclemeshes[i]);
  }
}

function createPowerups() {
  powerupgeo = new THREE.BoxGeometry(.4, .5, .4);
  var powerupmat2;
  if (basic == false) {
    powerupmat = new THREE.MeshPhongMaterial({ color: 'purple', wireframe: false, transparent: true });
    powerupmat2 = new THREE.MeshPhongMaterial({ color: 'green', wireframe: false, transparent: true});
  } else {
    powerupmat = new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true, transparent: true });
    powerupmat2 = new THREE.MeshBasicMaterial({color: 'green', wireframe: true, transparent: true});
  }
  
  powerupmat.shininess = 120;//Xtra shiny
  powerupmat2.shininess = 120;
  for (var i = 0; i < 250; i++) {

    var mesh = new THREE.Mesh(powerupgeo, powerupmat);
    if (Math.random() > .5) {
      // mesh.material.color = 'pink';
      mesh.name = 'shrink-powerup';
    } else {
      mesh.name = 'inv-powerup';
      mesh.material = powerupmat2; // invi
    }
    powerupmeshes.push(mesh);
    mesh.position.z = -Math.random() * 5000;
    mesh.position.x = (Math.random() * 5);
    mesh.position.y -= .5;
    mesh.position.x -= 3;
    mesh.position.z -= 10;

    mesh.castShadow = true;
    scene.add(powerupmeshes[i]);
  }
}

window["changeWireframe"] = function (val) {
  for (var i = 0; i < powerupmeshes.length; i++) {
    powerupmeshes[i].material.wireframe = val;
    powerupmeshes[i].castShadow = !val;
    powerupmeshes[i].receiveShadow = !val;
  }
  for (var x = 0; x < obstaclemeshes.length; x++) {
    obstaclemeshes[x].material.wireframe = val;
    obstaclemeshes[x].castShadow = !val;
    obstaclemeshes[x].receiveShadow = !val;
  }
  ballmesh.material.wireframe = val;
  ballmesh.receiveShadow = !val;

}
var running = [];
function movingObject() {
  running = [];
  for (var i = 0; i < obmesh.length; i++) {
    var obstacle = obmesh[i];
    var posx = obstacle.position.x;
    var movingback = false;
    var dir = obstacle.direction;
    function gorandom() {


      if (!running[i]) {
        if (dir == true) {
          if (obstacle.position.x < 2) {
            obstacle.position.x += .01;
            obstacle.rotation.y += .04;

            requestAnimationFrame(gorandom)
            running[i] = true;
          } else {
            obstacle.position.x = posx - 1;
            running[i] = false;

          }
        } else {
          if (obstacle.position.x > 0) {
            obstacle.position.x -= .02;
            obstacle.rotation.y -= .04;
            requestAnimationFrame(gorandom)
            running[i] = true;
          } else {
            obstacle.position.x = posx;
            running[i] = false;

          }
        }
      }


    }
    gorandom();
  }
}
function falldown() {
  frompos = new THREE.Vector3(ballmesh.position.x, ballmesh.position.y + 10, ballmesh.position.z + 2);
  raycaster.set(frompos, topos);
  var intersections = raycaster.intersectObject(roadmesh);
  intersec = intersections;
  if (intersections != undefined) {
    if (intersections.length === 2) {
      console.log(intersections[1].object.name);

      ballmesh.position.y -= 0.01;
    }

  }
}
var spotlight;
function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40);
  scene = new THREE.Scene();
  if (basic == false) {
    document.getElementById('isWireframe').style.display = 'none';
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } else {
    renderer = new THREE.WebGLRenderer({ antialias: false });

  }
  renderer.shadowMap.enabled = true;
  renderer.domElement.style.zIndex = 8;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  spotlight = new THREE.SpotLight(0xffffff, 1);
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  scene.add(spotlight)
  scene.add(spotlight.target);
  ballgeo = new THREE.SphereGeometry(.4, 8, 8);
  if (basic == false) {
    ballmat = new THREE.MeshPhongMaterial({ color: 'green', wireframe: false, transparent: true });
  } else {
    ballmat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true, transparent: true });
  }
  ballmat.shininess = 60;
  ballmesh = new THREE.Mesh(ballgeo, ballmat);
  ballmesh.name = 'Ball'

  scene.add(ballmesh);
  ballmesh.castShadow = true;
  ballmesh.receiveShadow = true;
  roadgeo = new THREE.PlaneGeometry(5, 5000, 5, 1400);
  if (basic == false) {
    roadmat = new THREE.MeshPhongMaterial({ color: 'blue', wireframe: false });
  } else {
    roadmat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
  }
  roadmat.side = THREE.DoubleSide;
  roadmesh = new THREE.Mesh(roadgeo, roadmat);
  roadmesh.position.z = -2500;
  roadmesh.receiveShadow = true;
  roadmesh.rotation.x = Math.PI / 2;
  roadmesh.position.y = -1;
  roadmesh.name = 'road';
  scene.add(roadmesh);
  camera.position.z = 5;

  createObstacles();
  createPowerups();
  /*
  csm = new CSM({
    maxFar:100,
    cascades:4,
    mode:'practical',
    parent:scene,
    shadowMapSize:512,
    lightDirection:new THREE.Vector3(-.5,-1,1).normalize(),
    camera:camera,
    lightIntensity:.6
  });
  csm.setupMaterial(roadmat);
  csm.setupMaterial(ballmat);
  csm.setupMaterial(powerupmat);
  csm.setupMaterial(obstaclemat);
  */
  animate();
  // ESCRIPT.THREE();
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
var lastPos;
function projectPosition(x, z) {
  var vector = new THREE.Vector3();
  vector.x = x;
  vector.z = z;
  vector.project(camera);
  var newVector = new THREE.Vector3();
  newVector.z = vector.z;
  vector.x = (vector.x + 1) * canvas.width / 2;
  vector.y = - (vector.y - 1) * canvas.height / 2;
  newVector.x = vector.x;
  newVector.y = vector.y;
  vector.z = 0;
  return newVector;
}
function animate() {

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (counting == false) {

  } else {
    var coords = projectPosition(ballmesh.position.x, ballmesh.position.y, ballmesh.position.z);
    ctx.fillText(timeLeft + 's', coords.x - 10, canvas.height / 2 + 12);
  }
  timeLeft = ((6000 - (performance.now().toFixed(2) - startTime).toFixed(2)) / 1000).toFixed(2);
  if (timeLeft < 4) {
    ctx.fillStyle = 'yellow';
  }
  if (timeLeft < 2) {
    ctx.fillStyle = 'red'
  }
  if (timeLeft > 4) {
    ctx.fillStyle = 'green';
  }
  //countdown.innerText = (timeLeft)+'s';

  //csm.update();
  TWEEN.update();
  dist.innerHTML = ballmesh.position.z;
  if (lastPos != ballmesh.position.z) {
    lastPos = ballmesh.position.z;
  }
  if (!died) {
    if (started) {
      scored = Math.abs(ballmesh.position.z)
      score.innerHTML = 'Score: ' + (scored / 10).toFixed(1.1);
    }
    if (keys['a'] || keys['ArrowLeft']) {
      akey = true;
      dkey = false;
      if (ballmesh.position.x > -2) {
        ballmesh.position.x -= Math.abs(rollSpeed * Math.PI / 10);
      }
      turnSpeed += 0.0002;
      rollSpeed -= 0.00005;
    }
    if (keys['d'] || keys['ArrowRight']) {
      dkey = true;
      akey = false;
      if (ballmesh.position.x < 2) {
        ballmesh.position.x += Math.abs(rollSpeed * Math.PI / 10);
      }
      turnSpeed -= 0.0002;
      rollSpeed -= 0.00005;
    }
    if (keys['w'] || keys['ArrowUp']) {
      moving = true;
      if (rollSpeed < .4) {
        rollSpeed += 0.0005;
      } else {

      }
      ballmesh.position.z -= Math.abs(rollSpeed * Math.PI / 10);
      setTimeout(function () { moving = false }, 100);
      if (ballmesh.rotation.y > 0) {
        ballmesh.rotation.y -= 0.001;
      } else {
        ballmesh.rotation.y += 0.001;
      }

    }
  }


  var Player = ballmesh;

  for (var vertexIndex = 0; vertexIndex < Player.geometry.vertices.length; vertexIndex++) {
    var localVertex = Player.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(Player.matrix)
    var directionVector = globalVertex.sub(Player.position);

    var ray = new THREE.Raycaster(Player.position, directionVector.clone().normalize());

    collisionResults = ray.intersectObjects(obmesh);
    var collisionResultsPowerup = ray.intersectObjects(powermesh);

    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      // console.write(collisionResults[0].object.name);
      if (collisionResults[0].object.name === 'obstacle' && isInv == false) { // obstacle & is not invincible
        die();
      }
    }
    if (collisionResultsPowerup.length > 0 && collisionResultsPowerup[0].distance < directionVector.length()) {
      // console.write(collisionResults[0].object.name);
      if (collisionResultsPowerup[0].object.name === 'shrink-powerup') {
        ballmesh.scale.set(.4, .4, .4);
        onPowerup = true;
        countdown.style.color = 'green';
        countdown.innerText = '6.00s'
        timeLeft = 6000;
        startTime = performance.now().toFixed(2);
        counting = true;
        setTimeout(function () {
          ballmesh.scale.set(1, 1, 1);
          onPowerup = false;
          timeLeft = 0;
          startTime = 0;
          counting = false;
        }, 6000);

      } else if (collisionResultsPowerup[0].object.name === 'inv-powerup') {
        if (onPowerup == false) {
          invMat(.7);
          onPowerup = true;
          countdown.style.color = 'green';
          countdown.innerText = '6.00s';
          isInv = true;
          timeLeft = 6000;
          startTime = performance.now().toFixed(2);
          counting = true;
          setTimeout(function () {

            onPowerup = false;
            timeLeft = 0;
            startTime = 0;
            isInv = false;
            invMat(1);
            counting = false;
          }, 6000);
        }
      }
    }
  }

  movingObject();

  //ballmesh.rotation.y+=turnSpeed;
  if (moving != true) {
    if (ballmesh.rotation.x > 0) {
      ballmesh.rotation.x -= 0.001;
    }
    else {
      ballmesh.rotation.x += 0.001;
    }
  }
  if (started) {
    if (!died) {
      ballmesh.position.z -= Math.abs(rollSpeed * Math.PI / 5);//decelerate
    }
  }
  if (!died) {
    ballmesh.rotation.y += turnSpeed;
    ballmesh.rotation.x += rollSpeed;
    camera.position.x = ballmesh.position.x;

    camera.position.y = ballmesh.position.y + 3;

    camera.position.z = ballmesh.position.z + 3;
    spotlight.position.x = ballmesh.position.x - 3;
    spotlight.position.y = ballmesh.position.y + 3;
    spotlight.position.z = ballmesh.position.z + 3;
    spotlight.target.position.set(ballmesh.position.x, ballmesh.position.y, ballmesh.position.z)
    spotlight.target.updateMatrixWorld();
  }
  camera.lookAt(ballmesh.position);
  renderer.render(scene, camera);
}
var obmesh = [];
var powermesh = [];
init();
var moving = false;
var started = false;
function die() {
  if (died == false) {
    died = true;
    document.getElementById('death_message').innerHTML = 'Yikes! <a href="#!" onclick="window.location.reload()" style="color:white;">Try Again</a> .. Score:' + (scored / 10).toFixed(1);
    //camera pan down slow
    var max = -5;
    var py = camera.position.y;
    var pz = camera.position.z
    var i = camera.position.x;
    var id = false;
    function panDown() {

      function innerDown() {
        if (id == false) {
          if (i > max) {
            requestAnimationFrame(innerDown);
            i -= .1;
            camera.position.set(i, py, pz)


          } else {
            id = true;
          }
        }

      }
      innerDown();
    }
    panDown();

  }
}
window["startGame"] = function () {
  //rollSpeed = -0.01;
  startkeys();
  started = true;
  title1.style.display = 'none';
}

setInterval(function () {
  obmesh = [];
  powermesh = [];
  for (var i = 0; i < obstaclemeshes.length; i++) {
    var ele = obstaclemeshes[i];
    if (ele) {
      if (ESCRIPT.Range(ele.position.z, ballmesh.position.z, ballmesh.position.z - 30)) {
        obmesh.push(ele);
      } else {


      }
    }
  }
  for (var i = 0; i < powerupmeshes.length; i++) {
    var ele = powerupmeshes[i];
    if (ele) {
      if (ESCRIPT.Range(ele.position.z, ballmesh.position.z, ballmesh.position.z - 10)) {
        powermesh.push(ele);
      } else {
        if (powermesh.indexOf(ele) != -1) {
          powermesh.splice(powermesh.indexOf(ele), 1);//optimize
          if (ele.position.z < (ballmesh.position.z - 10)) {
            scene.remove(ele);
            ele.geometry.dispose();
            ele.material.dispose();
          }
        }

      }
    }
  }
  if (ballmesh.position.z < -4999) {
    alert('No way! You finished!')

  }
}, 1000);
var collisionResults;
var stilljumping = false;
var akey = false;
var dkey = false;
function startkeys() {
  window.addEventListener('keydown', function (event) {
    const key = event.key;
    keys[event.key] = true;
    if (!died) {

      if (key === 's' || key == 'ArrowDown') {
        moving = true;
        ballmesh.position.z += Math.abs(rollSpeed * Math.PI / 10);
        if (ballmesh.rotation.x > 0) {
          rollSpeed -= 0.001;
        } else {
          rollSpeed += 0.001;
        }
        moving = false;
        if (ballmesh.rotation.y > 0) {
          ballmesh.rotation.y -= 0.001;
        } else {
          ballmesh.rotation.y += 0.001;
        }
      }

      if (key === ' ') {

        if (stilljumping === false) {
          stilljumping = true;
          //Can jump
          var fr = { y: ballmesh.position.y };
          var to = { y: ballmesh.position.y + 5 }
          var tween = new TWEEN.Tween(fr).to(to, 250).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
            ballmesh.position.y = fr.y;
          }).onComplete(function () {
            to = { y: ballmesh.position.y }
            fr = { y: ballmesh.position.y - 5 };
            var tween2 = new TWEEN.Tween(to).to(fr, 250).easing(TWEEN.Easing.Quadratic.In).onUpdate(function () {
              ballmesh.position.y = to.y;
            }).start().onComplete(function () { stilljumping = false; });
          }).start();
        }

      } if (key === 'Shift') {
        function duck() {
          if (ballmesh.position.y > 0) {
            ballmesh.position.y -= .1;
            setTimeout(duck, 10);
          }
        }
        duck();
      }
    }
  })
}
document.body.addEventListener('keyup', function (e) {
  keys[e.key] = false;
})



window["changeMaterial"] = function (val) {
  var shininess = val == true ? 120 : 0;

  for (var i = 0; i < scene.children.length; i++) {
    if (scene.children[i].material != undefined) {
      scene.children[i].material.shininess = shininess;
      var obj = scene.children[i];
    }
  }
}
function invMat(op) {
  ballmesh.material.opacity = op; // invincible
}



