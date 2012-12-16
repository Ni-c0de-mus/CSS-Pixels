function pixelBoard(){draw();$(canvas).on("mousemove",function(e){mouseMove(e)});$(canvas).on("mouseout",function(){mouseOn=!1;draw()});$(canvas).on("mousedown",function(e){mouseDown(e)});$(canvas).on("mouseup",function(e){clearInterval(timeout)});$(canvas).on("touchmove",function(e){mouseMove(e)});var e=document.getElementById("c");e.addEventListener("touchstart",function(e){mouseDown(e)});e.addEventListener("touchmove",function(e){e.preventDefault();mouseMove(e)});e.addEventListener("touchend",function(e){clearInterval(timeout)})}function mouseMove(e){mouseOn=!0;var t=$(canvas).offset(),n=e.pageX-t.left,r=e.pageY-t.top;remainder={x:n%scale,y:r%scale};cursor.x=n-remainder.x;cursor.y=r-remainder.y;draw()}function mouseDown(e){var t=function(){for(var e=0;e<points.length;e++)if(points[e].x==cursor.x/scale&&points[e].y==cursor.y/scale){if(tool=="draw"){points[e].color!=color&&(points[e].color=color);return}if(tool=="erase"){points.splice(e,1);draw();return}}tool!="erase"&&points.push({x:cursor.x/scale,y:cursor.y/scale,color:color})};timeout=setInterval(function(){t()},20);t()}function draw(){var e=document.getElementById("c");e.width=20*scale;e.height=20*scale;var t=e.width,n=e.height,r=e.getContext("2d");for(var i=0;i<points.length;i++){r.fillStyle=points[i].color;var s=points[i].x*scale,o=points[i].y*scale;r.fillRect(s,o,scale,scale)}tool=="draw"&&(r.fillStyle=color);r.lineWidth=2;r.strokeStyle="black";mouseOn&&(tool=="draw"?r.fillRect(cursor.x,cursor.y,scale,scale):tool=="erase"&&r.strokeRect(cursor.x,cursor.y,scale,scale))}function swapTools(){var e=$("#eraser");console.log(e);if(tool=="draw"){tool="erase";$(e).html("")}else{tool="draw";$(e).html("")}}function exportCSS(){var e="box-shadow:";for(var t=0;t<points.length;t++){var n=Math.round(points[t].x*.6*100)/100,r=Math.round(points[t].y*.6*100)/100;e+="\n"+n+"em "+r+"em 0 "+points[t].color;t!=points.length-1&&(e+=",")}e+=";";$("#text").val(e);$("#text").addClass("showing")}$(document).ready(function(){var e=new pixelBoard;$("#colorPicker").change(function(){color="#"+$(this).val()})});var canvas="#c",scale=20,cursor={},grid=!1,points=[],mouseOn=!1,timeout,remainder,color="#ffcc00",tool="draw";