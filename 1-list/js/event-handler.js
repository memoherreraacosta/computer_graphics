// Resets the canvas dimensions to match window
function resizeWindow(event)
{   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.setSize(canvas.width, canvas.height);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
}

function listOnChange(event)
{
	if(event != "Select")
	{
		var mesh = scene.getObjectByName(event);
		mesh.visible = true;
		if(currentMesh)
		{
			currentMesh.visible = false;
		}
		currentMesh = mesh;
	}
	else
	{
		if(currentMesh)
		{
			currentMesh.visible = false;
		}
		currentMesh = undefined;
	}
}




