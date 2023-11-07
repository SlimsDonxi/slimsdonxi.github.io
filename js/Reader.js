
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


 document.querySelector("#listPhonics .container .row").innerHTML ='';
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

return `<div class="col-md-4 margi_bottom" onmouseup="GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834">            
        <h1> ${el}</h1>
        </div>
    </div>`    

}

function AppendForReading(el){
 return `<div class="col-md-6 margi_bottom" onmouseup="GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834; text-align:start; ">            
        <span>${el}</span>
        </div>
    </div>`    
}




function GetText(element) {

document.querySelector("#reading").style.display ="block";

var clicked = element.children[0].children[0];

if(clickable == "clickable")   
 CreateBoxes(GetWords(clicked.innerText));

else 
 document.querySelector('#displayedText').innerText = clicked.innerText;

  var content = document.querySelector("#rowContent");
  var divs = content.querySelectorAll(".margi_bottom");


currentText = Array.from(divs).indexOf(element);

CheckButtonNextAvailability();
CheckButtonPreviousAvailability();
}


function CreateBoxes(element){

 displayedPhrase.innerHTML='';
    for(var i in element)
      { 
        var block = `<button class="word shake" onclick="SpeakIt(this)"><span>${element[i]}</span></button>`;
       displayedPhrase.innerHTML +=block;
      }
      displayedPhrase.innerHTML +=`<div style="margin-top: 120%; margin-bottom:500px;">`;
}



function GetWords(element){
var arraySpliced = element.split(" ");

return arraySpliced;
}


function Next(){
  
  currentText +=  1;


  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     
  
   if(clickable =="clickable"){
     CreateBoxes(GetWords(currentArray[currentText]));
   }
   else{
    displayedText.innerText = currentArray[currentText];
   }
} 

function Previous(){
   
  currentText-=1;
     
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
       
 
   if(clickable =="clickable"){
     CreateBoxes(GetWords(currentArray[currentText]));
   }
   else{
    displayedText.innerText = currentArray[currentText];
   }
} 

function CloseReader(el){
  currentText =0;
 
   
  if(el == 'listPhonics')
     document.querySelector('#listPhonics').style.display = "none";
   else 
     document.querySelector('#reading').style.display = "none";
}


currentText=0;
const synth = window.speechSynthesis;







let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();

  voices.forEach((voice)=>{
    console.log(voice);
  });
};



async function parseSentences() {
  const selectedVoice = voices[9].name; 
  await showReadingText();  
}

async function showReadingText(textPart) {
  
  
  return new Promise(resolve => { resolve(); });
}

var speakingObject;



function StartSpeaking(){
  speaker.style.backgroundColor = "#f5971d";
speaker.style.boxShadow = "0px 5px 0px 0px #f5971d";
  parseSentences();
  speak();
}




function speak(){

  if ('speechSynthesis' in window) {

  synth.cancel();
  var speakObj = new SpeechSynthesisUtterance();

  if(isForLetters)  {
    var sound = new Audio();
    
    sound.src = `audios/LetterSounds/${currentArray[currentText]}.mp3`;  //  preload
   sound.play();
 }
 else{
   if(speakingObject ==  null){
console.log(currentArray[currentText]);
    speakObj = new SpeechSynthesisUtterance(currentArray[currentText]);   
 
}
 else{
  console.log("Supposed to speak the word now");
   speakObj = new SpeechSynthesisUtterance(speakingObject.innerText);
   
}}

speakObj.lang="en";
speakObj.voice = voices.find((voice)=> voice.name =="Google UK English Female");
speakObj.rate = 0.8;
  synth.speak(speakObj);
 speakingObject = null;

document.querySelector("#speakerIcon").style.display = "none";
document.querySelector("#speakingLoader").style.display = "flex";

speakObj.addEventListener('end', function () {
     speaker.style.backgroundColor = "#1a95f4";
speaker.style.boxShadow = "0px 6px 0px 0px #1a7ac5";
document.querySelector("#speakerIcon").style.display = "flex";
document.querySelector("#speakingLoader").style.display = "none";
})





 
  return new Promise(resolve => { speakObj.onend = resolve; });
}
else{
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}

}

function SpeakIt(thisEl) {
  speakingObject = thisEl;
  speak();
}



function CheckButtonNextAvailability(){
  if(currentText == currentArray.length-1){
    nextButton.style.backgroundColor = "gray";
         nextButton.style.opacity = "0.2";
           nextButton.style.boxShadow = "0px 0px #cb2e26";    
        nextButton.removeAttribute('onclick');
 } else{

          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 3px #46a52d";         
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
      prevButton.style.boxShadow = "0px 3px #cb2e26";  
      prevButton.setAttribute("onclick", "Previous()" );
}
}



