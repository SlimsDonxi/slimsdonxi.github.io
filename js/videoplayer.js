var videoHolder;
var videoPlayer;
var content;
var currentSelected;

function initVideoLoader()
{

      content = document.querySelectorAll('.videoLauncher');

     Array.from(content)
          .forEach(x =>
          {
               x.onpointerup = function()
               {
                    PlayClick();
                    initVideo(this.querySelector('h3').innerText);
               }
          })
}



function initVideo(el)
{
     fetch('../videoPlayer.html')
          .then(res => res.text())
          .then(data =>
          {

               videoHolder = document.querySelector('#videoplayerHolder');
               videoHolder.innerHTML = data;
               videoPlayer = document.querySelector('#videoPlayer');
         
               LoadPlayer(el);
               initMoreVideos(el);
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

     var link = el.replace(/ /g,'%20');
     var block = root + link + '.mp4';
     setTimeout(() =>
     {
          videoPlayer.src = block;
         // videoPlayer.requestFullscreen(), {once:true};
          //screen.orientation.lock('landscape');
          videoPlayer.play();
     }, 50);

}



function initMoreVideos(el){
  var block='';
 document.querySelector('#videoTitle').innerText = el;

  document.querySelectorAll('.videoLauncher').forEach(x=>{

    if(x.querySelector('b').innerText!= el)

      block+= x.innerHTML;


});


document.querySelector('#rowVideos').innerHTML = block;

  document.querySelector('#rowVideos').querySelectorAll('div').forEach(x=>{
       x.onpointerup = function()
      {
        var text = x.querySelector('b').innerText;
       
        console.log(x);
       initVideo(text);
       
      
      }
    })


  

}

/*
function CloseReader(){
     divPlayer.style.display = 'none';
     videoplayer.pause();
          videoplayer.currentTime = 0;
}*/
