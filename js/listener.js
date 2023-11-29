var recognition  = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.localService = false;

var inputText = pageHolder.querySelector("#displayedText");
var inputPhrase = pageHolder.querySelector(".displayedPhrase");


var scoreSpeechWrapper = pageHolder.querySelector('#scoreSpeech');
var scoreContainer = pageHolder.querySelector('#scoreSpeechContainer');
var comment = pageHolder.querySelector('.comment');
var audio = pageHolder.querySelector('#audioPlayer');
var speechTranscript = pageHolder.querySelector('#microTranscript');
var speechText = pageHolder.querySelector('#microText');

var score;
var micIcon = pageHolder.querySelector("#micIcon");
var micLoader = pageHolder.querySelector("#micLoader");
var lottieList = pageHolder.querySelectorAll(".animationScore");
var tooShort = pageHolder.querySelector('#speechTooShort')
var scoreDisplayed = false;
var score = pageHolder.querySelector('#score');
var bannerScore = pageHolder.querySelector('.bannerScore')
var microphone = pageHolder.querySelector('#microphone');
var recognizing = false;
var result;


microphone.onpointerdown = function(){

  if (!recognizing) {
      recognition.start();
      ActivateButton();
      startRecording();
  }
};


recognition.onstart= function(){
      recognizing = true;
      console.log('recognition Started');
      audio.src = './audios/startRecord.wav';
      audio.play();
};

recognition.onresult =  function(event) {
 
       console.log(event.results);
  const transcript = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("");

  result = transcript;
 
 if(  speechTranscript.style.display != 'block'){
  speechTranscript.style.display = 'block';
  anime({
    targets:speechTranscript,
    opacity:'1',
    duration:800
  })
}
 var append = replaceString('.',' ',result).toLowerCase();
 append= replaceString('aye ','I',result);
  speechText.innerText = append;
};

pageHolder.onpointerup = function() {

if(recorder!=null)
stopRecording();
stopListening();
};

recognition.onerror=(event)=>{
  recognizing=false;
 console.log('eventError: '+ event.error);
 alert(event.error);
}


function stopListening() {

console.log('isRecognizing  '+ recognizing);
recognition.stop();

  if (recognizing) {

    audio.src = './audios/endRecord.mp3';
    audio.play();
    ResetButton();
   
     onResult();
  
    setTimeout(() => {
      if (speechText.innerText.length <= 1)
        speechTooShort();

    }, 200)
    recognizing = false;
  }

}


function onResult() {

  setTimeout(() => {

    if (!scoreDisplayed) {
    
      CheckResult();
      console.log(result);
    }else{
       recognizing = false;
    }
  }, 2000);
}



function CheckResult() {

  scoreDisplayed = true;

  var str1 = listSentences[currentText].replace(/[.,\/#!$%\^&\*;":{}=\-_`~()]/g, "");
  str1 = str1.replace(/\s{2,}/g, " ");

  var str2 = '';

  if (result !== undefined) {

    str2 = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    str2 = str2.replace(/\s{2,}/g, " ");
  }

  

  if (document.querySelector('.word') != null)
    score = similarity(str1, str2);

  else
    score = similarity(inputText.innerText, result);



  setScoreWithColor(score);


}


function setScoreWithColor(el) {


  resetScoreSVGs();

  scoreSpeechWrapper.style.display = 'flex';

  anime({
    targets: scoreContainer
    , scale: 1
    , duration: 500
    , easing: 'easeInOutQuart'
  });




  lottieList.forEach((x) => {
    x.style.display = 'none'
  })

  /*pageHolder.querySelector('#score')
    .innerText = '';
  pageHolder.querySelector('#score')
    .innerText = el;*/


  removeAllScoreClasses();

  if (el > 70) winResult();

  else if (el > 40) mediumResult();

  else failResult();

  audio.play();


  anime({
    targets: document.querySelector('.bannerScore')
    , left: '0%'
    , duration: 300
    , easing:'easeOutQuint'

  })
}




function ActivateButton() {

  microphone.style.backgroundColor = "#f51d36";
  microphone.style.boxShadow = "0px 0px 0px 0px #d11c31";

  anime({
    targets: microphone
    , scale: 1.5
    , translateY: '-25px'
    , duration: 500
    , ease: 'easeInOutQuart'

  });

  micIcon.style.display = "none"
  micLoader.style.display = "flex";
}


function ResetButton() {



  anime({
    targets: microphone
    , scale: 1
    , translateY: '-15px'
    , duration: 500
    , ease: 'easeInOutQuart'

  });


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
  return Math.ceil((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) * 100);
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
            newValue = Math.min(Math.min(newValue, lastValue)
              , costs[j]) + 1;
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

function removeAllScoreClasses() {
  pageHolder.querySelector('.bannerScore').classList.remove('success');
  pageHolder.querySelector('.bannerScore').classList.remove('fail');
  pageHolder.querySelector('.bannerScore').classList.remove('middle');
}

function failResult() {

  lottieList[3].style.display = 'flex';

  audio.src = './audios/fail.wav';
  pageHolder.querySelector('.bannerScore')
    .classList.add('fail');

  comment.querySelector('span')
    .innerText = "Don't give! Jia you!";

}

function mediumResult() {

  
  lottieList[2].style.display = 'flex';

  audio.src = './audios/middle.wav';
  pageHolder.querySelector('.bannerScore')
    .classList.add('middle');

  comment.querySelector('span')
    .innerText = "Not bad at all";

}

function winResult() {

  lottieList[1].style.display='flex';

  audio.src = './audios/good.mp3';
  pageHolder.querySelector('.bannerScore')
    .classList.add('success');
  comment.querySelector('span')
    .innerText = "Fantastic work!";


}

function resetScoreSVGs() {

  lottieList.forEach(x => {
    x.style.display = 'block';
  })

}

function speechTooShort() {

  tooShort.style.display = 'block';
  setTimeout(() => {
    tooShort.style.display = 'none';
  }, 1500);
}


function retractScore() {
   
  
    var transcriptAnim =    anime({
    targets:speechTranscript,
    opacity:'0',
    duration:800
  });
    
  transcriptAnim.finished=function(){
     speechTranscript.style.display = 'none';
  }
  

  document.querySelector('#scoreSpeech').style.display = 'none';
  document.querySelector('.bannerScore').style.left = '-140%';
  PlayClick();
  scoreDisplayed = false;
  if(document.querySelector("#backgroundQuestions")!=null){
      AnimateHolderPage('backgroundQuestions',100);
  }
}



 var recorder;
 var audioRecording = document.querySelector('#recordingAudio');

  function startRecording() {
    HZRecorder.get(function (rec) {
    recorder = rec;
    recorder.start();
    });
    }

  function stopRecording() {
     if(recorder!=null)
         recorder.stop();
          recorder.play(audioRecording);
        }

     





  
  
      pageHolder.querySelector(".player").onclick = function(){

       audioRecording.pause();
         audioRecording.currentTime =0;
         audioRecording.play();
            pageHolder.querySelector(".stick").classList.add('play');
             pageHolder.querySelector(".record").classList.add('on');
         
        
        };

       audioRecording.onended = function(){
          
           pageHolder.querySelector(".stick").classList.remove('play');
             pageHolder.querySelector(".record").classList.remove('on');
        }
        