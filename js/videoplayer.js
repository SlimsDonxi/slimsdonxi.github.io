
var root ="videos/"+ document.querySelector('title').innerText+'/';
var body = document.querySelector('body');
var readingTempalte;

var videoPlayer;
fetch('../videoplayer.html')
.then(res=>res.text())
.then(data=>{

readingTempalte = document.querySelector('#videoplayerHolder');
  readingTempalte.innerHTML=data;

});


function LoadPlayer(el){

document.querySelector('#videoplayerHolder').style.display='block'
videoPlayer = document.querySelector('video');
anime({
     targets:document.querySelector('#divVideoPlayer'),
     left:'0%',
     duration:600,
      easing:'easeOutQuint'
});


var block = root + el+'.mp4';

setTimeout(()=>{
document.querySelector('#videoPlayer').src = block;
document.querySelector('#videoPlayer').play();
},50);

}
/*
function CloseReader(){
	divPlayer.style.display = 'none';
	videoplayer.pause();
          videoplayer.currentTime = 0;
}*/


