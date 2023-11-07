class Story {
  constructor(id, title,text, pictures, numberSentences) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.arrayPictures = pictures;
    this.numberSentences;
 
  }}

var root ="stories/listStories";
var currentStory;
var currentPage =0;

var listStories =["Alex's super medicine", "Grow flower GROW!", "The Bear and the Bee"];
var listPictures=[];
var listSentences =[];

var currentSentence;
var currentPicture = document.querySelector('#currentPicture');


 var nextButton = document.getElementById("next");
var prevButton = document.getElementById("previous");
var displayedPhrase =  document.getElementById('displayedPhrase');

function GetSentences(el){

var file = FileHelper('stories/listStories/'+el.innerText+'/storyText.txt');
 listSentences =  file.split(/\r?\n/);
  currentSentence = listSentences[0];
console.log(currentSentence);
 
return listSentences;}




function CheckIfURLExists(url){
    var request;


if(window.XMLHttpRequest)
    request = new XMLHttpRequest();
else
    request = new ActiveXObject("Microsoft.XMLHTTP");

    request.open('GET', url, false); 
    request.send();

    if (request.status === 404)   return false;
        
   else  return true;}


function FileHelper(url){
    
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;}


function GenerateStory(element){


   listPictures =  GetStoryPictures(element.innerText);
 
    currentPage=0;

   var divs = document.querySelectorAll(".class_box h3");
    selectedStory = Array.from(divs).indexOf(element);

  currentStory = element.innerText;

  document.querySelector('#Reader').style.display = "block";

 listSentences = GetSentences(element);

  currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  
  PopulateSentence(currentSentence);
}


function GetStoryPictures(el){
 listPictures =[];
var url = root+'/'+el;
var exist;
var counter=0;
    do{
        exists = CheckIfURLExists(url+`/${counter}.jpg`);
        if(exists){
        listPictures.push(url+`/${counter}.jpg`);
        counter++;
        }
    }
    while(exists)

    

}


function PopulateSentence(sentence){
 document.getElementById('displayedPhrase').innerHTML='';
    var listWords = sentence.split(' ');

    listWords.forEach((word)=>{
        if(word != '‎')
      document.querySelector('#displayedPhrase').innerHTML+=    ` <button class="word shake" ><span onclick="SpeakIt(this)">${word}</span></button> `;
    })}


function CloseReader(){
     document.getElementById('Reader').style.display = "none";
     synth.cancel();}


const synth = window.speechSynthesis;
const speaker = document.querySelector('#speaker');
//Setting Variables
let voices = [];
const synthObj = window.speechSynthesis;
//Execution Statements and Event Handlers
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}



document.querySelector("#speaker").addEventListener('mouseup', function () {
  parseSentences();
  speak();
  
});

//Fetches and Populates the Voices Array in Alphabetical Order
function populateVoices() {
  voices = synthObj.getVoices();
}



async function parseSentences() {
  const selectedVoice = voices[9].name;
  
  await showReadingText();
  
}

async function showReadingText(textPart) {
  
  
  return new Promise(resolve => { resolve(); });
}
var speakingObject;


function speak(){

  if ('speechSynthesis' in window) {
   synthObj.cancel();
   var speakObj = new SpeechSynthesisUtterance(); 
   if(speakingObject ==  null){
console.log("Centener == " + listSentences[currentSentence]);
    speakObj = new SpeechSynthesisUtterance(currentSentence);   
 
}
 else{
  console.log("Supposed to speak the word now");
   speakObj = new SpeechSynthesisUtterance(speakingObject.innerText);
   
}
speakObj.voice = voices[9];
speakObj.rate = 0.8;
  synthObj.speak(speakObj);
 speakingObject = null;
}else{
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}


}

function SpeakIt(thisEl) {
  speakingObject = thisEl;
  speak();
}




function CheckButtonNextAvailability(){
  if(currentPage == listSentences.length-1){
    nextButton.style.backgroundColor = "gray";
         nextButton.style.opacity = "0.2";
           nextButton.style.boxShadow = "0px 0px #cb2e26";    
        nextButton.removeAttribute('onclick');
 } else{

          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 10px #46a52d";         
         nextButton.style.opacity = "1";
        nextButton.setAttribute("onclick", "Next()" );
 }
}


function CheckButtonPreviousAvailability(){
  if(currentPage <=0){

           prevButton.style.backgroundColor = "gray";
         prevButton.style.opacity = "0.2";
           prevButton.style.boxShadow = "0px 0px #cb2e26";    
        prevButton.removeAttribute('onclick');
}else{
 prevButton.style.backgroundColor = "#f53228";
      prevButton.style.opacity = "1";
      prevButton.style.boxShadow = "0px 10px #cb2e26";  
      prevButton.setAttribute("onclick", "Previous()" );
}
}


function Next(){
  
  currentPage++;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  



  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
     
  
 
    PopulateSentence(currentSentence);
   
} 

function Previous(){
   
  currentPage--;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  

PopulateSentence(currentSentence);
     
  CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();
       

} 
