
var nextButton = document.querySelector('#next');
var prevButton = document.querySelector('#previous');
var listAvatarsMales=[];
var listAvatarsFemales=[];
var listAvatars=[];

var voices = [];
window.utterances = [];
var voiceIndex;






var currentPressed;
PromiseVoices();

responsiveVoice.setDefaultVoice("US English Female");
responsiveVoice.setDefaultRate(0.8);
responsiveVoice.enableEstimationTimeout = false;

function PromiseVoices(){

if(allVoicesObtained == null)
var allVoicesObtained = new Promise(function resolveVoices(resolve, reject)
{
  voices = responsiveVoice.getVoices();
  if (voices.length !== 0)
  {
    resolve(voices);

  }
  else
  {
    responsiveVoice.onvoiceschanged = function()
    {
      voices = responsiveVoice.getVoices();
      resolve(voices);
    };
  }
});

allVoicesObtained.then(/*voices => LoadVoicesAvatar()*/);
}


document.querySelectorAll('.voicesLauncher').forEach(x=>{
  x.onpointerup=function(){
 PlayClick();
 ToggleVoices('10px');
};

});
function speakLetters(index)
{
  speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";


  var sound = listLetterAudios[index];
  sound.play();

 SetSpeakerOn();

  sound.onended= function()
  {

    sound.currentTime = 0;
    SetSpeakerOff();
  };
}

function speakSentences()
{
 if(typeof arrayLetters!=='undefined'){
  console.log(arrayLetters.indexOf(listSentences[currentText]));
  if(arrayLetters.indexOf(listSentences[currentText])>-1){
      console.log(arrayLetters.length);

    speakLetters(arrayLetters.indexOf(listSentences[currentText]));
  
  }
  else
    speak(listSentences[currentText].toLowerCase(),parameters);
}
}




function speakWord(thisEl)
{

  currentPressed = thisEl;
  pageHolder.querySelectorAll('.wordActive').forEach(x=>{
    x.classList.remove('wordActive');
  })
  thisEl.classList.add('wordActive');
  

  speak(thisEl.innerText, parameters);


}



function speak(speech, params)
{
  SetSpeakerOn();
  if(responsiveVoice.voiceSupport()) {

  responsiveVoice.cancel();
  responsiveVoice.speak(speech, selectedVoice,params)


}
 else
  {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }


}

function voiceStartCallback(){
    
 if(currentPressed!=null){
    currentPressed.classList.add('wordActive');
  
  }
      }



function voiceEndCallback(){

  SetSpeakerOff(); 
  console.log('VOICE ENDED BASIC');
  if(currentPressed!=null){
    currentPressed.classList.remove('wordActive');
    currentPressed = null;
  }
    
}



var parameters ={
  onstart: voiceStartCallback,
    onend: voiceEndCallback
}


function SetSpeakerOn()
{
  anime(
  {
    targets: speaker
    , scale: 1.1
    , translateY: '-50px'
    , duration: 500
  });

  speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";

   document.querySelector("#speakerIcon")
    .style.display = "none";
  document.querySelector("#speakingLoader")
    .style.display = "flex";

}

function SetSpeakerOff()
{

  anime(
  {
    targets: speaker
    , translateY: '-15px'
    , duration: 500
  });

  speaker.style.backgroundColor = "#1a95f4";
  speaker.style.boxShadow = "0px 5px 0px 0px #1a7ac5";

  document.querySelector("#speakerIcon")
    .style.display = "flex";
  document.querySelector("#speakingLoader")
    .style.display = "none";

}




function replaceString(oldS, newS, fullS)
{
  for (let i = 0; i < fullS.length; ++i)
  {
    if (fullS.substring(i, i + oldS.length) === oldS)
    {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}

function Next()
{
  
PlayClick();
  currentText += 1;

 

  if (currentText < listSentences.length)
  {
     


    if (document.querySelector('.word') != null)
    {
      PopulateSentence(GetWords(listSentences[currentText]));
    }
    else
    {
      highlight(listSentences[currentText]);
    
      if(tracing)
      initTracerText();
    }

    if (currentHolderPageTitle == 'stories')
    {


      currentPicture.src = listPictures[currentText].src;


    }

    
    

    CheckButtonNextAvailability();
    CheckButtonPreviousAvailability();
  }
  else
  {

    if (currentHolderPageTitle == 'stories')

      DisplayConfirmer();

  }
}

function Previous()
{
PlayClick();
  currentText -= 1;

 
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();



  if (document.querySelector('.word') != null)
  {
    PopulateSentence(GetWords(listSentences[currentText]));
  }
  else
  {
    highlight(listSentences[currentText]);
     if(tracing)
      initTracerText();
  }

  if (currentHolderPageTitle == 'stories')
  {
    currentPicture.src = listPictures[currentText].src;
  }
}


function CheckButtonNextAvailability()
{
  if (currentText == listSentences.length - 1)
  {

    if (currentHolderPageTitle != 'stories')
    {

       nextButton.classList.add('interactiveDisabled'); 
 
      nextButton.removeAttribute('onclick');
    }
  }
  else
  {

   nextButton.classList.remove('interactiveDisabled'); 
    nextButton.setAttribute("onclick", "Next()");
  }
}

function CheckButtonPreviousAvailability()
{
  if (currentText == 0)
  {
    prevButton.classList.add('interactiveDisabled'); 
    prevButton.removeAttribute('onclick');
  }
  else
  {
    prevButton.classList.remove('interactiveDisabled');
    prevButton.setAttribute("onclick", "Previous()");
  }
}
