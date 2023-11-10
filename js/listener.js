

var originalText = document.querySelector("#displayedText");
var originalPhrase = document.querySelector("#displayedPhrase");
var transcript;
var startedSpeaking = false;
var micro = document.querySelector('#micro');


function StartListening(){
console.log("clicked");
if(!startedSpeaking){
	startedSpeaking = true;
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var speech = true;
	const recognition = new SpeechRecognition();
	recognition.interimResults = true;

recognition.addEventListener('result', e=>{
	const transcript = Array.from(e.results)
	.map(result => result[0])
	.map(result => result.transcript);
	
})
	if(speech == true){
		recognition.start();
  micro.style.backgroundColor = "#f5971d";
  micro.style.boxShadow = "0px 5px 0px 0px #f5971d";
	}
}
else{
startedSpeaking = false;
  micro.style.backgroundColor = "#4dabf3";
  micro.style.boxShadow = "0px 5px 0px 0px #318bd2";
if(transcript  == originalText.innerText || transcript == originalPhrase.innerText){
	alert("RIHGT");

}
else{
	alert("FALSE");
}
}
}

