var videoplayer = document.querySelector('video');
var divPlayer = document.querySelector('#divVideoPlayer');
var root ="videos/"+ document.querySelector('title').innerText+'/';
var body = document.querySelector('body');

function LoadPlayer(el){
divPlayer.style.display = 'block';

var block = root + el+'.mp4';

videoplayer.src = block;
}

function CloseReader(){
	divPlayer.style.display = 'none';
	videoplayer.pause();
          videoplayer.currentTime = 0;
}


