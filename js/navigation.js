
var clickSource = '../audios/click.wav';
var audioClick = document.querySelector("#audioClick");
audioClick.src = clickSource ;


function PlayClick(){
audioClick.play();
}




function AnimateHolderPage(holder, el){
 
 PlayClick();  
 
  if((document.querySelector(`#videoPlayer`) != null)){
     document.querySelector('#videoPlayer').pause();
   document.querySelector('#videoPlayer').currentTime = 0;
  }
  else{
    console.log('No Video player');
  }

var holder = document.querySelector(`#${holder}`);

  anime({
    targets:holder,
    left:el+'%',
    duration:800,
    easing:'easeInOutQuint'
  })


 try{
  currentText=0;
  console.log('currentText = '+ currentText);
    CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
 } catch(e) {}

 
}