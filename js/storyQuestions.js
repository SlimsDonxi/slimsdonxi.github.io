const background =  document.querySelector('#backgroundQuestions');
const ulQuestions = document.querySelector('#questionOptions')
const questionText = document.querySelector('#questionText');
const questionCounter = document.querySelector('#questionCounter');
var fileQuestions;
const confirmButton = document.querySelector('#confirm');
var arrayQuestions;
var currentQuestion;
var counterQuestions =0;
const progressBars = document.querySelector('.bar');

var factorProgress;
var selectedAnswer;

var confirmer = document.querySelector('#confirmer');
var arrayQuestions =0;
var currentProgress =0;
const scorequestionContainer = document.querySelector('#scorequestionWrapper');


function startStoryQuestions(){

	background.style.display = 'block';

	fileQuestions = FileHelper(`${root}/${listSentences[0]}/questions.json`);

	GetQuestionsList();

}


function GetQuestionsList(){
	ulQuestions.innerHTML='';
confirmer.style.display='none';

 arrayQuestions = JSON.parse(fileQuestions);
factorProgress = 1/arrayQuestions.length *100;

GenerateQuestion();
}


function GenerateQuestion(){
currentQuestion = arrayQuestions[counterQuestions];
questionText.innerText = currentQuestion.question;
currentQuestion.options.forEach(x=>{
	ulQuestions.innerHTML+= 
	`<div class="col-md-12 questionAnswer" onclick='lockAnswer(this)'>${x}</div>`;
});
 var correctAnswer =  document.createElement('div');
 correctAnswer.classList.add("col-md-12","questionAnswer");
 correctAnswer.onclick = function() {lockAnswer(this)};
correctAnswer.innerText = currentQuestion.answers;
var randomPosition = Math.floor(Math.random() * currentQuestion.options.length+1);
ulQuestions.insertBefore(correctAnswer, ulQuestions.childNodes[randomPosition]);


speakOption(questionText);
}


function lockAnswer(el){

speakOption(el);
var options = document.querySelectorAll('.questionAnswer');
Array.from(options).forEach(x=>{
	x.style.background = "#fff";
	x.style.color= '#3d3d3d';
})
el.style.background = "#f4b305";
el.style.color='#fff';

selectedAnswer = el;
confirmButton.classList.remove('disabled');
confirmButton.classList.remove('enabled');

anime({
	targets : el,
	scale : 1.1,
	direction :'alternate',
	duration:600,
	ease: 'linear'
})

}

function speakOption(el){
synth.cancel();
var speakObj = new SpeechSynthesisUtterance(el.innerText);
speakObj.voice =selectedVoice;

synth.speak(speakObj);
}


function confirmAnswer(){
	
if(currentQuestion.answers.includes(selectedAnswer.innerText))
	correctAnswer();
else wrongAnswer();
}

function correctAnswer(){
	ulQuestions.innerHTML ='';
	counterQuestions++;

	
	selectedAnswer.style.background = '#6cd023';
	selectedAnswer.style.color = '#e5fdd4';

confirmButton.classList.remove('enabled');
confirmButton.classList.remove('disabled');

anime({
	targets: '#scorequestionWrapper',
	scale:1,
	duration:600,
	ease:'easeOutCubic'
});

if(counterQuestions == arrayQuestions.length){

	audio.src = './audios/positive.wav';
document.querySelector('#basic').style.display ='none';
document.querySelector('#trophy').style.display ='block';

}
else{

	audio.src = './audios/correct.wav';
}
	    audio.play();
}

function fadeOutScore(){
	
	var animation = anime({targets: '#scorequestionWrapper',
	scale:0,
	duration:600,
	ease:'easeOutCubic'
});
	GenerateQuestion();
animation.finished.then(()=>{

	 updateSlider();	
	 audio.pause();audio.currentTime = 0;
})


    

}

function wrongAnswer(){
selectedAnswer.style.background = '#f72f42';
selectedAnswer.style.color = '#fdd4d8';
audio.src = './audios/fail.wav';
        audio.play();
}




function updateSlider(){


currentProgress += factorProgress;
console.log(currentProgress);

      progressBars.style.transitionDuration = `1s`;
    progressBars.style.width = `${currentProgress}%`;
 

}

function Continue(){
	 document.querySelector('#ResultWrapper').style.opacity = 0;
    document.querySelector('#ResultWrapper').style.transform = 'scale(0)';
    window.setTimeout(function(){
      document.querySelector('#ResultWrapper').style.display='none';
    },700);
	
	audio.pause();
audio.currentTime = 0;
}


function DisplayConfirmer(){
confirmer.style.left = "120%";
confirmer.style.display = "flex";
anime({
	targets:'#confirmer',
	translateX: ['0','-120%'],
	duration:600,
	easing:'easeOutElastic'
});
}