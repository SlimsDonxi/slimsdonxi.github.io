
var audioStrings=[];

var audioFilesLoaded = 0;
var audioSource = document.getElementById('audioSource');

var array = ["a", "t", "i", "p", "n", "ck", "e", "h","r","m","d","g","o","u","l","f","b","ai","j","oa","ie","ee","or","z","w","ng","v","oo","oo1","y","x","ch","sh","th","th1","qu","ou","oi","ue","er","ar"];
   

function Init(){
  populate(); 
}

Init();

function populate(){
  

const container =  document.getElementById("container");

for(var i=0; i< array.length; i++){
  audioStrings.push(`../audios/LetterSounds/${array[i]}.mp3`);

if(array[i].indexOf('1')>0) array[i] = array[i].replace('1', '');

     var blockStr = 
   `<button 
   class="mainButton" style=" font-size: 150px;" 
   onclick ="GetText(this)">
   ${array[i]}
   </button>`

  container.innerHTML +=blockStr;
}


}

function GetText(element) {

          var divs = document.querySelectorAll("#container button");
          currentText = Array.from(divs).indexOf(element);

          document.getElementById('ReadingDiv').style.display = "block";
      

           document.getElementById('displayedText').innerText = element.innerText;
          
           }



function GetNext(element){
   


  currentText +=  1;
     var listButtons = document.querySelectorAll("#container button");
     var elem = listButtons[currentText];
    elem.onclick.apply(elem);

    if(currentText == audioStrings.length-1){
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
  
  
    var sound = new Audio();
    sound.src = `../audios/LetterSounds/${array[currentText]}.mp3`;  //  preload
   sound.play();
    
  }

