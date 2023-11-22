var synth = window.speechSynthesis || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

synth.defaultPrevented = true;
synth.interimResults = true;
synth.continuous = false;

var selectedVoice;
var nextButton = document.querySelector('#next');
var prevButton = document.querySelector('#previous');
var listAvatarsMales=[];
var listAvatarsFemales=[];
var listAvatars=[];

var voices = [];
window.utterances = [];
var voiceIndex;
var arrayWanted = [
  "Microsoft Clara Online (Natural) - English (Canada)"
  , "Microsoft Liam Online (Natural) - English (Canada)"
  , "Microsoft Aria Online (Natural) - English (United States)"
  , "Microsoft Ana Online (Natural) - English (United States)"
  , "Microsoft Christopher Online (Natural) - English (United States)"
, ]

var ulContainer = document.querySelector('#voicesHolder .row');


PromiseVoices();
function PromiseVoices(){
if(allVoicesObtained == null)
var allVoicesObtained = new Promise(function resolveVoices(resolve, reject)
{
  voices = synth.getVoices();
  if (voices.length !== 0)
  {
    resolve(voices);
  }
  else
  {
    synth.addEventListener("voiceschanged", function()
    {
      voices = synth.getVoices();
      resolve(voices);
    });
  }
});

allVoicesObtained.then(voices => LoadVoicesAvatar());
}


document.querySelector('#voicesMenuLauncher').addEventListener('pointerup',function(){
 PlayClick();
 ToggleVoices('10px')
});




function ToggleVoices(value){

anime({
  targets:  document.querySelector('#voicesHolder'),
  top:value,
  duration:1000,
  easing:'easeInOutQuint'
})

}


function LoadVoicesAvatar(){

    fetch(`./animations/avatars/avatars.html`)
        .then(res => res.text())
        .then(data =>
        { 
           var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
     
          listAvatars = Array.prototype.slice.call(doc.querySelectorAll("svg"));
          
         
             voiceSettings();
        });
}


function voiceSettings()
{
var counter=0;
  voices.forEach((voice) =>
  {
   
    if (voice.lang.includes("en-GB") || voice.lang.includes("en-US") || voice.lang.includes("en-CA"))
    {    
        // if(arrayWanted.includes(voice.name)) {
        voices.push(voice);
     
        insertNewVoice(voice,counter);
          counter++; 
    }

  })

   
  selectedVoice = voices.filter(function(voice)
  {
    return voices[0];
  })[0];

 
  voiceIndex = voices.indexOf(voices.filter(function(voice)
  {
    return voice == selectedVoice
  }));


}

function insertNewVoice(voice, index){

        var avatar = listAvatars[index];
      
        var block = 
          `<div class="col-12 col-md-5 col-lg-3 voiceContainer shake" onclick="setVoice(this)" >
            <div class="voiceAvatarContainer"></div>
            <div class="voiceInfoContainer">${setVoiceText(voice)}</div>
          </div>`

          ulContainer.innerHTML += block;
          
          var voiceAvatarContainerlist = ulContainer.querySelectorAll('.voiceAvatarContainer');
        
          var voiceAvatarContainer = voiceAvatarContainerlist[voiceAvatarContainerlist.length-1];

          if(avatar!=undefined)
          voiceAvatarContainer.appendChild(listAvatars[index]);

        else{
          var randomPosition = Math.floor(Math.random() * listAvatars.length);
         
    voiceAvatarContainer.appendChild(listAvatars[randomPosition]);
      }

 ulContainer.querySelectorAll('.voiceContainer')[0].classList.add('voiceSelected');
}

function setVoiceText(voice){
    var name = replaceString("Microsoft", "", voice.name);
           name = replaceString("Online (Natural)", "", name);
            name = replaceString("United Kingdom", "UK", name);
            name = replaceString("-", "", name);
           name = replaceString("English", "", name);
           name = replaceString("United States", "US", name);
           return name;
}


function setVoice(evt)
{
  PlayClick();

  var children = ulContainer.children;


  ulContainer.querySelector('.voiceSelected').classList.remove('voiceSelected');

  evt.classList.add('voiceSelected');


  console.log('Selected= '+ evt.innerText);
  selectedVoice = voices.filter(function(voice)
  {
 
    return voice.name.includes(evt.innerText.split(' ')[0]);

  })[0];

  synth.cancel();
  var dummyUtterance = new SpeechSynthesisUtterance(`Hey there!My name is ${evt.innerText.split(' ')[0]}`);
  dummyUtterance.voice = selectedVoice;
  synth.speak(dummyUtterance);
}



async function parseSentences()
{

  await showReadingText();
}

async function showReadingText(textPart)
{

  return new Promise(resolve =>
  {
    resolve();
  });
}

var currentPressed;


function speakLetters()
{
  speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";

  var sound = listLetterAudios[currentText];
  sound.play();

  document.querySelector("#speakerIcon")
    .style.display = "none";
  document.querySelector("#speakingLoader")
    .style.display = "flex";

  if (currentPressed != null)
  {
    currentPressed.style.backgroundColor = "#1a95f4";
    currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
  }
  sound.addEventListener("ended", function()
  {

    sound.currentTime = 0;
    SetSpeakerOff();
  });
}

function speakSentences()
{
  parseSentences();
  speak(listSentences[currentText].toLowerCase());
}



function speakWord(thisEl)
{

  currentPressed = thisEl;

  if (currentPressed != null)
  {
    currentPressed.style.background = "#1a95f4";
    currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
  }

  currentPressed.style.background = "#f5971d";
  currentPressed.style.boxShadow = "0px 8px 0px 0px #f5971d";


  parseSentences();
  speak(currentPressed.innerText);


}



function speak(speech)
{

  if ('speechSynthesis' in window)
  {
    if(voices == undefined || voices.length==0){
      alert("没有找到声音，我们正在尝试加载");
       PromiseVoices();
       return;
    }
    synth.cancel();

    var speakObj = new SpeechSynthesisUtterance(speech);

    speakObj.voice = selectedVoice;
    speakObj.rate = 0.8;

    if (selectedVoice != 'undefined')
    {
      synth.speak(speakObj);
      SetSpeakerOn();
    }
    speakObj.addEventListener('end', () =>
    {
      SetSpeakerOff();

    })

    return new Promise(resolve =>
    {
      if (document.querySelector('.word') != null)
      {
        speakObj.onend = resolve;

      }
    });
  }
  else
  {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }

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
  if (currentPressed != null)
  {

    currentPressed.style.backgroundColor = "#f5971d";
    currentPressed.style.boxShadow = "0px 8px 0px 0px #f5971d";
  }

}

function SetSpeakerOff()
{

  anime(
  {
    targets: speaker
    , scale: 1
    , translateY: '-15px'
    , duration: 500
    

  });

  speaker.style.backgroundColor = "#1a95f4";
  speaker.style.boxShadow = "0px 5px 0px 0px #1a7ac5";

  if (currentPressed != null)
  {

    currentPressed.style.backgroundColor = "#1a95f4";
    currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
  }

  document.querySelector("#speakerIcon")
    .style.display = "flex";
  document.querySelector("#speakingLoader")
    .style.display = "none";
  currentPressed = null;
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

  currentText += 1;

  anime(
  {
    targets: nextButton
    , scale: .85,

    direction: 'alternate'
    , ease: 'easeInOutQuart'
    , duration: 500
  });

  if (currentText < listSentences.length)
  {


    if (document.querySelector('.word') != null)
    {
      PopulateSentence(GetWords(listSentences[currentText]));
    }
    else
    {
      highlight(listSentences[currentText]);
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

  currentText -= 1;

  anime(
  {
    targets: prevButton
    , scale: .85
    , direction: 'alternate'
    , duration: 500
  });
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();



  if (document.querySelector('.word') != null)
  {
    PopulateSentence(GetWords(listSentences[currentText]));
  }
  else
  {
    highlight(listSentences[currentText]);
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
