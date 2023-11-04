var currentText =0;

var array = [
    "I am good at basketball", 
    "I am very good at dancing", 
    "You are extremely good at running", 
    "He is great at swimming", 
    "I am bad at drawing",
     "She is really bad at climbing",
     "We are horrible at singing"];

function Init(){

  populate(); 

}

Init();

function populate(){
  


const mainWrapper =   document.getElementById("container");

for(var i=0; i< array.length; i++){

     var blockStr = 
   `<li><button class="mainButton" onclick="GetText(this)"> ${array[i]}</button></li>`

  mainWrapper.innerHTML +=blockStr;



}
}




function GetWords(element){
var arraySpliced = element.split(" ");

return arraySpliced;
}


function GetText(element) {
 document.getElementById('displayedPhrase').innerHTML ="";
           var divs = document.querySelectorAll("#container button");
          currentText = Array.from(divs).indexOf(element);
           

           document.getElementById('ReadingDiv').style.display = "block";
      
           CreateBoxes(GetWords(element.innerText));
         //  document.getElementById('displayedText').innerText = element.innerText;
       
        }



function CreateBoxes(element){
 

    for(var i in element)
        { 
            var block = `<button class="word" onclick="SpeakIt(this)">${element[i]}</button>`;
        document.getElementById('displayedPhrase').innerHTML +=block;
    }
       document.getElementById('displayedPhrase').innerHTML +=`<div style="margin-top: 120%; margin-bottom:500px;">`;
}

function PlaySound(element){
    audioSource.pause();
    var audio = new Audio();
    audio.src = `../audios/common/${(element.innerText.toLowerCase())}.mp3`;
    audio.play();
    var text = element.innerText;
}

function GetNext(element){
 
       audioSource.pause();
document.getElementById('displayedPhrase').innerHTML ="";
  currentText +=  1;
     var listButtons = document.querySelectorAll("#container button");
     var elem = listButtons[currentText];
    elem.onclick.apply(elem);

    if(currentText == array.length-1){
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
        prevButton.setAttribute("onclick", "GetPrevious()" );
    
} 

function GetPrevious(element){

 audioSource.pause();
    document.getElementById('displayedPhrase').innerHTML ="";
   currentText-=1;
     var listButtons = document.querySelectorAll("#container button");
     var elem = listButtons[currentText];
    elem.onclick.apply(elem);

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
        nextButton.setAttribute("onclick", "GetNext()" );
} 
    
    function CloseReader(){
     document.getElementById('ReadingDiv').style.display = "none";
}


const synth = window.speechSynthesis;

function SpeakIt(el){
    const utterance = new SpeechSynthesisUtterance(el.innerText);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
    synth.speak(utterance);
    
  }

  function ReadSentence(){
  
     const utterance = new SpeechSynthesisUtterance(array[currentText]);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
    synth.speak(utterance);
}