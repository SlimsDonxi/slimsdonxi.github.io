var videoHolder;
var videoPlayer;
var content;

function initVideoLoader()
{

     var content = document.querySelectorAll('.videoLauncher');
     Array.from(content)
          .forEach(x =>
          {
               x.onpointerup = function()
               {
                    PlayClick();
                    initVideo(this.querySelector('h3')
                         .innerText);
               }
          })
}



function initVideo(el)
{
     fetch('../videoplayer.html')
          .then(res => res.text())
          .then(data =>
          {

               videoHolder = document.querySelector('#videoplayerHolder');
               videoHolder.innerHTML = data;
               videoPlayer = document.querySelector('#videoPlayer');

               LoadPlayer(el);

          });

}




function LoadPlayer(el)
{
     videoPlayer = document.querySelector('video');
     anime(
     {
          targets: document.querySelector('#videoplayerHolder')
          , left: '0%'
          , duration: 600
          , easing: 'easeOutQuint'
     });


     var block = root + el + '.mp4';
     console.log('href = ' + block);

     setTimeout(() =>
     {
          videoPlayer.src = block;
          //videoPlayer.requestFullscreen(), {once:true};
          //screen.orientation.lock('landscape');
          videoPlayer.play();
     }, 50);

}
/*
function CloseReader(){
     divPlayer.style.display = 'none';
     videoplayer.pause();
          videoplayer.currentTime = 0;
}*/
