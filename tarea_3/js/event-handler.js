/*
	Written by:
	Livier Andrade A01377333
	Daniel Zavala A01169414

	Delivered by:
	Guillermo Herrera A01400835
*/

function windowEventListener(event)
{
    canvas.width = 0.75 * window.innerWidth;
    canvas.height = 0.75 * window.innerHeight;
    // Update Projection Matrix
	// Perspective Projection
	var fov = 60.;					// FOV (Filed-Of-View) angle in degrees
	fov = fov * Math.PI / 180.;		// FOV angle in radians
	var aspect = canvas.width / canvas.height;
	var near = 0.01;
	var far = 10000.;
	var projMatrix = glMatrix.mat4.create();
	glMatrix.mat4.perspective(projMatrix, fov, aspect, near, far);
	// Load projMatrix to Rendering Context
	var uProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjMatrix");
	gl.uniformMatrix4fv(uProjMatrixLocation, false, projMatrix);
}

function mouseDownEventListener(event)
{
	dragging = true;
	if (event && (event.which == 1 || event.button == 4 ))
	{
        dragMode = "ROTATE";
    }
	else if (event && (event.which == 2 || event.button == 4 ))
	{
        dragMode = "ZOOM";
    }
    else if (event && (event.which == 3 || event.button == 4 ))
	{
        dragMode = "PAN";
    }
	var x = event.clientX;
	var y = event.clientY;
	var rect = event.target.getBoundingClientRect();
	x = x - rect.left;
	y = y - rect.top;
	xLast = x;
	yLast = y;
}

function mouseUpEventListener(event)
{
	dragging = false;	// mouse is released
}

function mouseMoveEventListener(event)
{
	if(dragging)
	{
		var xEye = eye[0];
		var yEye = eye[1];
		var zEye = eye[2];
		var xTarget = target[0];
		var yTarget = target[1];
		var zTarget = target[2];
		var zTargetIni = 0.;
		var x = event.clientX;
		var y = event.clientY;
		var rect = event.target.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		if(dragMode == "ROTATE")
		{
			var factor = 10. / canvas.height; // The rotation ratio
			var dx = factor * (x - xLast);
			var dy = factor * (y - yLast);
			// Limit x-axis rotation angle to [-90, 90] degrees
			rotX = Math.max(Math.min(rotX + dy, 90.), -90.);
			rotY = rotY + dx;
		} else if(dragMode == "PAN")
		{
			var deltaX = (x - xLast) / (63.0);
			var deltaY = (y - yLast) / (-63.0);
			xEye = xEye + deltaX;
			yEye = yEye + deltaY;
			xTarget = xTarget + deltaX;
			yTarget = yTarget + deltaY;
		} else if(dragMode == "ZOOM")
		{
			if(zEye > zTargetIni)
			{
				var difX = x - xLast;
				var difY = y - yLast;
				var maxDiff = difY;
				if(Math.abs(difX) > Math.abs(difY))
				{
					maxDiff = difX;
				}
				zEye = zEye + maxDiff / 10.;
			}
			else
			{
				zEye = zTarget + 0.0001;
			}
		}
		xLast = x;
		yLast = y;

		// Update view transformation
		eye = [xEye, yEye, zEye];
		target = [xTarget, yTarget, zTarget];

		var viewMatrix = glMatrix.mat4.create();	// M-view = I
		var modelViewMatrix = glMatrix.mat4.create();	// M-view = I
		glMatrix.mat4.lookAt(viewMatrix, eye, target, up);
		glMatrix.mat4.rotate(viewMatrix, viewMatrix, rotX, [1., 0., 0.]);
		glMatrix.mat4.rotate(viewMatrix, viewMatrix, rotY, [0., 1., 0.]);
		glMatrix.mat4.multiply(modelViewMatrix, modelMatrix, viewMatrix);
		var uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
		gl.uniformMatrix4fv(uModelViewMatrixLocation, false, modelViewMatrix);
	}
}
function setColor(){
  var v1 = document.getElementById("v1");
  var v2 = document.getElementById("v2");
  var v3 = document.getElementById("v3");
  var a = 1;

  var v1dec = v1.value.replace('#','');
    var r1 = parseInt(v1dec.substring(0,2), 16);
    var g1 = parseInt(v1dec.substring(2,4), 16);
    var b1 = parseInt(v1dec.substring(4,6), 16);

    var v2dec = v2.value.replace('#','');
    var r2 = parseInt(v2dec.substring(0,2), 16);
    var g2 = parseInt(v2dec.substring(2,4), 16);
    var b2 = parseInt(v2dec.substring(4,6), 16);

    var v3dec = v3.value.replace('#','');
    var r3 = parseInt(v3dec.substring(0,2), 16);
    var g3 = parseInt(v3dec.substring(2,4), 16);
    var b3 = parseInt(v3dec.substring(4,6), 16);

    var res1 = [r1/255, g1/255, b1/255, a];
    var res2 = [r2/255, g2/255, b2/255, a];
    var res3 = [r3/255, g3/255, b3/255, a];

    res1 = res1.concat(res2,res3);
  	console.log(res1);
  	console.log("hola");


  colors = res1;
  console.log(colors);

	var bufferType = gl.ARRAY_BUFFER;
	gl.bindBuffer(bufferType, vboColors);
	var data = new Float32Array(colors);
	var usage = gl.STATIC_DRAW;
	gl.bufferData(bufferType, data, usage);

}

function setSolid(){
  var v1 = document.getElementById("v1");
  var v2 = document.getElementById("v2");
  var v3 = document.getElementById("v3");
  var s = document.getElementById("s");
  var a = 1;

    var sdec = s.value.replace('#','');
    var r1 = parseInt(sdec.substring(0,2), 16);
    var g1 = parseInt(sdec.substring(2,4), 16);
    var b1 = parseInt(sdec.substring(4,6), 16);


    var r2 = parseInt(sdec.substring(0,2), 16);
    var g2 = parseInt(sdec.substring(2,4), 16);
    var b2 = parseInt(sdec.substring(4,6), 16);


    var r3 = parseInt(sdec.substring(0,2), 16);
    var g3 = parseInt(sdec.substring(2,4), 16);
    var b3 = parseInt(sdec.substring(4,6), 16);

    var res1 = [r1/255, g1/255, b1/255, a];
    var res2 = [r2/255, g2/255, b2/255, a];
    var res3 = [r3/255, g3/255, b3/255, a];

    res1 = res1.concat(res2,res3);
  console.log(res1);

  colors = res1;
  var bufferType = gl.ARRAY_BUFFER;
  gl.bindBuffer(bufferType, vboColors);
  var data = new Float32Array(colors);
  var usage = gl.STATIC_DRAW;
  gl.bufferData(bufferType, data, usage);

}
