

    // Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;
   
    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;
var tracing= false;
var traceme;
var brushWidth;

   initTracer();
  // Set-up the canvas and add our event handlers after the page has loaded
    function initTracer() {
      

        // Get the specific canvas element from the HTML document
        canvas = pageHolder.querySelector('#sketchpad');    
        canvas.width = window.innerWidth/1.2;
        if( canvas.width>500)  canvas.width =500;
        canvas.height = canvas.width;
        pageHolder.querySelector(".navButtonTracer").style.height = canvas.height

        brushWidth = canvas.width/ 15;
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            canvas.addEventListener('pointerdown', sketchpad_mouseDown, false);
            canvas.addEventListener('pointermove', sketchpad_mouseMove, false);
            window.addEventListener('pointerup', sketchpad_mouseUp, false);
        }


        traceme =  pageHolder.querySelector('.traceme');
     
        
    }





function initTracerText(){

        canvas.style.display= 'block';
        ctx.clearRect(0, 0,  canvas.width,  canvas.height);
         var url = replaceString('1','',listSentences[currentText]);



       
         const svg = new Image();
        svg.onload = () => ctx.drawImage(svg, 0, 0, canvas.width, canvas.width);
        svg.src = `../letters/${url}.svg`;
        console.log(svg.src);
        if(pageHolder.querySelector('#displayedText').style.display!='none')
        pageHolder.querySelector('#displayedText').style.display="none";


}
    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=238; g=56; b=97; a=255;

        // Select a fill style
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        ctx.globalCompositeOperation='destination-over';
        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    // Clear the canvas context using the canvas width and height
    function clearCanvas() {
        ctx.clearRect(0, 0,  canvas.width,  canvas.height);
        var url = replaceString('1','',listSentences[currentText]);
         const svg = new Image();
        svg.onload = () => ctx.drawImage(svg, 0, 0, canvas.width, canvas.width);
        svg.src = `../letters/${url}.svg`;
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawDot(ctx,mouseX,mouseY,brushWidth);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);
      
        // Draw a dot if the mouse button is currently being pressed
        drawDot(ctx,mouseX,mouseY,brushWidth);
      
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
          var rect = canvas.getBoundingClientRect();
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
            mouseY = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }


  

    function ToggleTracer(){
   
        PlayClick();
       

        if(canvas.style.visibility=='hidden'){
            tracing=true;
           
            canvas.style.visibility= 'visible';
            inputText.style.display='none';
            traceme.classList.add('tracemeActive');
          
            traceme.querySelector('.iconTrace').style.backgroundImage='url("../animations/cancel.svg")';
             initTracerText();

             setTimeout(()=>{
                   document.querySelector('.clearCanvas').classList.add('clearCanvasActive');
               },400)
         
        }
        else{
            tracing = false;
          
            canvas.style.visibility= 'hidden';
            inputText.style.display='block';
 document.querySelector('.clearCanvas').classList.remove('clearCanvasActive');
           traceme.classList.remove('tracemeActive');
           
              traceme.querySelector('.iconTrace').style.backgroundImage='url("../animations/pencil.svg")';
         
        }


      
    }