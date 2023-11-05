
var arrayLetters = ["a", "t", "i", "p", "n", "ck", "e", "h","r","m","d","g","o","u","l","f","b","ai","j","oa","ie","ee","or","z","w","ng","v","oo","oo1","y","x","ch","sh","th","th1","qu","ou","oi","ue","er","ar"];
var arrayAt = ["bat", "cat", "fat", "hat", "lat", "mat","pat"];
var arrayCh = ["chip", "chat", "chow", "chew", "chin", "chop","chess","chic", "chase","chalk", "china", "chirp", "chest", "catch","batch", "fetch", "watch", "match" ];
var arrayOO = ["too", "zoo", "goo", "boo", "poo", "moo","goop","good", "look","took", "book", "poor", "tool", "foot", "pool","moon", "fool", "loot", "hook", "boom", "root", "roof", "doom","cookie", "vroom", "goose", "groom" ];
var arraySh = ["shake", "shade", "shape", "shack", "she","sheep","sheet", "shed","shy", "shine", "shell", "shin", "shoe", "shut","shop", "shoot", "ship", "shot", "ash", "bash", "dash", "flash", "trash", "cash", "mesh", "flesh", "fish", "wash", "push" ];
var arrayGood = ["I am good at basketball", "I am very good at dancing", "You are extremely good at running", "He is great at swimming", "I am bad at drawing","She is really bad at climbing","We are horrible at singing"];
var arrayToo = ["I like apples and i like oranges too", "I cannot fly and I cannot swim either", "I do not like to dance and I do not like to play either", "If you are happy then I am happy too", "You are not my friend and I am not your friend either","I like to drink milk but I do not like to drink water","I like to eat vegetables but I do not like to eat fruits"];
var arraySchool = ["This is my pencil case", "I have a huge pencil case", "I can put an eraser in my pencil case", "Eraser is a school supply", "I can put a marker in my pencil case","Marker is a school supply too","I can put a glue stick in my pencil case","Glue is also a school supply","I cannot put an elephant in my pencil case","I have a lot of crayons","I put all of my school supplies in my schoolbag","Because the elephant is too big!"];
var currentArray = [];

var isForLetters = false;
var clickable;
var currentText =0;


function populate(id){
  
switch(id){

case 'at': currentArray = arrayAt; isForLetters = false;break;
case 'ch': currentArray = arrayCh;isForLetters = false;break;
case 'sh': currentArray = arraySh;isForLetters = false;break;
case 'oo': currentArray = arrayOO; isForLetters = false;break;
case 'school': currentArray = arraySchool; clickable ="clickable";isForLetters = false;break;
case 'too': currentArray = arrayToo;clickable ="clickable";isForLetters = false;break;
case 'good': currentArray = arrayGood;clickable ="clickable";isForLetters = false;break;
case 'letters': currentArray = arrayLetters; isForLetters = true; break;}


var blockStr;
 document.querySelector("#content").innerHTML ='';
for(var i=0; i< currentArray.length; i++)
{
  
  
    if(currentArray[i].indexOf('1')>0) {
      currentArray[i] = currentArray[i].replace('1', '');}

       document.querySelector("#content").innerHTML+= `<li><button class="mainButton" onclick ="GetText(this)">${currentArray[i]}</button></li>`    
  
}
 

  document.querySelector("#wrapper").style.display ="block";
}






function GetText(element) {


  var divs = document.querySelectorAll("#content button");
  currentText = Array.from(divs).indexOf(element);
  console.log(currentText);
  document.querySelector('#ReadingContainer').style.display = "block"; 

  if(clickable != "clickable")   
  document.querySelector('#displayedText').innerText = element.innerText;
  else {
    CreateBoxes(GetWords(element.innerText));
    document.querySelector('#Lines').style.display = 'none';
  }

  console.log("This array has :" +currentArray[0]);
}



function CreateBoxes(element){
 document.getElementById('displayedPhrase').innerHTML='';

    for(var i in element)
        { 
            var block = `<button class="word shake" onclick="SpeakIt(this)">${element[i]}</button>`;
        document.getElementById('displayedPhrase').innerHTML +=block;
    }

      document.getElementById('displayedPhrase').innerHTML +=`<div style="margin-top: 120%; margin-bottom:500px;">`;
}

function GetWords(element){
var arraySpliced = element.split(" ");

return arraySpliced;
}


function Next(){
  
  currentText +=  1;
  var listButtons = document.querySelectorAll("#container button");


  if(currentText == currentArray.length-1)
  {
    var nextButton =  document.getElementById("nextSound");
        nextButton.style.backgroundColor = "gray";
        nextButton.style.opacity = "0.2";
        nextButton.style.boxShadow = "0px 0px #46a52d";  
        nextButton.removeAttribute('onclick');
  }

  var prevButton = document.getElementById("previousSound");
      prevButton.style.backgroundColor = "#f53228";
      prevButton.style.opacity = "1";
      prevButton.style.boxShadow = "0px 16px #cb2e26";  
      prevButton.setAttribute("onclick", "Previous()" );

     document.querySelector('#displayedText').innerText = currentArray[currentText];
   if(clickable =="clickable"){
     CreateBoxes(GetWords(currentArray[currentText]));
   }
} 

function Previous(){
   
   currentText-=1;
     var listButtons = document.querySelectorAll("#container button");
   

    if(currentText == 0){
         var prevButton =  document.getElementById("previousSound");
           prevButton.style.backgroundColor = "gray";
         prevButton.style.opacity = "0.2";
           prevButton.style.boxShadow = "0px 0px #cb2e26";    
        prevButton.removeAttribute('onclick');
    }

        var nextButton = document.getElementById("nextSound");
          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 16px #46a52d";         
         nextButton.style.opacity = "1";
        nextButton.setAttribute("onclick", "Next()" );

         document.querySelector('#displayedText').innerText = currentArray[currentText];
} 

function CloseReader(el){
  if(el == 'ReadingContainer')
     document.querySelector('#ReadingContainer').style.display = "none";
   else 
     document.querySelector('#wrapper').style.display = "none";
}
currentText=0;
const synth = window.speechSynthesis;


// const fullScreenButton=document.querySelector('#full-screen-button');
const inputText = document.querySelector('#displayedPhrase');



const lizen = document.querySelector('#speaker');




//Setting Variables
let voices = [];
const synthObj = window.speechSynthesis;

//Execution Statements and Event Handlers
populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}


lizen.addEventListener('click', function () {
  parseSentences();
  lizen.disabled = true;
  
});


//FUNCTIONS SECTION

//Fetches and Populates the Voices Array in Alphabetical Order
function populateVoices() {
  voices = synthObj.getVoices();
}



async function parseSentences() {
  const selectedVoice = voices[9].name;
  


  
  
  await showReadingText();
  

  lizen.disabled = false;
}


async function showReadingText(textPart) {
  
  
  return new Promise(resolve => { resolve(); });
}

document.querySelector("#speaker").addEventListener('click', function(){
  speak();
})

var speakingObject;
function speak(){
  synthObj.cancel();
  var speakObj = new SpeechSynthesisUtterance();

  

  if(isForLetters)  {
    var sound = new Audio();
    sound.src = `../audios/LetterSounds/${currentArray[currentText]}.mp3`;  //  preload
   sound.play();
 }
 else{
   if(speakingObject ==  null){

    speakObj = new SpeechSynthesisUtterance(currentArray[currentText]);   
 
}
 else{
   speakObj = new SpeechSynthesisUtterance(speakingObject.innerText);
   
}

speakObj.voice = voices[9];
speakObj.rate = 0.8;
  synthObj.speak(speakObj);
 }


 
  return new Promise(resolve => { speakObj.onend = resolve; });
}

function SpeakIt(thisEl) {
  speakingObject = thisEl;
  speak();
}






