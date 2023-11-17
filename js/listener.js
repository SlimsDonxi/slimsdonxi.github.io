


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

       
  
      recognition.interimResults =true;
      recognition.continuous = true;
      recognition.lang = "en-US";

      const inputText = document.querySelector("#displayedText");
      const inputPhrase = document.querySelector("#displayedPhrase");
      var result;

  	 const microphone = document.querySelector('#microphone');

    const scoreSpeechWrapper= document.querySelector('#scoreSpeech');
    const scoreContainer = document.querySelector('#scoreSpeechContainer');
   const emojiBackground = document.querySelector('.emojiContainer');
   const starsContainer = document.querySelector('#starsContainer');
    const comment = document.querySelector('#comment');
    var audio = document.querySelector('#audioPlayer');
    var emojiContainer = document.querySelector('.emojiContainer');
   

    var speechTextContainer = document.querySelector('#microTranscript');
    var speechText = document.querySelector('#microText');
 
 

    var recognizing = false;
var score;
      microphone.onpointerdown = () => {
        

        if(!recognizing){
            ActivateButton();

            audio.src = './audios/startRecord.wav';
            audio.play();

            
            recognition.start();
            recognition.onstart = () =>{recognizing = true;};
            recognition.onresult= (event) => {

            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
              

            result = transcript; 
            
           speechTextContainer.style.display = 'block';
              
          speechText.innerText = result;
          };
        }

           
      };


       document.querySelector('html').addEventListener("pointerup", () => {
    
           if(recognizing){

              recognition.stop();
              recognizing = false;
              audio.src = './audios/endRecord.mp3';
              audio.play();

                setTimeout(()=>{
                 speechTextContainer.style.display = 'none';
                 CheckResult();
                 ResetButton();
               },800);
            }
          });



function CheckResult(){
       
 var str1  = listSentences[currentText].replace(/[.,\/#!$%\^&\*;":{}=\-_`~()]/g,"");
str1 = str1.replace(/\s{2,}/g," ");

var str2='';
  console.log(result);
if(result!==undefined){

str2= result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
str2 = str2.replace(/\s{2,}/g," ");
}

console.log(str1 + "  "+ str2);

   if(document.querySelector('.word')!= null) 
    score = similarity(str1, str2);

  else 
    score = similarity(inputText.innerText, result);

    
if(result!==undefined){    
  setScoreWithColor(score);
}
else{
  document.querySelector('#speechTooShort').style.display = 'block';
  setTimeout(()=>{
      document.querySelector('#speechTooShort').style.display = 'none';
    },1500);
}

}


function setScoreWithColor(el){


var arraySvg = document.querySelectorAll(".emojiContainer lottie-player");
arraySvg.forEach(x =>{
  x.style.display='none';
})
scoreSpeechWrapper.style.display ='flex';

var arrStars = document.querySelectorAll("#starsContainer .star");


arrStars.forEach(x =>{
  x.style.display='block';
})

anime({
  targets: scoreContainer,
  scale:1,
  duration: 500,
  easing: 'easeInOutQuart' 
});



     scoreContainer.classList.remove('success');
     scoreContainer.classList.remove('fail');
     scoreContainer.classList.remove('medium');


  if(el>70) 
  {
     audio.src = './audios/good.mp3';     
   scoreContainer.classList.add('success');
    comment.querySelector('span').innerText = "Great Job";
     arraySvg[0].style.display = 'block';

  }  

  else if(el>40)
  {

      audio.src = './audios/middle.wav';     
     scoreContainer.classList.add('middle');
      arraySvg[0].style.display = 'none';
      arraySvg[1].style.display = 'block';
      comment.querySelector('span').innerText = "Not bad";
      arrStars[2].style.display='none';
  }

   else
   {
     audio.src = './audios/fail.wav';     
 scoreContainer.classList.add('fail');
     arraySvg[0].style.display = 'none';
     arraySvg[2].style.display = 'block';
     comment.querySelector('span').innerText = "Try again";
      arrStars[2].style.display='none';
       arrStars[1].style.display='none';
  }

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
     
      document.querySelector("#micIcon").style.display = "none"
      document.querySelector("#micLoader").style.display = "flex";
      }

      function ResetButton(){
         anime({
          targets: microphone,
          scale: 1,
          translateY: '-15px',
          duration:500,
          ease:'easeInOutQuart'
       
        });


         microphone.style.backgroundColor = "#1a95f4";
         microphone.style.boxShadow = "0px 5px 0px 0px #1a7ac5";
       
        document.querySelector("#micIcon").style.display = "flex";
        document.querySelector("#micLoader").style.display = "none";
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



