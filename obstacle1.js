function initObstacle1(gl) {

    // Create a buffer for the obstacle1's vertex positions.

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the obstacle1.
    //radius of obstacle1 
    var r = 2.5;

    const positions = [
//face1
     -r*Math.tan((45/2)*Math.PI/180.0)/2, r, -1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, r, -1/3,
        - r*Math.tan((45/2)*Math.PI/180.0)/2, -r, -1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, -r, -1/3,

        //face2
        -r*Math.tan((45/2)*Math.PI/180.0)/2, r, 1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, r, 1/3,
        -r*Math.tan((45/2)*Math.PI/180.0)/2, -r, 1/3,
         r*Math.tan((45/2)*Math.PI/180.0)/2, -r, 1/3,
        //face3
        -r*Math.tan((45/2)*Math.PI/180.0)/2, r, -1/3,
        -r*Math.tan((45/2)*Math.PI/180.0)/2, r, 1/3,
        - r*Math.tan((45/2)*Math.PI/180.0)/2, -r, -1/3,
        -r*Math.tan((45/2)*Math.PI/180.0)/2, -r, 1/3,

        //face4

        r*Math.tan((45/2)*Math.PI/180.0)/2, r, -1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, r, 1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, -r, -1/3,
        r*Math.tan((45/2)*Math.PI/180.0)/2, -r, 1/3,


        //face1

        // -r*Math.tan((45/2)*Math.PI/180.0), r, -1,
        // r*Math.tan((45/2)*Math.PI/180.0), r, -1,
        // -r*Math.tan((45/2)*Math.PI/180.0), r, 1,
        // r*Math.tan((45/2)*Math.PI/180.0), r, 1,
        //
        // //face2
        // r*Math.tan((45/2)*Math.PI/180.0), r, -1,
        // r , r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // r*Math.tan((45/2)*Math.PI/180.0), r, 1,
        // r , r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        //
        // //face3
        // r , r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // r , -r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // r , r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        // r , -r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        //
        // //face4
        // r , -r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // r*Math.tan((45/2)*Math.PI/180.0), -r, -1,
        // r , -r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        // r*Math.tan((45/2)*Math.PI/180.0), -r, 1,
        //
        // //face5
        // - r*Math.tan((45/2)*Math.PI/180.0), -r, -1,
        // r*Math.tan((45/2)*Math.PI/180.0), -r, -1,
        // -r*Math.tan((45/2)*Math.PI/180.0), -r, 1,
        // r*Math.tan((45/2)*Math.PI/180.0), -r, 1,
        //
        // //face6
        // -r*Math.tan((45/2)*Math.PI/180.0), -r, -1,
        // -r , -r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // -r*Math.tan((45/2)*Math.PI/180.0), -r, 1,
        // -r , -r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        //
        // //face7
        // -r , r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // -r , -r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // -r , r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        // -r , -r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        //
        // //face 8
        // -r , r*Math.tan((45/2)*Math.PI/180.0), -1 ,
        // -r*Math.tan((45/2)*Math.PI/180.0), r, -1,
        // -r , r*Math.tan((45/2)*Math.PI/180.0), 1 ,
        // -r*Math.tan((45/2)*Math.PI/180.0), r, 1,




    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Now set up the colors for the faces. We'll use solid colors
    // for each face.

    const faceColors = [
        [1.0,  0.6,  0.7,  1.0],
        [1.0,  0.6,  0.7,  1.0],
        [1.0,  0.6,  0.7,  1.0],
        [1.0,  0.6,  0.7,  1.0],    // Left face: purple
    ];

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
        0,  1,  2,      1,  2,  3,    // front
        4,  5,  6,      5,  6,  7,    // back
        8,  9,  10,     9,  10, 11,   // top
        12, 13, 14,     13, 14, 15,   // bottom

    ];

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

  //===================================================================================

    texCoordBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuf);

    texCoord = [
        // Face 1
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Face 2
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Face 3
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Face 4
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
       
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);


    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
        texture: texCoordBuf
    };
 //END===================================================================================

}

//
// Draw the scene.
//
function drawScene_obstacle1( programInfo, buffers, deltaTime,texture1) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);


    for (var i = 0; i < 1100; i++) {
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, -40*i+obstacle1Translation]);  // amount to translate


        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 1.8+Translationy, 0]);  // amount to translate

        Math.floor(Math.random() * 10);
        mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            (rand[i]*45)*Math.PI/180.0+obstacle1Rotation,     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)


        if((-40*i+obstacle1Translation)>=-1 && (-40*i+obstacle1Translation)<=0)
        {
            var rot=((rand[i]*45)+obstacle1Rotation*180/Math.PI)%360;

            if(((rot<=25 && rot>=0)||(rot<=205 && rot>=155)||(rot<360 && rot>=335))&&collision==0)
            {
                if(collision==0)
                collision=1;
                
            }
        }
//===================================================
     gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

//end================================================================

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

       //===================================================================================
    {
        num = 2;
        type = gl.FLOAT;
        normalize = false;
        stride = 0;
        offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texture);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, num, type, normalize, stride, offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);

    }


    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing


    vertexCount = 24;
    type = gl.UNSIGNED_SHORT;


    {
        const vertexCount = 24;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;

        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, texture1);

        gl.uniform1i(programInfo.uniformLocations.textureSampler, 0);

        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
    // gl.useProgram(programInfo.program);

    // // Set the shader uniforms

    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.projectionMatrix,
    //     false,
    //     projectionMatrix);
    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.modelViewMatrix,
    //     false,
    //     modelViewMatrix);


        // Update the rotation for the next draw

        // tunnelRotation += deltaTime;
    }
     //END======================================================
}