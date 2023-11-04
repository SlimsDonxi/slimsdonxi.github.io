var audioFiles=[];

function preloadAudio (src) { 
    var audio = document.createElement("audio"); 
    if ("src" in audio) { 
        audio.autoPlay = false; 
    } 
    else { 
        audio = document.createElement("bgsound"); 
        audio.volume = -10000; 
        audio.preload = auto; 
        audio.src = src;
       
    } 
     audioFiles.push(src);

    audio.src = src; 
    document.body.appendChild(audio); 
   
    return audio; 
 } 



    function playSound() {
      
     StopAudio();
console.log(audioFiles[currentText]);
    var sound = preloadAudio(audioFiles[currentText]);  //  preload
   sound.play();

}


    function PlayClick(){
      audioSource.pause();
        audioSource.currentTime = 0;

      audioSource.src = "audios/click.wav";
    audioSource.play();}


