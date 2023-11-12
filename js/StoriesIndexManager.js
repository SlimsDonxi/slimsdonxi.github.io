

var root ="stories/listStories";
var currentStory;
var currentPage =0;

var listStories =["Alex's super medicine", "Grow flower GROW!", "The Bear and the Bee"];
var listPictures=[];
var listSentences =[];

var currentSentence;
var currentPicture = document.querySelector('#currentPicture');


 var nextButton = document.getElementById("next");
var prevButton = document.getElementById("previous");
var displayedPhrase =  document.getElementById('displayedPhrase');
var currentPressed;

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

  document.querySelector('body').style.overflowY = "hidden";
setTimeout(StartGeneratin(element), 500);
}



function StartGeneratin(element){


 
    currentPage=0;

   var divs = document.querySelectorAll(".class_box h3");
    selectedStory = Array.from(divs).indexOf(element);

  currentStory = element.innerText;


 listSentences = GetSentences(element);
GetStoryPictures();
  currentPicture.src = listPictures[0];  
  PopulateSentence(currentSentence);
}

function GetStoryPictures(){

listPictures =[];
  for(var i=0; i< listSentences.length; i++){
    var img = new Image();
    img.onload = loadHandler;
    img.onerror= img.onabort = errorHandler;
    img.crossOrigin ="";
    img.src= root+'/'+listSentences[0]+'/'+i+'.jpg';
    listPictures.push(img);
  }
 

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
 document.querySelector('#Reader').style.display = "block";
  document.querySelector('body').style.overflowY = "scroll";
  }






const synth = window.speechSynthesis;


var  selectedVoice;


var ulContainer = document.querySelector(".dropdown__items");
// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
  var voices = speechSynthesis.getVoices();
   var str;
  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
     if(voice.lang.includes("en"))
    {

         if(!voice.name.includes('Microsoft'))
         {
           if(voice.name.includes('Google')) 
              str = voice.name.replace('Google', '');
                                   
                                   

            var block = `<li onclick='setVoice(this)'>${str}</li>`  
            console.log(str);
              if(str == "UK English Female" || str.includes("Karen"))
                {
                
                  setVoice(str);
                }
              ulContainer.innerHTML += block;
                                    
                                
        }
    } 
  });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
synth.onvoiceschanged = function(e) {
  loadVoices();
};




function setVoice(el){

var children = ulContainer.children;

Array.from(children).forEach((x)=>{
  if(x!= el){
    x.style.background = "none";
    x.style.color = "#2f2f2f";
  }

});

el.style.background = "#ffb400";
el.style.color = "#fff";
 selectedVoice = speechSynthesis.getVoices().filter(function(voice) { return voice.name.includes(el.innerText) })[0];
document.querySelector("input").checked = false;
document.querySelector(".dropdown__text").innerText = el.innerText;
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

speakObj.voice =selectedVoice;

speakObj.rate = 0.8;
synth.speak(speakObj);

}else{
  // Speech Synthesis Not Supported 😣
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
//currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  
currentPicture = listPictures[currentPage];


  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     
  
 
    PopulateSentence(currentSentence);
   
} 

function Previous(){
   
  currentPage--;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  

PopulateSentence(currentSentence);
     
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
       

} 
