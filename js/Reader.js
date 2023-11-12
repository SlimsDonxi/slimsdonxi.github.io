
var arrayLetters = ["a", "t", "i", "p", "n", "ck", "e", "h","r","m","d","g","o","u","l","f","b","ai","j","oa","ie","ee","or","z","w","ng","v","oo","oo1","y","x","ch","sh","th","th1","qu","ou","oi","ue","er","ar"];
var arrayAt = ["bat", "cat", "fat", "hat", "lat", "mat","pat"];
var arrayCh = ["chip", "chat", "chow", "chew", "chin", "chop","chess","chic", "chase","chalk", "china", "chirp", "chest", "catch","batch", "fetch", "watch", "match" ];
var arrayOO = ["too", "zoo", "goo", "boo", "poo", "moo","goop","tool","fool", "pool", "root","loot","moon", "roof", "doom","boom", "groom", "vroom","goose",  "cookie","poor", "good", "look","took", "book",   "foot",
     "hook" ];
var arraySh = ["shake", "shade", "shape", "shack", "she","sheep","sheet", "shed","shy", "shine", "shell", "shin", "shoe", "shut","shop", "shoot", "ship", "shot", "ash", "bash", "dash", "flash", "trash", "cash", "mesh", "flesh", "fish", "wash", "push" ];
var arrayGood = ["I am good at basketball", "I am very good at dancing", "You are extremely good at running", "He is great at swimming", "I am bad at drawing","She is really bad at climbing","We are horrible at singing"];
var arrayToo = ["I like apples and i like oranges too", "I cannot fly and I cannot swim either", "I do not like to dance and I do not like to play either", "If you are happy then I am happy too", "You are not my friend and I am not your friend either","I like to drink milk but I do not like to drink water","I like to eat vegetables but I do not like to eat fruits"];
var arraySchool = ["This is my pencil case", "I have a huge pencil case", "I can put an eraser in my pencil case", "Eraser is a school supply", "I can put a marker in my pencil case","Marker is a school supply too","I can put a glue stick in my pencil case","Glue is also a school supply","I cannot put an elephant in my pencil case","I have a lot of crayons","I put all of my school supplies in my schoolbag","Because the elephant is too big!"];
var currentArray = [];
var arrayDesired = ["at", "oo", "ch", "sh"]
var isForLetters = false;
var clickable;
var currentText =0;
 var nextButton = document.getElementById("next");
var prevButton = document.getElementById("previous");
var displayedPhrase =  document.getElementById('displayedPhrase');
var displayedText = document.getElementById('displayedText');
 var speaker = document.querySelector("#speaker");





function populate(id){
  
switch(id){

case 'letters': currentArray = arrayLetters; isForLetters = true; break;
case 'at': currentArray = arrayAt; isForLetters = false;break;
case 'ch': currentArray = arrayCh;isForLetters = false;break;
case 'sh': currentArray = arraySh;isForLetters = false;break;
case 'oo': currentArray = arrayOO; isForLetters = false;break;
case 'school': currentArray = arraySchool; clickable ="clickable";isForLetters = false;break;
case 'too': currentArray = arrayToo;clickable ="clickable";isForLetters = false;break;
case 'good': currentArray = arrayGood;clickable ="clickable";isForLetters = false;break;
}


var blockStr;


 document.querySelector("#rowContent").innerHTML ='';

for(var i=0; i< currentArray.length; i++)
{
  
    if(currentArray[i].indexOf('1')>0) {
      currentArray[i] = currentArray[i].replace('1', '');}

blockStr = clickable?AppendForReading(currentArray[i]):AppendForPhonics(currentArray[i]);

       document.querySelector("#listPhonics .container .row").innerHTML+= blockStr;
  
}
 

  document.querySelector("#listPhonics").style.display ="block";
}

function AppendForPhonics(el){


return `<div class="col-md-4 margi_bottom" onmouseup="PlayClick();GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834">            
        <h1> ${el}</h1>
        </div>
    </div>`    }

function AppendForReading(el){


 return `<div class="col-md-6 margi_bottom" onmouseup="PlayClick(); GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834; text-align:start; ">            
        <span>${el}</span>
        </div>
    </div>`    }



var clicked;
function GetText(element) {
  
  microphone.style.display ='block';
document.querySelector("#reading").style.display ="block";

 clicked= element.children[0].children[0];
if(clicked.innerText.length <3)    microphone.style.display ='none';
if(clickable == "clickable")   
 CreateBoxes(GetWords(clicked.innerText));
else{

highlight(clicked.innerText);
}

var content = document.querySelector("#rowContent");
var divs = content.querySelectorAll(".margi_bottom");
currentText = Array.from(divs).indexOf(element);
CheckButtonNextAvailability();
CheckButtonPreviousAvailability();}


function highlight(el){


var desired = arrayDesired.find((x) => {el.includes(x)});
if(el.length>1){
arrayDesired.forEach((x)=>{

 if(el.includes(x)){
var startPosition =  el.indexOf(x);
 var output =  el.substring(0, startPosition) + `<span>` +  el.substring(startPosition) +`</span>`;
 document.querySelector('#displayedText').innerHTML = output;
};
});
}
else{
   document.querySelector('#displayedText').innerHTML = `<span style="font-size: 220px">${el}</span>`;
}
}




function CreateBoxes(element){

 displayedPhrase.innerHTML='';
    for(var i in element)
      { 
        var block = `<button class="word shake" onclick="SpeakIt(this)"><span>${element[i]}</span></button>`;
       displayedPhrase.innerHTML +=block;
      }}

function GetWords(element){
var arraySpliced = element.split(" ");

return arraySpliced;}


function Next(){
  
  currentText +=  1;

  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     
  
   if(clickable =="clickable"){
     CreateBoxes(GetWords(currentArray[currentText]));
   }
   else{
    highlight(currentArray[currentText]);
   }} 

function Previous(){
   
  currentText-=1;
     
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
       
 
   if(clickable =="clickable"){
     CreateBoxes(GetWords(currentArray[currentText]));
   }
   else{
   highlight(currentArray[currentText]);
   }} 









const synth = window.speechSynthesis;


var  selectedVoice;


var ulContainer = document.querySelector(".dropdown__items");
// Fetch the list of voices and populate the voice options.


function loadVoices() 
{
  // Fetch the available voices.
   var voices = speechSynthesis.getVoices();
   var str;
  // Loop through each of the voices.
  voices.forEach(function(voice, i) 
  {
    if(voice.lang.includes("en"))
    {

         if(!voice.name.includes('Microsoft'))
         {
           if(voice.name.includes('Google')) 
              str = voice.name.replace('Google', '');
                                   
                                   

            var block = `<li onclick='setVoice(this)'>${str}</li>`  
           
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
  
   var children = ulContainer.children;

 document.querySelector(".dropdown__text").innerText = Array.from(children)[1].innerText;
  Array.from(children)[1].style.background = "#ffb400";
  Array.from(children)[1].style.color = "#fff";

   selectedVoice = synth.getVoices().filter(function(voice) { console.log(voice.name.includes(Array.from(children)[1].innerText)); return voice.name.includes(Array.from(children)[1].innerText) })[0];

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



async function parseSentences() {
 
  await showReadingText();  
}

async function showReadingText(textPart) {
    
  return new Promise(resolve => { resolve(); });
}

var currentPressed;



function StartSpeaking(){
  speaker.style.backgroundColor = "#f5971d";
  speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";

  parseSentences();
  speak();
}

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
  var speakObj;

  if(isForLetters)  {
    var sound = new Audio();
    
    sound.src = `audios/LetterSounds/${currentArray[currentText]}.mp3`;  //  preload
   sound.play();

   document.querySelector("#speakerIcon").style.display = "none";
   document.querySelector("#speakingLoader").style.display = "flex";

   if(currentPressed!=null){
    currentPressed.style.backgroundColor = "#1a95f4";
    currentPressed.style.boxShadow = "0px 10px 0px 0px #1a7ac5";
  }
   sound.addEventListener("ended", function(){
  
     sound.currentTime = 0;
     SetSpeakingUI();
});

 }
 else{
   if(currentPressed ==  null){

    speakObj = new SpeechSynthesisUtterance(currentArray[currentText].toLowerCase());   
 
}
 else{
  console.log("Supposed to speak the word now");
   speakObj = new SpeechSynthesisUtterance(currentPressed.innerText);
   
}}

if(speakObj!=null)
{
  speakObj.default = false;
  speakObj.voice = selectedVoice;
 // speakObj.lang= getVoicesWithLangSubstring(speakObj.voice.lang);
  speakObj.rate = 0.8;
  synth.speak(speakObj);

  speakObj.addEventListener('end', function () {
  SetSpeakingUI();
  });
}

document.querySelector("#speakerIcon").style.display = "none";
document.querySelector("#speakingLoader").style.display = "flex";
 
return new Promise(resolve => { speakObj.onend = resolve; });
}
else{
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}

}



function SetSpeakingUI(){

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




function CheckButtonNextAvailability(){
  if(currentText == currentArray.length-1){
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
  if(currentText <=0){

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

function getVoicesWithLangSubstring (langSubstr) {
    return speechSynthesis.getVoices().filter(function (v) {
      return v.lang.replace('_', '-').substring(0, langSubstr.length) === langSubstr
    })
  }





















/*
//Speaking Area
//Speaking variables


let voices = [];
 




window.speechSynthesis.addEventListener("voiceschanged",()=>{

voices = window.speechSynthesis.getVoices();

 selectedVoice = voices.find((voice)=> voice.name.includes("Google UK English Female") || voice.name.includes("Karen") );

if(selectedVoice == undefined){
selectedVoice = voices.find((voice)=> voice.name.includes("Microsoft Mark - English (United States)"));
}


});

 


*/