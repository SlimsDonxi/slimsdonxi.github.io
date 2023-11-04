var currentText =0;
var array = ["too", "zoo", "goo", "boo", "poo", "moo","goop",
  "good", "look","took", "book", "poor", "tool", "foot", "pool",
  "moon", "fool", "loot", "hook", "boom", "root", "roof", "doom",
  "cookie", "vroom", "goose", "groom" 

  ];

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





function GetText(element) {

           var divs = document.querySelectorAll("#container button");
          currentText = Array.from(divs).indexOf(element);

           document.getElementById('ReadingDiv').style.display = "block";
      
var block = element.innerText.replace(/oo/g,`<label style="color:#f12a5d">oo</label>`);
           document.getElementById('displayedText').innerHTML =block;
       
        }



function GetNext(element){
   
 
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

function SpeakIt(){
  
    const utterance = new SpeechSynthesisUtterance(array[currentText]);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
    synth.speak(utterance);
    
  }


