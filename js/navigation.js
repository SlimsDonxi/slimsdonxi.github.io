var clickSource = '../audios/click.wav';
var audioClick = document.querySelector("#audioClick");
audioClick.src = clickSource;


function PlayClick()
{
  audioClick.play();
}




function AnimateHolderPage(holder, el)
{

  PlayClick();

  if ((document.querySelector(`#videoPlayer`) != null))
  {
    document.querySelector('#videoPlayer')
      .pause();
    document.querySelector('#videoPlayer')
      .currentTime = 0;
  }


  var holder = document.querySelector(`#${holder}`);


  
  if(el =="100") holder.style.display = "block";
  else setTimeout(()=>{ holder.style.display ='none'},900)
  

  anime(
  {
    targets: holder
    , left: el + '%'
    , duration: 800
    , easing: 'easeInOutQuint'
  })



  try
  {
    currentText = 0;
    console.log('currentText = ' + currentText);
    CheckButtonNextAvailability();
    CheckButtonPreviousAvailability();
  }
  catch (e)
  {}


}
