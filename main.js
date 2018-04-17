var cubeRotation = 0.0;
var tunnelRotation = 0.0;
var tunnelTranslation = 0.0;


var obstacle1Rotation = 0.0;
var obstacle1Translation = 0.0;
var obstacle1Translationy = 0.0;

var obstacle2Rotation = 0.0;
var obstacle2Translation = 0.0;
var obstacle2Translationy = 0.0;

var obstacle3Rotation = 0.0;
var obstacle3Translation = 0.0;
var obstacle3Translationy = 0.0;
var collision =0;var count_jump =0;
var Translationy = 0.0;

var tunnelspeed=0;
var tunnel_acc=0;
var score=0;
var collision_counter=0;
 

  // Creates all lines:
  // for(var i=0; i < 1100; i++){

  //     // Creates an empty line
  //     obs1.push([]);
  //    // obs2.push([]);

  //     // Adds cols to the empty line:
  //     // obs1[i].push( new Array());
  //     // obs2[i].push( new Array());

  //     for(var j=0; j < 2; j++){
  //       // Initializes:
  //       obs1[i].push(1.0);
  //       // obs1[i].push(1.0);
  //     }

const canvas = document.querySelector('#glcanvas');

const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

//
var rand=[];
for (var i = 0; i < 1100; i++)
{
    rand.push(Math.floor(Math.random() * 8));
}

main();

//
// Start here
//
function main() {

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
 //===================================================================================
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec2 texCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;
    varying highp vec2 vTexCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
      
      vTexCoord = texCoord;
    }
  `;


  const vsSource1 = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec2 texCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;
    varying highp vec2 vTexCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
      //@@
      vTexCoord = texCoord;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    varying highp vec2 vTexCoord;

    uniform sampler2D uSamp;

    void main(void) {
      // gl_FragColor = vColor;
      gl_FragColor = texture2D(uSamp, vTexCoord);
    }
  `;


   const fsSource1 = `
    varying lowp vec4 vColor;

    varying highp vec2 vTexCoord;

    uniform sampler2D uSamp;

    void main(void) {
      // gl_FragColor = vColor;
      gl_FragColor = texture2D(uSamp, vTexCoord);
    }
  `;
 //END===================================================================================

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
   const shaderProgram1 = initShaderProgram(gl, vsSource1, fsSource1);
 //===================================================================================
 
  
  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      vertexTexture: gl.getAttribLocation(shaderProgram, 'texCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      textureSampler: gl.getUniformLocation(shaderProgram, 'uSamp'),
    },
  };

   const programInfo1 = {
    program: shaderProgram1,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram1, 'aVertexColor'),
      vertexTexture: gl.getAttribLocation(shaderProgram1, 'texCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
      textureSampler: gl.getUniformLocation(shaderProgram1, 'uSamp'),
    },
  };
 //END===================================================================================

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initCube(gl);
    const buffer1 = initTunnel(gl);
    const buffer2 = initObstacle1(gl);
    const buffer3 = initObstacle2(gl);
     const buffer4 = initObstacle3(gl);


  var then = 0;
  const texture = loadTexture(gl, 'check.png');
 const texture1 = loadTexture(gl, 'obs1.jpg  ');
  
  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    score++;

    if(collision==1)
    {
      collision=2;
      collision_counter=20;
      alert('score :'+ score +'\n'+
        'game over');
      score=0;


    }

    if(collision_counter>0)
    {
      collision_counter--;
    }

    if(collision_counter==0)
    {
      collision=0;
    }


      Mousetrap.bind('d', function()
      {
        tunnelRotation-=0.06;
        obstacle1Rotation-=0.06;
         obstacle2Rotation-=0.06;
          obstacle3Rotation-=0.06;

      });
      Mousetrap.bind('a', function() { tunnelRotation+=0.06; obstacle1Rotation+=0.06 ;obstacle2Rotation+=0.06;obstacle3Rotation+=0.06});


        
        Mousetrap.bind('space', function()
      {
          if(count_jump==0){
        tunnelspeed=-0.25;
        tunnel_acc=0.01;
        count_jump=51;
      }
        
      });
      
      if(count_jump>0)
      {
        Translationy+=tunnelspeed;
        tunnelspeed+=tunnel_acc;
              count_jump--;

      }
      if(count_jump<=0)
      {
        Translationy=0;
        tunnelspeed=0;
        tunnel_acc=0;
        count_jump=0;
      }
      



      tunnelTranslation+=0.2;
      obstacle1Translation+=0.2;
       obstacle2Translation+=0.2;
          obstacle3Translation+=0.2;
      // obstacle2Rotation+=(0.000000002)%360.0;



      drawScene_obstacle1(programInfo, buffer2, deltaTime, texture1);
     drawScene_obstacle2(programInfo, buffer3, deltaTime,texture);
       drawScene_obstacle3(programInfo, buffer4, deltaTime,texture);
       drawScene_tunnel(programInfo, buffer1, deltaTime, texture1);

     // drawScene_cube( programInfo, buffers, deltaTime, texture);


      requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


 //===================================================================================

function powerOf2(a) {
  return (a & (a - 1)) == 0;
}

function loadTexture(gl, path) {
  tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  defCol = new Uint8Array([245, 12, 17, 255]) // RGBA
  // textureType, level, colorScheme, width, height, border, sourceFormat, sourceType, colorArray or Texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, defCol);
  img = new Image();
  img.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // textureType, level, colorScheme, sourceFormat, sourceType, image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    // Check if image width and height are power of 2 or not
    // WebGL treats textures with power of 2 differently
    if(powerOf2(img.width) && powerOf2(img.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  }
  img.src = path;

  return tex;
}
 //END===================================================================================

//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

