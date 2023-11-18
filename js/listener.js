
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.interimResults =true;
recognition.continuous = true;
recognition.lang = "en-US";

var inputText = pageHolder.querySelector("#displayedText");
var inputPhrase = pageHolder.querySelector("#displayedPhrase");
var result;

var microphone = pageHolder.querySelector('#microphone');

var scoreSpeechWrapper= pageHolder.querySelector('#scoreSpeech');
var scoreContainer = pageHolder.querySelector('#scoreSpeechContainer');
var emojiBackground = pageHolder.querySelector('.emojiContainer');
var starsContainer = pageHolder.querySelector('#starsContainer');
var comment = pageHolder.querySelector('#comment');
var audio = pageHolder.querySelector('#audioPlayer');
var emojiContainer = pageHolder.querySelector('.emojiContainer');
var speechTranscript = pageHolder.querySelector('#microTranscript');
var speechText = pageHolder.querySelector('#microText');
var recognizing = false;
var score;
var micIcon = pageHolder.querySelector("#micIcon");
var micLoader = pageHolder.querySelector("#micLoader");
var html =  pageHolder.querySelector('html');
var arrStars = pageHolder.querySelectorAll("#starsContainer .star");
var arraySvg = pageHolder.querySelectorAll(".emojiContainer lottie-player");
var tooShort =  pageHolder.querySelector('#speechTooShort')
var scoreDisplayed = false;



      microphone.onpointerdown = () => {
        if(!recognizing){
            

               
            recognition.start();
            recognition.onstart = () =>{
            recognizing = true;
            ActivateButton();
            audio.src = './audios/startRecord.wav';
            audio.play();
            };

            recognition.onresult= (event) => {

            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
        
            result = transcript; 
            speechTranscript.style.display = 'block';
            speechText.innerText = result;
          };
        }

           
      };


    pageHolder.addEventListener("pointerup", () => {
   stopListening();
          
   });





function stopListening(){

  recognition.stop();

if(recognizing)
{
              
  audio.src = './audios/endRecord.mp3';
  audio.play();
  ResetButton();        

  recognition.onresult= (event) => {
  onResult();
    return;          
  };  
 
  if(speechText.innerText.length<=1)          
speechTooShort();


recognizing = false; 
}



}


function onResult(){

  const transcript = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("");
        
  result = transcript; 
  speechTranscript.style.display = 'block';
  speechText.innerText = result;

 
       
  
  setTimeout(()=>{

     if(!scoreDisplayed){
      speechTranscript.style.display ='none';
      scoreDisplayed = true;

      CheckResult();

      }
     },500);    
}
function CheckResult(){
    
 var str1  = listSentences[currentText].replace(/[.,\/#!$%\^&\*;":{}=\-_`~()]/g,"");
str1 = str1.replace(/\s{2,}/g," ");

var str2='';

if(result!==undefined){

str2= result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
str2 = str2.replace(/\s{2,}/g," ");
}

console.log(str1 + "  "+ str2);

   if(document.querySelector('.word')!= null) 
    score = similarity(str1, str2);

  else 
    score = similarity(inputText.innerText, result);

    

  setScoreWithColor(score);

speechText.innerText =''; 
}


function setScoreWithColor(el){


resetScoreSVGs();

scoreSpeechWrapper.style.display ='flex';

anime({
  targets: scoreContainer,
  scale:1,
  duration: 500,
  easing: 'easeInOutQuart' 
});


  removeAllScoreClasses();

  if(el>70) winResult();

  else if(el>40) mediumResult(); 

  else failResult();
  
  audio.play();
}




      function ActivateButton(){

         microphone.style.backgroundColor = "#f51d36";
         microphone.style.boxShadow = "0px 0px 0px 0px #d11c31";

        anime({
          targets: microphone,
          scale: 1.5,  
          translateY: '-25px',     
          duration:500,
          ease:'easeInOutQuart'
       
        });
    
      micIcon.style.display = "none"
      micLoader.style.display = "flex";
      }


      function ResetButton(){
         speechTranscript.style.display = 'none';
         anime({
          targets: microphone,
          scale: 1,
          translateY: '-15px',
          duration:500,
          ease:'easeInOutQuart'
       
        });
           speechTranscript.style.display = 'none';


         microphone.style.backgroundColor = "#1a95f4";
         microphone.style.boxShadow = "0px 5px 0px 0px #1a7ac5";
       
        micIcon.style.display = "flex";
        micLoader.style.display = "none";
      }


function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return Math.ceil((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) *100);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function removeAllScoreClasses(){
   scoreContainer.classList.remove('success');
     scoreContainer.classList.remove('fail');
     scoreContainer.classList.remove('medium');
}

function failResult(){
 

 
   audio.src = './audios/fail.wav';     
    scoreContainer.classList.add('fail');
     arraySvg[0].style.display = 'none';
     arraySvg[2].style.display = 'block';
     comment.querySelector('span').innerText = "Try again";
      arrStars[2].style.display='none';
       arrStars[1].style.display='none';
}

function mediumResult(){
 
   audio.src = './audios/middle.wav';     
     scoreContainer.classList.add('middle');
      arraySvg[0].style.display = 'none';
      arraySvg[1].style.display = 'block';
      comment.querySelector('span').innerText = "Not bad";
      arrStars[2].style.display='none';
}

function winResult(){
  
   audio.src = './audios/good.mp3';     
   scoreContainer.classList.add('success');
    comment.querySelector('span').innerText = "Great Job";
     arraySvg[0].style.display = 'block';

}

function resetScoreSVGs(){

arraySvg.forEach(x =>{
  x.style.display='none';
});

arrStars.forEach(x =>{
  x.style.display='block';
})

}

function speechTooShort(){

   tooShort.style.display = 'block';
  setTimeout(()=>{
     tooShort.style.display = 'none';
    },1500);
}