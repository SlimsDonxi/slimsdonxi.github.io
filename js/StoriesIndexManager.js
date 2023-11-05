class Story {
  constructor(id, title,text, pictures, numberSentences) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.arrayPictures = pictures;
    this.numberSentences;
 
  }}

var root ="/stories/listStories";
var currentStory;
var currentPage =0;

var listStories =["Alex's super medicine", "Grow flower GROW!", "The Bear and the Bee"];
var listPictures=[];
var listSentences =[];

var currentSentence;
var currentPicture = document.querySelector('#currentPicture');




 CreateStories();




function CreateStories(){

var counter=0;

    listStories.forEach((story)=>{

        var block = ` <div class="storyContainer" onclick ="GenerateStory(this) "><img class="cover" src="../stories/listStories/${listStories[counter]}/cover.jpg" ><label ><p>${listStories[counter]}</p></label></div>`
counter++;
    document.querySelector('#container').innerHTML+= block;
    });}


function GetSentences(el){

var file = FileHelper('listStories/'+el.innerText+'/storyText.txt');
 listSentences =  file.split(/\r?\n/);
  currentSentence = listSentences[0];
return listSentences;}




function CheckIfURLExists(url){
    var request;

console.log(url);
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

   var divs = document.querySelectorAll("#container .storyContainer");
          selectedStory = Array.from(divs).indexOf(element);

  currentStory = element.innerText;

  document.querySelector('#ReadingDiv').style.display = "block";

 listSentences = GetSentences(element);



  currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  
  PopulateSentence(currentSentence);
}


function GetStoryPictures(el){
 
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
 document.getElementById('wordList').innerHTML='';
    var listWords = sentence.split(' ');

    listWords.forEach((word)=>{
        if(word != '‎')
      document.querySelector('#wordList').innerHTML+=    `<div class="word shake" onclick='SpeakIt(this)'>${word}</div> `;
    })}




function GetNext(){
 synth.cancel();
currentPage++;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  

PopulateSentence(currentSentence);

 if(currentPage == listSentences.length-1){
        var nextButton =  document.querySelector("#nextSound");
        nextButton.style.backgroundColor = "gray";
         nextButton.style.opacity = "0.2";
           nextButton.style.boxShadow = "0px 0px #46a52d";  
        nextButton.removeAttribute('onclick');
    }

 var prevButton = document.getElementById("previousSound");
       prevButton.style.backgroundColor = "#f53228";
         prevButton.style.opacity = "1";
           prevButton.style.boxShadow = "0px 16px #cb2e26";  
        prevButton.setAttribute("onclick", "GetPrevious()" );}





function GetPrevious(){
synth.cancel();
currentPage--;
currentSentence = listSentences[currentPage];
currentPicture.src = `${root}/${listSentences[0]}/${currentPage}.jpg`;  

PopulateSentence(currentSentence);

if(currentPage == 0){
         var prevButton =  document.getElementById("previousSound");
           prevButton.style.backgroundColor = "gray";
         prevButton.style.opacity = "0.2";
           prevButton.style.boxShadow = "0px 0px #cb2e26";    
        prevButton.removeAttribute('onclick');
    }

  

        var nextButton = document.getElementById("nextSound");
          nextButton.style.backgroundColor = "#4dbd2f";
           nextButton.style.boxShadow = "0px 16px #46a52d";         
         nextButton.style.opacity = "1";
        nextButton.setAttribute("onclick", "GetNext()" );}

const synth = window.speechSynthesis;


function SpeakIt(el){
    const utterance = new SpeechSynthesisUtterance(el.innerText);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
    utterance.rate =0.8;
    synth.speak(utterance);


}

function ReadSentence(){
    console.log(currentSentence);
     const utterance = new SpeechSynthesisUtterance(currentSentence);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
     utterance.rate =0.8;
    synth.speak(utterance);}


function CloseReader(){
     document.getElementById('ReadingDiv').style.display = "none";
     synth.cancel();}


