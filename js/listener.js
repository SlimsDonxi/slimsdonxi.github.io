

        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      const inputText = document.querySelector("#displayedText");
      const inputPhrase = document.querySelector("#displayedPhrase");
      var result;
  	 const microphone = document.querySelector('#microphone');
      const scoreSpeechWrapper= document.querySelector('#scoreSpeech');


    const resultContainer = document.querySelector('#scoreSpeechContainer');
    const score = document.querySelector('#score');
    const comment = document.querySelector('#comment');
    var audio = document.querySelector('#audioPlayer');
    var arraySvg = [ resultContainer.querySelector('#greatSvg'),resultContainer.querySelector('#happySvg'),resultContainer.querySelector('#badSvg') ]

    var speechTextContainer = document.querySelector('#microTranscript');
    var speechText = document.querySelector('#microText');
    recognition.continuous = true;

    var recognizing = false;

      microphone.addEventListener("pointerdown", () => {
        

        if(!recognizing){
        ActivateButton();

        audio.src = './audios/startRecord.wav';
        audio.play();

      
        recognition.start();
       
      recognition.addEventListener('start', ()=>){
        recognizing = true;
      }
         recognition.addEventListener("result", (event) => {

 
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
          

       result = transcript; 
       
     
  
        speechTextContainer.style.display = 'block';
        
 
       

      speechText.innerText = result;
      });
        }
      });

      microphone.addEventListener("pointerup", () => {
  
        recognition.stop();
        recognizing = false;
        audio.src = './audios/endRecord.mp3';
        audio.play();
         
         setTimeout(()=>{
           speechTextContainer.style.display = 'none';
           CheckResult();
           ResetButton();
         },800)
      });

     

function CheckResult(){
       
  if(document.querySelector('title').innerText=='Stories'){

  
      score.innerText = similarity(listSentences[currentPage], result);
   
    
  }
          
  else if(clickable) score.innerText = similarity(currentArray[currentText], result);

  else score.innerText = similarity(inputText.innerText, result);
         
         if(score.innerText != 'undefined'){
  setScoreWithColor(score.innerText);
  score.innerText+='%';
}
}


function setScoreWithColor(el){

arraySvg.forEach((x)=> {
  x.style.display ='none';
});

scoreSpeechWrapper.style.display ='flex';

var animation = anime({
  targets: scoreSpeechWrapper,
  opacity:1,
  duration: 1000,
  easing: 'linear' 
});

animation.finished.then(()=>{
anime({
  targets: resultContainer,
  scale:1.1,
  duration: 500,
  direction:'alternate',
  easing: 'easeInOutQuart' 
});
});

     resultContainer.classList.remove('success');
     resultContainer.classList.remove('fail');
     resultContainer.classList.remove('medium');


  if(el>70) 
  {
     audio.src = './audios/good.mp3';     
     resultContainer.classList.add('success');
    comment.querySelector('span').innerText = "Great Job";
     arraySvg[0].style.display = 'block';

  }  

  else if(el>40)
  {

      audio.src = './audios/middle.wav';     
      resultContainer.classList.add('medium');
      arraySvg[0].style.display = 'none';
      arraySvg[1].style.display = 'block';
      comment.querySelector('span').innerText = "Not bad";
  }

   else
   {
     audio.src = './audios/fail.wav';     
     resultContainer.classList.add('fail');
     arraySvg[0].style.display = 'none';
     arraySvg[2].style.display = 'block';
     comment.querySelector('span').innerText = "Try again"
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
          translateY: '-35px',
          duration:500,
          ease:'easeInOutQuart'
       
        });


         microphone.style.backgroundColor = "#1a95f4";
         microphone.style.boxShadow = "0px 5px 0px 0px #1a7ac5";
       
        document.querySelector("#micIcon").style.display = "flex";
        document.querySelector("#micLoader").style.display = "none";
      }


      function similarity(s1, s2) {

        if(s2 === undefined || s2 ==''){
          alert('Text is too short, please try again');
          return;
        }

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

document.querySelector("#ok").addEventListener('pointerup', function(){
  scoreSpeechWrapper.style.display ='none';
})

