
function PlayClick(){
document.querySelector("#audioClick").src = '../audios/click.wav';
document.querySelector("#audioClick").play();
}
function CloseReader(el){


if(el == undefined) {window.location.href('index.html'); 

return;
}


else{
 document.getElementById(el).style.display = "none";

try{
    videoPlayer.pause();
   videoPlayer.currentTime = 0;
} catch(e){}

  try{
 synth.cancel();
 } catch(e) {}
 try{
  currentText=0;
    CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
 } catch(e) {}

 }
}



function AnimateHolderPage(holder, el){
 
 var holder = document.querySelector(`#${holder}`);

  anime({
    targets:holder,
    left:el+'%',
    duration:800,
    easing:'easeInOutQuint'
  })
}