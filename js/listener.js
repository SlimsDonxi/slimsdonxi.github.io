  

  const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      const inputText = document.querySelector("#displayedText");
       const inputPhrase = document.querySelector("#displayedPhrase");
      var result;
  	const microphone = document.querySelector('#microphone');

      recognition.continuous = true;

      microphone.addEventListener("pointerdown", () => {

        recognition.start();
      });

      microphone.addEventListener("pointerup", () => {
     
        recognition.stop();
      });

      recognition.addEventListener("result", (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

       result = transcript;
       CheckResult();
      });

      function CheckResult(){
      	if(result == inputText.innerText || result == clicked.innerText)
      		alert("Youre right")

      	else{
      		alert("WONRG: You said: "+ result + "Should be : "+ clicked.innerText " or "+ inputText.innerText);
      	}
      }