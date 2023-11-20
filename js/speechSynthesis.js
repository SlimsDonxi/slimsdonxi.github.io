
var synth = window.speechSynthesis || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

synth.defaultPrevented = true;
synth.interimResults = true;
synth.continuous = false;
synth.localService = false;
var  selectedVoice;
var nextButton = document.querySelector('#next');
var prevButton = document.querySelector('#previous');

var voices =[];
window.utterances  =[];
var voiceIndex;
var arrayWanted = [
  "Microsoft Clara Online (Natural) - English (Canada)",
  "Microsoft Liam Online (Natural) - English (Canada)",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Ana Online (Natural) - English (United States)",
  "Microsoft Christopher Online (Natural) - English (United States)",
]

var ulContainer = document.querySelector('.dropdown__items');
var ulText = document.querySelector('.dropdown__text');
/*
function loadVoices() { 

 //ulContainer.innerHTML='';
  speechSynthesis.getVoices().forEach(function(voice, i){

        if(voice.lang.includes("en")){
          if(!voice.name.includes('Google')){          
          
           // if(arrayWanted.includes(voice.name)) {
              voices.push(voice);
          
             
           var name = replaceString("Microsoft", "", voice.name);
            name = replaceString("Online (Natural) - English (United States)", "",name);
            name = replaceString("Online (Natural) - English (Canada)", "",name);

            var block = `<li onclick="setVoice(this)">${name}</li>`;
          
            ulContainer.innerHTML += block;

              //}
          }
          }
      });

}



 loadVoices();

synth.onvoiceschanged = function(e) {

 loadVoices();


}
*/
//Promise Voices List
const allVoicesObtained = new Promise(function(resolve, reject) {
   voices = synth.getVoices();
  if (voices.length !== 0) {
    resolve(voices);
  } else {
    synth.addEventListener("voiceschanged", function() {
      voices = synth.getVoices();
      resolve(voices);
    });
  }
});

allVoicesObtained.then(voices => voiceSettings());

function voiceSettings(){

voices.forEach(x=>{

 if(voice.lang.includes("en")){
          if(!voice.name.includes('Google')){          
          
           // if(arrayWanted.includes(voice.name)) {
              voices.push(voice);
          
             
           var name = replaceString("Microsoft", "", voice.name);
            name = replaceString("Online (Natural) - English (United States)", "",name);
            name = replaceString("Online (Natural) - English (Canada)", "",name);

            var block = `<li onclick="setVoice(this)">${name}</li>`;
          
            ulContainer.innerHTML += block;

              //}
          }
          }

})

  selectedVoice = voices.filter(function(voice) { return voices[0]; })[0];  

  var name = replaceString("Microsoft", "", selectedVoice.name);
            name = replaceString("Online (Natural) - English (United States)", "",name);
            name = replaceString("Online (Natural) - English (Canada)", "",name);

          
  voiceIndex = voices.indexOf(voices.filter(function(voice) { return voice == selectedVoice}));

ulText.innerText = name;
  var children = ulContainer.children;
  Array.from(children)[0].style.background = "#ffb400";
}


function setVoice(evt){


var children = ulContainer.children;

    Array.from(children).forEach((x)=>
    {
        if(x!= evt)
        {
          x.style.background = "none";
          x.style.color = "#2f2f2f";
        }
      });

      evt.style.background = "#ffb400";
      evt.style.color = "#fff";

      document.querySelector("input").checked = false;

      document.querySelector(".dropdown__text").innerText = evt.innerText;
     
  selectedVoice = voices.filter(function(voice) {
    console.log(voice.name + "  "+ evt.innerText + "  "+voice.name.includes(evt.innerText) );
   return voice.name.includes(evt.innerText) 

 })[0];                         
} 



async function parseSentences() {
 
  await showReadingText();  
}

async function showReadingText(textPart) {
    
  return new Promise(resolve => { resolve(); });
}

var currentPressed;


function speakLetters(){
speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";

   var sound = listLetterAudios[currentText];   
   sound.play();

   document.querySelector("#speakerIcon").style.display = "none";
   document.querySelector("#speakingLoader").style.display = "flex";

   if(currentPressed!=null){
    currentPressed.style.backgroundColor = "#1a95f4";
    currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
  }
   sound.addEventListener("ended", function(){
  
     sound.currentTime = 0;
     SetSpeakerOff();
});
}

function speakSentences(){
parseSentences();
speak(listSentences[currentText].toLowerCase());
}



function speakWord(thisEl) {

currentPressed = thisEl;

if(currentPressed!= null){
 currentPressed.style.background = "#1a95f4";
 currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
  }
  
 currentPressed.style.background = "#f5971d";
 currentPressed.style.boxShadow = "0px 8px 0px 0px #f5971d";


parseSentences();
speak(currentPressed.innerText);

  
}



function speak(speech){

  if ('speechSynthesis' in window) {

 synth.cancel();

  var speakObj = new SpeechSynthesisUtterance(speech);
   
  speakObj.voice = selectedVoice;
  speakObj.rate = 0.8;

  if(selectedVoice != 'undefined'){
  synth.speak(speakObj);
  SetSpeakerOn();
}
  speakObj.addEventListener('end', ()=>{
  SetSpeakerOff();

  })

return new Promise(resolve => { if(document.querySelector('.word')!=null){
  speakObj.onend = resolve; 

}});
}
else{
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}

}





function SetSpeakerOn(){
   anime({
          targets: speaker,
          scale: 1.1,
          translateY: '-50px',
          duration:500,
          ease:'easeInOutQuart'
       
        });

 speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";
if(currentPressed!=null){
 
currentPressed.style.backgroundColor = "#f5971d";
currentPressed.style.boxShadow = "0px 8px 0px 0px #f5971d";
}

}

function SetSpeakerOff(){

anime({
          targets: speaker,
          scale: 1,
          translateY: '-15px',
          duration:500,
          ease:'easeInOutQuart'
       
        });

speaker.style.backgroundColor = "#1a95f4";
speaker.style.boxShadow = "0px 5px 0px 0px #1a7ac5";

if(currentPressed!=null){
 
currentPressed.style.backgroundColor = "#1a95f4";
currentPressed.style.boxShadow = "0px 8px 0px 0px #1a7ac5";
}

document.querySelector("#speakerIcon").style.display = "flex";
document.querySelector("#speakingLoader").style.display = "none";
 currentPressed = null;
}














function replaceString(oldS, newS, fullS) {
  for (let i = 0; i < fullS.length; ++i) {
    if (fullS.substring(i, i + oldS.length) === oldS) {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}

function Next(){
  
  currentText +=  1;

 anime({
      targets:nextButton,
      scale:.85,

      direction:'alternate',
      ease:'easeInOutQuart',
      duration:500
     });

if(currentText < listSentences.length){


   if(document.querySelector('.word')!=null){
     PopulateSentence(GetWords(listSentences[currentText]));
   }
   else{
    highlight(listSentences[currentText]);
   }

   if(currentHolderPageTitle == 'stories'){
     
   
      currentPicture.src= listPictures[currentText].src;

     
    }
  
    CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     }
     else{
    
       if(currentHolderPageTitle== 'stories')
    
    DisplayConfirmer();

     }
   }

function Previous(){
   
  currentText-=1;
     
     anime({
      targets:prevButton,
      scale:.85,
      direction:'alternate',
      duration:500
     });
  CheckButtonNextAvailability();
 CheckButtonPreviousAvailability();
       
 

   if(document.querySelector('.word')!=null){
     PopulateSentence(GetWords(listSentences[currentText]));
   }
   else{
   highlight(listSentences[currentText]);
   }

   if(currentHolderPageTitle == 'stories'){
    currentPicture.src= listPictures[currentText].src;
 } 
}


function CheckButtonNextAvailability(){
  if(currentText == listSentences.length-1){

    if(currentHolderPageTitle!= 'stories'){

    nextButton.style.backgroundColor = "gray";
         nextButton.style.opacity = "0.2";
           nextButton.style.boxShadow = "0px 0px #cb2e26";    
        nextButton.removeAttribute('onclick');
      }
 } else{

          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 4px #46a52d";         
         nextButton.style.opacity = "1";
        nextButton.setAttribute("onclick", "Next()" );
 }
}

function CheckButtonPreviousAvailability(){
  if(currentText ==0){

           prevButton.style.backgroundColor = "gray";
         prevButton.style.opacity = "0.2";
           prevButton.style.boxShadow = "0px 0px #cb2e26";    
        prevButton.removeAttribute('onclick');
}else{
 prevButton.style.backgroundColor = "#f53228";
      prevButton.style.opacity = "1";
      prevButton.style.boxShadow = "0px 4px #cb2e26";  
      prevButton.setAttribute("onclick", "Previous()" );
}
}