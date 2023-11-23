var fileQuestions;
var arrayQuestions;
var currentQuestion;
var counterQuestions = 0;
var factorProgress;
var selectedAnswer;
var arrayQuestions = 0;
var currentProgress = 0;
var lottieList = pageHolder.querySelectorAll(".animationScore");


function startStoryQuestions()
{
	DisplayLoader(true);
	AnimateHolderPage('backgroundQuestions',0);
	document.querySelector('#lionContainer').style.width = `0%`;
	fileQuestions = FileHelper(`${root}/${listSentences[0]}/questions.json`);

	GetQuestionsList();

}


function GetQuestionsList()
{


	document.querySelector('#questionOptions')
		.innerHTML = '';
	confirmer.style.display = 'none';

	arrayQuestions = JSON.parse(fileQuestions);
	factorProgress = 1 / arrayQuestions.length * 100;
	document.querySelector('#questionNumbers').innerText = `0/${arrayQuestions.length}`;
	document.querySelector('.meat').style.display='block';
	GenerateQuestion();

}


function GenerateQuestion()
{
	var ulQuestions = document.querySelector('#questionOptions')
	ulQuestions.innerHTML = '';


	if (counterQuestions < arrayQuestions.length)
	{

		currentQuestion = arrayQuestions[counterQuestions];
		document.querySelector('#questionText')
			.innerText = currentQuestion.question;


		currentQuestion.options.forEach(x =>
		{
			ulQuestions.innerHTML +=
				`<div class="col-md-12 questionAnswer" onclick='lockAnswer(this)'>${x}</div>`;
		});

		DisplayLoader(false);
		AnimateHolderPage('backgroundQuestions',0);
		var correctAnswer = document.createElement('div');
		correctAnswer.classList.add("col-md-12", "questionAnswer");
		correctAnswer.onclick = function()
		{
			lockAnswer(this)
		};
		correctAnswer.innerText = currentQuestion.answers;
		var randomPosition = Math.floor(Math.random() * currentQuestion.options.length + 1);
		ulQuestions.insertBefore(correctAnswer, ulQuestions.childNodes[randomPosition]);
		speakOption(document.querySelector('#questionText'));
	}
}


function lockAnswer(el)
{

	speakOption(el);
	var options = document.querySelectorAll('.questionAnswer');
	Array.from(options)
		.forEach(x =>
		{
			x.style.background = "#fff";
			x.style.color = '#3d3d3d';
		})
	el.style.background = "#f4b305";
	el.style.color = '#fff';

	selectedAnswer = el;
	document.querySelector('#confirm')
		.classList.remove('disabled');
	document.querySelector('#confirm')
		.classList.remove('enabled');

	//Animate options
	anime(
	{
		targets: el
		, scale: 1.025
		, direction: 'alternate'
		, duration: 300
		, ease: 'easeInOutQuart'
	})

}



function speakOption(el)
{
	synth.cancel();
	var speakObj = new SpeechSynthesisUtterance(el.innerText);
	speakObj.voice = selectedVoice;

	synth.speak(speakObj);
}


function confirmAnswer()
{

	if (currentQuestion.answers.includes(selectedAnswer.innerText)) correctAnswer();
	else wrongAnswer();
}



function correctAnswer()
{

	counterQuestions++;

	selectedAnswer.style.background = '#6cd023';
	selectedAnswer.style.color = '#e5fdd4';

	document.querySelector('#confirm')
		.classList.remove('enabled');
	document.querySelector('#confirm')
		.classList.add('disabled');
	/*
	 */

	if (counterQuestions == arrayQuestions.length)
	{

		audio.src = './audios/win.mp3';
		
	
		  	lottieList.forEach((x) => {
		    x.style.display = 'none'
		  });
		  

		lottieList[0].style.display = 'flex';
		document.querySelector('#scoreSpeech')
			.style.display = "flex";

		 anime({
		    targets: document.querySelector('#bannerScore')
		    , width: '140%'
		    , duration: 1000
		  })
	
		
		 document.querySelector('#recordingAudio').style.display='none';
		  
		 document.querySelector('#bannerScore').classList.add('trophySuccess');
		 updateSlider(true);

		 setTimeout(()=>{
		 	document.querySelector('.meat').style.display='none';
		 },1000);

		counterQuestions = 0;
		currentProgress = 0;
	
	}
	else
	{

		audio.src = './audios/good.mp3';
		setTimeout(() =>
		{

			GenerateQuestion()
		}, 1500);
		updateSlider(true);
	}
	document.querySelector('#questionNumbers').innerText = `${counterQuestions}/${arrayQuestions.length}`

	audio.play();



}






function fadeOutScore()
{

	var animation = anime(
	{
		targets: '#ResultContainer'
		, scale: 0
		, duration: 600
		, ease: 'easeOutCubic'
	});

	animation.finished.then(() =>
	{

		audio.pause();
		audio.currentTime = 0;
		scorequestionContainer.style.opacity = '0';
		scorequestionContainer.style.display = 'none';
		document.querySelector('#backgroundQuestions')
			.style.display = 'none';
		synth.cancel();

	})




}

function wrongAnswer()
{
	selectedAnswer.style.background = '#f72f42';
	selectedAnswer.style.color = '#fdd4d8';
	audio.src = './audios/fail.wav';
	audio.play();
}




function updateSlider(el = false)
{

	if (el)
		currentProgress += factorProgress;
	document.querySelector('#lionContainer').style.transitionDuration = `.3s`;
	document.querySelector('#lionContainer').style.width = `${currentProgress}%`;
}


function Continue()
{
	document.querySelector('#ResultWrapper')
		.style.opacity = 0;

	window.setTimeout(function()
	{
		document.querySelector('#ResultWrapper')
			.style.display = 'none';
	}, 700);

	audio.pause();
	audio.currentTime = 0;
}


function DisplayConfirmer()
{
	confirmer.style.left = "120%";
	confirmer.style.display = "flex";
	anime(
	{

		targets: '#confirmer'
		, translateX: ['0', '-120%']
		, opacity: 1
		, duration: 600
		, easing: 'easeOutQuart'
	});
}


function ResetScoreQuestions(){
	document.querySelector('#recordingAudio').style.display='block';
	 document.querySelector('#bannerScore').classList.remove('trophySuccess')
}