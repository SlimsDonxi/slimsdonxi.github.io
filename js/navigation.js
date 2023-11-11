
function PlayClick(){
   document.querySelector("#audioPlayer").src = './audios/click.wav';
document.querySelector("#audioPlayer").play();
}
function CloseReader(el){


console.log(el);
if(el == undefined) {window.location.href('index.html'); 

return;
}


else{
 document.getElementById(el).style.display = "none";

try{
    videoplayer.pause();
   videoplayer.currentTime = 0;
} catch(e){}

  try{
 synth.cancel();
 } catch(e) {}
 try{
  currentText=0;
 } catch(e) {}

 }
}