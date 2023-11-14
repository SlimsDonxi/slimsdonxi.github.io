

var root ="stories/listStories";
var currentStory;
var currentPage =0;

var listStories =["Alex's super medicine", "Grow flower GROW!"];//, "The Bear and the Bee"];
var listPictures=[];
var listSentences =[];

var currentSentence;
var currentPicture = document.querySelector('#currentPicture');
 var nextButton = document.getElementById("next");
var prevButton = document.getElementById("previous");
var displayedPhrase =  document.getElementById('displayedPhrase');
var currentPressed;
var loader = document.querySelector('#loader');

var jarOfPromise = [];




function GetSentences(el){

var file = FileHelper('stories/listStories/'+el.innerText+'/storyText.txt');
 listSentences =  file.split(/\r?\n/);
  currentSentence = listSentences[0];

 
return listSentences;}


function FileHelper(url){
    
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;}





function GenerateStory(element){

loader.style.display='flex';

setTimeout(StartGeneratin(element), 500);
}



function StartGeneratin(element){


 
    currentPage=0;

   var divs = document.querySelectorAll(".class_box h3");
    selectedStory = Array.from(divs).indexOf(element);

  currentStory = element.innerText;


 listSentences = GetSentences(element);
 count = listSentences.length;
GetStoryPictures();
  
  PopulateSentence(currentSentence);
}

function GetStoryPictures(){


listPictures =[];

for(i = 0; i <= listSentences.length; i++) {

        jarOfPromise.push(
            new Promise( (resolve, reject) => {
                var name = listSentences[i];
                var image = new Image();
                image.src = 'stories/listStories/'+listSentences[0]+'/'+i+'.jpg';
               
               image.addEventListener('load', function() {
                    resolve(true);
                       listPictures.push(this);
                      

                });
            })
        )

    }


    Promise.all(jarOfPromise).then( result => {
       listPictures.sort(function(a,b){ 
     
     
        return a.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.')) -  b.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.'))});
      

      currentPicture.src = listPictures[0].src; 

setTimeout(()=>{
    loader.style.display='none';
       document.querySelector('#Reader').style.display = "block";
     },2000);
    
    });

}



function PopulateSentence(sentence){
 document.getElementById('displayedPhrase').innerHTML='';
    var listWords = sentence.split(' ');

    listWords.forEach((word)=>{
        if(word != '‎')
      document.querySelector('#displayedPhrase').innerHTML+=    ` <button class="word shake" onclick="SpeakIt(this)">${word}</button> `;
    })

CheckButtonNextAvailability();
CheckButtonPreviousAvailability();


  }



const synth = window.speechSynthesis;
synth.defaultPrevented = true;



var  selectedVoice;


var ulContainer = document.querySelector(".dropdown__items");
// Fetch the list of voices and populate the voice options.

var voices =[];

var arrayWanted = [
 

  "Microsoft Clara Online (Natural) - English (Canada)",
  "Microsoft Liam Online (Natural) - English (Canada)",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Ana Online (Natural) - English (United States)",
  "Microsoft Christopher Online (Natural) - English (United States)",


      ]

var voiceIndex;

function loadVoices() { 

 ulContainer.innerHTML='';
  speechSynthesis.getVoices().forEach(function(voice, i){

        if(voice.lang.includes("en")){
          if(!voice.name.includes('Google')){          
          
            if(arrayWanted.includes(voice.name)) {
              console.log(voice.name);
              voices.push(voice);
          

            var name = replaceString("Microsoft", "", voice.name);
            name = replaceString("Online (Natural) - English (United States)", "",name);
            name = replaceString("Online (Natural) - English (Canada)", "",name);

            var block = `<li onclick="setVoice(this)">${name}</li>`;
          
            ulContainer.innerHTML += block;

              }
          }
          }
      });


  selectedVoice = voices.filter(function(voice) { return voice.name.includes("Liam") })[0];    
  voiceIndex = voices.indexOf(selectedVoice);
  console.log(voiceIndex);
 document.querySelector(".dropdown__text").innerText = "Liam";
}



loadVoices();

synth.onvoiceschanged = function(e) {

 loadVoices();
  var children = ulContainer.children;

  Array.from(children)[voiceIndex].style.background = "#ffb400";
  Array.from(children)[voiceIndex].style.color = "#fff";

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






function StartSpeaking(){
   speaker.style.backgroundColor = "#f5971d";
speaker.style.boxShadow = "0px 5px 0px 0px #f5971d"
  parseSentences();
  speak();
}



async function parseSentences() {
 
  await showReadingText();
  
}

async function showReadingText(textPart) {
  
  
  return new Promise(resolve => { resolve(); });
}
var currentPressed;



function SpeakIt(thisEl) {


  
  if(currentPressed!= null){

 currentPressed.style.background = "#1a95f4";
 currentPressed.style.boxShadow = "0px 10px 0px 0px #1a7ac5";
  }
  currentPressed = thisEl;
 

 currentPressed.style.background = "#f5971d";
 currentPressed.style.boxShadow = "0px 10px 0px 0px #f5971d";
 parseSentences();
  speak();
  
}


function speak(){

  if ('speechSynthesis' in window) {
   synth.cancel();
   var speakObj = new SpeechSynthesisUtterance();

   if(currentPressed ==  null){

    speakObj = new SpeechSynthesisUtterance(currentSentence);   
    document.querySelector("#speakerIcon").style.display = "none";
    document.querySelector("#speakingLoader").style.display = "flex";

  }
 else{
  console.log("Supposed to speak the word now");
   speakObj = new SpeechSynthesisUtterance(currentPressed.innerText.toLowerCase());
   
}

speakObj.voice=selectedVoice;
speakObj.rate = 0.8;
if(selectedVoice != 'undefined')
synth.speak(speakObj);
else alert("Can't get the Speech Voices loaded")
}
else{
  alert("Sorry, your browser doesn't support text to speech!");
}
speakObj.addEventListener('end', function () {
ResetSpeakingUI();
});
}



function ResetSpeakingUI(){
  
speaker.style.backgroundColor = "#1a95f4";
speaker.style.boxShadow = "0px 5px 0px 0px #1a7ac5";

if(currentPressed!= null){
currentPressed.style.backgroundColor = "#1a95f4";
currentPressed.style.boxShadow = "0px 10px 0px 0px #1a7ac5";
}
document.querySelector("#speakerIcon").style.display = "flex";
document.querySelector("#speakingLoader").style.display = "none";
 currentPressed = null;
}




function CheckButtonNextAvailability(){
  if(currentPage == listSentences.length-1){
    nextButton.style.backgroundColor = "gray";
         nextButton.style.opacity = "0.2";
           nextButton.style.boxShadow = "0px 0px #cb2e26";    
        nextButton.removeAttribute('onclick');
 } else{

          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 4px #46a52d";         
         nextButton.style.opacity = "1";
        nextButton.setAttribute("onclick", "Next()" );
 }
}


function CheckButtonPreviousAvailability(){
  if(currentPage <=0){

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


function Next(){
  
  currentPage++;
currentSentence = listSentences[currentPage];
 
currentPicture.src = listPictures[currentPage].src;

 anime({
      targets:nextButton,
      scale:.85,
      direction:'alternate',
      duration:500
     });
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     
  
 
    PopulateSentence(currentSentence);
   
} 

function Previous(){
   
    anime({
      targets:prevButton,
      scale:.85,
      direction:'alternate',
      duration:500
     });
  currentPage--;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  

PopulateSentence(currentSentence);
     
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
       

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