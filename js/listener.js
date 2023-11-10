

var originalText = document.querySelector("#displayedText");
var originalPhrase = document.querySelector("#displayedPhrase");

function listen(){
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var speech = true;
	const recognition = new SpeechRecognition();
	recognition.interimResults = true;

recognition.addEventListener('result', e=>{
	const transcript = Array.from(e.results);
	.map(result => result[0])
	.map(result => result.transcript);
	console.log(transcript);
})
	if(speech == true){
		recognition.start();

	}
}