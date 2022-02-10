ESCRIPT = function () {
  //console.log('EasyScript loaded')
  // filler
}
ES = ESCRIPT;
ESCRIPT.CreateDebug = function(){
  var ele = document.createElement('div');
  ele.setAttribute('style','position:absolute;top:50;left:50;overflow-y:auto;overflow-x:auto;height:250px;width:200px;font-family:Arial;font-size:12px;z-index:999999999999;border:1px solid black;background-color:ghostwhite;color:black');
  ele.setAttribute('id','debugele');
  document.body.appendChild(ele);
  return ele;
}
ESCRIPT.Debug = function(str){
  if(document.getElementById('debugele')!=null){
    if(document.getElementById('debugele').innerHTML.length>5000){
    document.getElementById('debugele').innerHTML = document.getElementById('debugele').innerHTML.slice(0,100);
  }
  document.getElementById('debugele').scrollBy({left:0,top:1000000})
  document.getElementById('debugele').innerHTML+='<br>'+str;
  
  }
}
ESCRIPT();
ESCRIPT.Request = function(url,callback){
  var req = new XMLHttpRequest();
  req.open("GET",url,true);
  req.send();
  req.onreadystatechange = function(){
    if(this.readyState ==4&&this.status==200){
      window[callback](this.responseText);//callback
    }
  }
}
ESCRIPT.Hide = function(idarr){
     for(var i = 0;i<idarr.length;i++){
       document.getElementById(idarr[i]).style.display='none';
       ESCRIPT.Debug('Hid element : '+ idarr[i]);
       
   }
}
ESCRIPT.GetClassGroup = function(classe){
  ESCRIPT.Debug('Returned class group');
return document.getElementsByClassName(classe)
}
ESCRIPT.GetElement = function (id) {
  var elementz = document.getElementById(id);
  if (elementz === null) {
    ESCRIPT.Debug('Element non-existent')
    console.error('ESCRIPT: Element does not exist');
    //alert("ESCRIPT: \n Specified element does not exist");
  }
  if (elementz != undefined) {
    if (elementz === null) {
      ESCRIPT.Debug('Strange parsing error occured. ???');
     // alert('ESCRIPT: Wut?');
    } else {
      ESCRIPT.Debug('Returning element: '+id)
      return elementz;
    }
  }
}
ESCRIPT.GetClass = function (classe, no) {
  var elementz = document.getElementsByClassName(classe)[no];
  ESCRIPT.Debug('Getting class element : '+classe+' #'+no);
  if (elementz === null) {
    ESCRIPT.Debug('Element doesnt exist, GetClass');
    console.error('ESCRIPT: Element does not exist');
   // alert("ESCRIPT: \n Specified element does not exist");
  }
  if (elementz != undefined) {
    if (elementz === null) {
      ESCRIPT.Debug('Strange parse error, getclass')
      //alert('ESCRIPT: Wut?');
    } else {
      ESCRIPT.Debug('Get class element # sucess')
      return elementz;
    }
  }
}
ESCRIPT.Open = function (id) {
  var elementz = ESCRIPT.GetElement(id);
  if (elementz.style.display === 'none') {
    elementz.style.display = 'block';
    ESCRIPT.Debug('Showing element '+id);
  } else {
    elementz.style.display = 'none';
    ESCRIPT.Debug('Hiding element '+id);
  }
}

ESCRIPT.Write = function (id, txt) {
  var elementz;
  try {
    elementz = document.getElementById(id);
    elementz.innerHTML += txt;
    console.log('Added text to '+id+' via Write:<br>String:'+txt)
  }
  catch (egg) {
    try {
      elementz = id;
      elementz.innerHTML += txt;
    } catch (egg) {
      ESCRIPT.Debug('Strange error occured. Element dissapeared, Write');
     // alert('Youre in big twouble');
    }
  }
}
ESCRIPT.Text = function (id, txt) {
  var elementz;
  try {
    ESCRIPT.Debug('Added '+txt+' to '+id+':Text')
    elementz = document.getElementById(id);
    elementz.textContent += txt;
  }
  catch (egg) {
    try {
      elementz = id;
      elementz.textContent += txt;
      ESCRIPT.Debug('Try 2: Text');
    } catch (egg) {
      ESCRIPT.Debug('Weird parsing err');
    //  alert('Youre in big twouble');
    }
  }
}
ESCRIPT.Disp = function (id, txt) {
  var elementz;
  try {
    elementz = document.getElementById(id);
    elementz.textContent = txt;
    ESCRIPT.Debug('Added '+txt+' as textContent to '+id)
  }
  catch (egg) {
    try {
      elementz = id;
      elementz.textContent = txt;
      ESCRIPT.Debug('Try 2 to add textcontent??')
    } catch (egg) {
      //alert('Youre in big twouble');
      ESCRIPT.Debug('Parsing errrrrr');
    }
  }
}

ESCRIPT.Prepend = function (id, txt) {
  var elementz = ESCRIPT.GetElement(id);
  var prependMe = document.createElement('span');
  prependMe.innerHTML = txt;
  elementz.prepend(prependMe);
  ESCRIPT.Debug('PRepended '+txt+'to '+id)
}
ESCRIPT.TypeWrite = function (id, txt, speed) {
  var elementz = ESCRIPT.GetElement(id);
  var i = 0;
  ESCRIPT.Debug('typewriting '+txt+'<Br>to '+id+'@'+speed)
  function typeWrite() {
    if (i < txt.length) {
      elementz.innerHTML += txt[i];
      ESCRIPT.Debug('typewriting : '+txt[i]);
      i++;
      setTimeout(typeWrite, speed);
    }
  }
  typeWrite();
  ESCRIPT.Debug('starting typewrite');
}


ESCRIPT.Range = function (x, min, max) {
  ESCRIPT.Debug('Printing normalized range: VAL:'+x+'&MIN:'+min+'&MAX:'+max);
  return ((x - min) * (x - max) <= 0);
}
// ...
/*
if (between(x, 0.001, 0.009)) {
  // something
}
*/


ESCRIPT.CurrentTime = '';


ESCRIPT.Time = function (id) {
  setInterval(function () {
    var d = new Date();
    var h = d.getHours();
    //var h = 12;
    var m = d.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    var s = d.getSeconds();
    if (s < 10) {
      s = '0' + s;
    }
    ESCRIPT.CurrentTime = h + ":" + m + ":" + s;
    if (h != 12 && h < 12) {
      ESCRIPT.CurrentTime = h + ":" + m + ":" + s;
      ESCRIPT.CurrentTime += ' AM';
    }
    if (h > 12) {
      h -= 12;
      ESCRIPT.CurrentTime = h + ":" + m + ":" + s;
      ESCRIPT.CurrentTime += ' PM';
    }
    if (h === 12) {
      ESCRIPT.CurrentTime = h + ":" + m + ":" + s;
      ESCRIPT.CurrentTime += ' PM';
    }

    ESCRIPT.GetElement(id).textContent = ESCRIPT.CurrentTime;
    ESCRIPT.Debug('Printing time:'+ESCRIPT.CurrentTime+' to '+id);
  }, 1000);
  ESCRIPT.Debug('Started print time');
}


ESCRIPT.FloatBottom = function (id) {
  var ele = ESCRIPT.GetElement(id);
  ESCRIPT.Debug('Floating bottom of '+id);
  setInterval(function () {
    ele.style.top = (window.innerHeight - ele.offsetHeight) + 'px';
    //console.log(ele.style.top);
  }, 1);
}


ESCRIPT.Color = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  var str = 'rgb(' + r + ',' + g + ',' + b + ')';
  ESCRIPT.Debug('Generated color '+str);
  return str;
}



ESCRIPT.Key = function (element, evalcode, keyName) {
  ESCRIPT.Debug('Creating listener for '+element+' for key '+keyName);
  element.addEventListener('keydown', function (event) {
    const key = event.key;
    ESCRIPT.Debug('Key pressed in ele: '+key);
    if (key === keyName) {
      try {
        // eval(evalcode);
        //console.log(evalcode);
        eval(evalcode);
        ESCRIPT.Debug('Evaluating code for keypess');
      } catch (err) {
        console.error('ESCRIPT:' + err);
        ESCRIPT.Debug('Failed to evaluate code for keypress '+keyName)
      }
    }
  });
}


ESCRIPT.Wait = function (code, time) {
  ESCRIPT.Debug('Starting wait function in '+time);
  setTimeout(function () {
    try {
      eval(code);
      ESCRIPT.Debug('SUccesfully ran code in Wait');
    } catch (err) {
      console.error(err);
      ESCRIPT.Debug('Failed to evalin'+time);
    }
  }, time);
}


ESCRIPT.Stats = function (id) {

  if (renderer === undefined) {
    console.error('ESCRIPT:No webGL renderer detected.');
  } else {
    const ele = ESCRIPT.GetElement(id);
    var eles = [];
    ele.style.height = '100px';
    ele.style.width = '200px';
    ele.style.backgroundColor = 'black';
    ele.style.fontFamily = 'sans-serif';
    ele.style.position = 'absolute';
    ele.style.left='0';
    ele.style.top='0';
    ele.style.margin = '20px';
    ele.style.zIndex = '99999';
    //ele.style.top = '20%';
    ele.style.color = 'white';
    var newfps;
    var innerele = document.createElement('div');
    ele.appendChild(innerele);
    var mapele = document.createElement('div');
    ele.appendChild(mapele);
    //mapele.style.width = '100%';
    mapele.style.height = "90%";
    mapele.style.backgroundColor = 'gray';
    //mapele.innerHTML = 'Eek';
    function fpscheck() {
      var lastfps = renderer.info.render.frame;
      setTimeout(function () {
        if (eles.length > 200) {
          mapele.innerHTML = '';
          eles = [];
        }
        newfps = renderer.info.render.frame - lastfps;
        innerele.innerHTML = '<p>' + newfps + ' FPS';
        var newele = document.createElement('div');
        eles.push(newele);
        newele.style.width = '1px';

        newele.style.height = (newfps) + 'px';
        newele.style.backgroundColor = 'blue';
        newele.style.float = 'left';
        //console.log(mapele.getBoundingClientRect().width);
        //ESCRIPT.SpecialFloatBottom(mapele,newele);
        mapele.appendChild(newele);
        fpscheck();

      }, 1000);
    }
    fpscheck();
  }
}
ESCRIPT.Color2 = function () {
  ESCRIPT.Debug('Printing random Hex color');
  return Math.random * 0xffffff;
}
ESCRIPT.Rotate = function (deg) {
  ESCRIPT.Debug('Converting '+deg+'to radians');
  return (Math.PI / 180) * deg;
}

ESCRIPT.Canvas3D = function () {
  //canvas3d
  console.log('EASYSCRIPT:Loading Canvas3D.');
  ESCRIPT.DOMCanvas = ESCRIPT.GetElement('ESCRIPT_Canvas3D');
  ESCRIPT.Canvas3D.Find = function (name) {
    for (var i = 0; i < ESCRIPT.Canvas3D.ObjectIndex.length; i++) {
      var object = ESCRIPT.Canvas3D.ObjectIndex[i];
      if (object.name != undefined) {
        if (object.name === name) {
          return object;
        }
      }
    }
  }
  if (ESCRIPT.DOMCanvas === null) {
    console.error('EASYSCRIPT:No canvas element with an id "ESCRIPT_Canvas3D" found.');
  } else {
    ESCRIPT.Canvas3D.CurrentFrame=0;
    ESCRIPT.Canvas3D.LastFrameCount = 0;
    ESCRIPT.Canvas3D.LastFrameTime=0;
    ESCRIPT.Canvas3D.GravityY = .99;
    ESCRIPT.Canvas3D.GravityBounce = .25;
    ESCRIPT.Canvas3D.CTX = ESCRIPT.DOMCanvas.getContext('2d');
    ESCRIPT.Canvas3D.HIDPI = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1)
        return true;
    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
        return true;
    return false;
    
    };
    ESCRIPT.DOMCanvas.rheight = ESCRIPT.DOMCanvas.height;
    ESCRIPT.DOMCanvas.rwidth = ESCRIPT.DOMCanvas.width;
    ESCRIPT.Canvas3D.Double =false;
    
    if(ESCRIPT.Canvas3D.HIDPI()===true){
      //retina display detected!
      var orgHeight = ESCRIPT.DOMCanvas.height;
      var orgWidth = ESCRIPT.DOMCanvas.width;
      var newHeight = orgHeight*2;
      var newWidth = orgWidth*2;
      ESCRIPT.DOMCanvas.height = newHeight;
      ESCRIPT.DOMCanvas.width = newWidth;
      ESCRIPT.DOMCanvas.style.height = orgHeight+'px';
      ESCRIPT.DOMCanvas.style.width = orgWidth+'px';
      ESCRIPT.DOMCanvas.getContext('2d').scale(2,2);
      ESCRIPT.Canvas3D.Double = true;
      ESCRIPT.DOMCanvas.rheight = orgHeight;
      ESCRIPT.DOMCanvas.rwidth = orgWidth;
      console.log('ESCRIPT.Canvas3D: Retina display detected.');
    }
    
    ESCRIPT.Canvas3D.CreateCamera = function () {
      ESCRIPT.Canvas3D.Camera = 'Canvas3D-EasyScript';
      ESCRIPT.Canvas3D.Camera = { x: 0, y: 0, z: 0, rangex: 10, rangey: 10, rangez: 10 };
      ESCRIPT.Canvas3D.Camera.setPos = function (x, y, z) {
        ESCRIPT.Canvas3D.Camera.x = x;
        ESCRIPT.Canvas3D.Camera.y = y;
        ESCRIPT.Canvas3D.Camera.z = z;
      }
      ESCRIPT.Canvas3D.Camera.setRange = function (x, y, z) {
        ESCRIPT.Canvas3D.Camera.rangex = x;
        ESCRIPT.Canvas3D.Camera.rangey = y;
        ESCRIPT.Canvas3D.Camera.rangez = z;
      }
    }
    ESCRIPT.Canvas3D.CompensateDistance = function(object){
      var x = object.x;
      var y = object.y;
      var cam ={
        min:{
          x:ESCRIPT.Canvas3D.Camera.x,
          y:ESCRIPT.Canvas3D.Camera.y,
        },
        max:{
          x:ESCRIPT.Canvas3D.Camera.rangex+ESCRIPT.Canvas3D.Camera.x,
          y:ESCRIPT.Canvas3D.Camera.rangey+ESCRIPT.Canvas3D.Camera.y,
        }
      }
    if(x>=cam.min.x&&x<=cam.max.x){
      //in viewport
    }else{
      if(x<cam.min.x){
        //out left
        var newX = x+cam.min.x;
      
      //  object.x=(newX);
     //  object.draw();
      }
      else if(x>cam.max.x){
        //out right
        var newX = x-cam.max.x;
        //console.log(newX);
        //var dist = cam.max.x+newX;
        //console.log(dist)
      //  object.x=(newX);
       // object.draw();

      }
    }
    if(y>=cam.min.y&&y<=cam.max.y){
      //in viewport
    }else{
      //out of range
    }
    }
    ESCRIPT.Canvas3D.DistanceCalculation = function (object) {
      
      var origin_width = object.width;
      var origin_height = object.height;
      var cam = ESCRIPT.Canvas3D.Camera;
      if(Math.sign(cam.z)===1){
      var camera_distX = origin_width - (object.z + ESCRIPT.Canvas3D.Camera.z);
      var camera_distY = origin_height - (object.z + ESCRIPT.Canvas3D.Camera.z);
      }if(Math.sign(cam.z)===-1){
        var camera_distX = origin_width - (object.z - ESCRIPT.Canvas3D.Camera.z);
      var camera_distY = origin_height - (object.z - ESCRIPT.Canvas3D.Camera.z);
      }       
      if(Math.sign(cam.z)===0){
          var camera_distX = origin_width - (object.z - ESCRIPT.Canvas3D.Camera.z);
      var camera_distY = origin_height - (object.z - ESCRIPT.Canvas3D.Camera.z);
        }
      object.width = camera_distX;
      object.height = camera_distY;
      object.draw();
    //  ESCRIPT.Canvas3D.RotateObj(object)//experiment
      object.width = origin_width;
      object.height = origin_height;
    }
    ESCRIPT.Canvas3D.VelocityCalculation = function (object) {
      var vx = object.vx;
      var vy = object.vy;
      if(object.mass===undefined){
        object.mass=1;
       
      }
      if(object.mult===undefined){
        object.mult=1;
      }
      //ESCRIPT.Canvas3D.AngleOfRotation=0;
      var canvas = ESCRIPT.DOMCanvas;
      // get possible velocity of object
      if (object.vx != undefined) {
        if (object.vy != undefined) {
          //object has velocity
          
          object.x += vx;
          //bouncing x object
          object.y += vy;
          object.vy *= ESCRIPT.Canvas3D.GravityY;
          object.vy += ESCRIPT.Canvas3D.GravityBounce;
          var endY = object.y;
          var endX = object.x;
          //basic mass calculation, can be changed later
          if (endY > (canvas.height-(object.height*object.mult)) ||
            endY < 0) {
            //check bounds of object and canvas in y
            object.vy = object.vy/(object.mass*2);
            object.vx = object.vx/(object.mass*1.1);
            object.vy = -object.vy;
            // bounce up again
            //object.vx = -object.vx;//PROTOTYPE turn opposite
          }

          if (endX > (canvas.width-object.width) ||
            endX < 0) {
            //check bounds of object and canvas in x
            object.vx = object.vx/(object.mass*2);
            object.vy = object.vy/(object.mass*1.1)
            object.vx = -object.vx;
            //bounce left/right
          }
        
        }
      }

    }
    console.log('EASYSCRIPT Canvas3D Renderer 2.0');
    ESCRIPT.Canvas3D.Render = function (bool,x,y) {
      
      ESCRIPT.Canvas3D.Frametime =performance.now()-ESCRIPT.Canvas3D.LastFrameTime;
      
      //this is the render calculations
      ESCRIPT.Canvas3D.CTX.clearRect(0, 0, ESCRIPT.DOMCanvas.rwidth, ESCRIPT.DOMCanvas.rheight);
      ESCRIPT.Canvas3D.CTX.setTransform(1,0,0,1,0,0);//reset transforms

      try {
        var camera = ESCRIPT.Canvas3D.Camera;
        for (var i = 0; i < ESCRIPT.Canvas3D.ObjectIndex.length; i++) {
          //run through object list
          var object = ESCRIPT.Canvas3D.ObjectIndex[i];
          //get the current object
          if (object != undefined) {
            //if the object exists
            if(object.freezeAnim===undefined){
                  ESCRIPT.Canvas3D.VelocityCalculation(object);
                  }
                  object.draw();
                  ESCRIPT.Debug('Drawing object:'+i)

                  /* IGNORE
            //get the camera
            if (ESCRIPT.Range(object.x, camera.x, camera.x + camera.rangex)) {
              //visible to camera x range
              if (ESCRIPT.Range(object.y, camera.y, camera.y + camera.rangey)) {
                //visible to camera y range
                if (ESCRIPT.Range(object.z, camera.z, camera.z + camera.rangez)) {
                  //draw
                  
                  //ESCRIPT.Canvas3D.DistanceCalculation(object);
                } else {
                  //blank
                //  ESCRIPT.Canvas3D.CompensateDistance(object);
                }
              } else {
                //blank
               // ESCRIPT.Canvas3D.CompensateDistance(object);
              }
            } else {
              //blank
              //ESCRIPT.Canvas3D.CompensateDistance(object);
            }
          */


          }
        }
      } catch (err) {
        console.error(err)//render error catching

      };
      ESCRIPT.Canvas3D.CurrentFrame+=1;
      ESCRIPT.Canvas3D.LastFrameTime = performance.now();
      
    }
    ESCRIPT.Canvas3D.ObjectIndex = [];
    ESCRIPT.Canvas3D.Rect = function (left, top, z, height, width, color, name,mult, vx, vy,mass) {
      var vars = {
        id: (ESCRIPT.Canvas3D.ObjectIndex.length),
        x: left,
        y: top,
        z: z,
        vx: vx,
        vy: vy,
        height: height,
        width: width,
        color: color,
        type: 'rect',
        name: name,
        mass:mass,
        mult:mult,
        draw: function () {
          ESCRIPT.Canvas3D.CTX.beginPath();
          ESCRIPT.Canvas3D.CTX.fillStyle = this.color;
          ESCRIPT.Canvas3D.CTX.fillRect(this.x, this.y, this.width, this.height);
          ESCRIPT.Canvas3D.CTX.stroke();
          ESCRIPT.Canvas3D.CTX.closePath();
          ESCRIPT.Canvas3D.CTX.fill();
        }
      }
      ESCRIPT.Canvas3D.ObjectIndex.push(vars);
      return ESCRIPT.Canvas3D.ObjectIndex[ESCRIPT.Canvas3D.ObjectIndex.indexOf(vars)];
    }

    ESCRIPT.Canvas3D.Circ = function (left, top, z, height, width, hex, name,mult, vx, vy,mass) {
      var vars = {
        id: (ESCRIPT.Canvas3D.ObjectIndex.length),
        x: left,
        y: top,
        z: z,
        vx: vx,
        vy: vy,
        height: height,
        width: width,
        color: hex,
        type: 'circ',
        name: name,
        mass:mass,
        mult:mult,
        draw: function () {
          ESCRIPT.Canvas3D.CTX.beginPath();
          ESCRIPT.Canvas3D.CTX.fillStyle = this.color;
          ESCRIPT.Canvas3D.CTX.arc(this.x, this.y, this.height, this.width, 360 * Math.PI);
          ESCRIPT.Canvas3D.CTX.stroke();
          ESCRIPT.Canvas3D.CTX.closePath();
          ESCRIPT.Canvas3D.CTX.fill(); // comment for no fill color
        }
      }
      ESCRIPT.Canvas3D.ObjectIndex.push(vars);
      return ESCRIPT.Canvas3D.ObjectIndex[ESCRIPT.Canvas3D.ObjectIndex.indexOf(vars)];
    }

    ESCRIPT.Canvas3D.Image = function (left, top, z, height, width, src, name,mult, vx, vy,mass) {
      try {
        var image = new Image();
        image.src = src;
       // image.onload = function () { ignore
          ESCRIPT.Canvas3D.CTX.drawImage(image, left, top, height, width);
          var vars = {
            id: (ESCRIPT.Canvas3D.ObjectIndex.length),
            x: left,
            y: top,
            z: z,
            vx: vx,
            vy: vy,
            height: height,
            width: width,
            type: 'image',
            src: src,
            image: image,
            name: name,
            mass:mass,
            mult:mult,
            draw: function () {
              // var image = new Image();
              // image.src = this.src;
              //image.onload = function() {

              ESCRIPT.Canvas3D.CTX.drawImage(this.image, this.x, this.y, this.height, this.width);
                
            }
          }
          ESCRIPT.Canvas3D.ObjectIndex.push(vars);
          return ESCRIPT.Canvas3D.ObjectIndex[ESCRIPT.Canvas3D.ObjectIndex.indexOf(vars)];
        
      } catch (err) {
        console.log(err);
      }
    }
    // draw an image onto canvas
    // command syntax: image(left,top,height,width,src);
    ESCRIPT.Canvas3D.Text = function (left, top, z, text, color, name, font,mult,vx, vy,mass,mult) {
      try {
      
      ESCRIPT.Canvas3D.CTX.font = font;
      var vars = {
        id: (ESCRIPT.Canvas3D.ObjectIndex.length),
        x: left,
        y: top,
        z: z,
        vx: vx,
        vy: vy,
        type: 'text',
        text: text,
        name: name,
        color: color,
        mult:mult,
        height:ESCRIPT.Canvas3D.CTX.measureText('M').width-8,
        width:ESCRIPT.Canvas3D.CTX.measureText(text).width,
        font:font,
        mass:mass,
        draw: function () {
          ESCRIPT.Canvas3D.CTX.font = this.font;
          ESCRIPT.Canvas3D.CTX.fillStyle = this.color;
          ESCRIPT.Canvas3D.CTX.fillText(this.text, this.x, this.y);
        }
      }
      ESCRIPT.Canvas3D.ObjectIndex.push(vars);
      return ESCRIPT.Canvas3D.ObjectIndex[ESCRIPT.Canvas3D.ObjectIndex.indexOf(vars)];
    }
    catch(er){
      alert(er);
    }
    }
//alert(ESCRIPT.Canvas3D.CTX.font);
  }
}


ESCRIPT.Random = function (min, max) {
  ESCRIPT.Debug('Creating random for min/max');
  return min + Math.random() * (max - min);
}


ESCRIPT.RandomString = function(length){
  var keyboard = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
  var str = '';
  ESCRIPT.Debug('Creating random string w/length '+length);
  for(var i = 0;i<length;i++){
str+=(keyboard[Math.floor(Math.random()*keyboard.length)])
  }
  ESCRIPT.Debug('Random str:'+str);
  return str;
}