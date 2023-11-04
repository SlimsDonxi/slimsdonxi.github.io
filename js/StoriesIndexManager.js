class Story {
  constructor(id, title,text, pictures, numberSentences) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.arrayPictures = pictures;
    this.numberSentences;
 
  }}


var currentStory;
var currentPage =0;

var listStories =[];
var listPictures=[];
var root ="/stories/listStories";
var currentSentence;
var directories = [
`${root}/Alex's super medicine`,
`${root}/Grow flower GROW!`,
`${root}/The Bear and the Bee`

]



CreateClasses();


function CreateClasses(){

  var counter=0;

    directories.forEach((url) =>{ 

        var storyText =FileHelper(`${url}/storyText.txt`);
        var listSentences =  GetSentences(storyText);
         
        var newStory = new Story();
        newStory.title = listSentences[0];
       newStory.id = counter;
       newStory.pictures = GetStoryPictures();
        newStory.sentences = listSentences;
        newStory.text = storyText;

        listStories.push(newStory);
       
        counter++;
    });

   CreateStories();}


function CreateStories(){

var counter=0;

    listStories.forEach((story)=>{

        var block = ` 
<div class="storyContainer" onclick ="GenerateStory(this) ">
            <img class="cover" src="../stories/listStories/${story.title}/cover.jpg" >
            <label ><p>${story.title}</p></label>
</div>


         `
/*
<div class="col-sm-6 col-xs-6 col-md-4 col-lg-4 storyContainer" >
  <img src="../stories/listStories/${story.title}/0.jpg" class="img-responsive img-rounded" alt="${story.title}">
<div id="title"><span>${story.title}</span></div>
</div>`
*/
    
    document.getElementById('container').innerHTML+= block;
    });}


function GetSentences(el){

var listSentences =  el.split(/\r?\n/);


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
        
   else  return true;
}






function FileHelper(url){
    
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;}


function GenerateStory(element){
    
listPictures =[];
currentPage=0;
   var divs = document.querySelectorAll("#container .storyContainer");
          selectedStory = Array.from(divs).indexOf(element);

  currentStory = listStories[selectedStory];

  document.querySelector('#ReadingDiv').style.display = "block";

  GetStoryPictures(currentStory.title);
  currentSentence = currentStory.sentences[0];

  document.querySelector('#currentPicture').src = listPictures[0];   
  PopulateSentence(currentSentence);
}

function GetStoryPictures(el){
    console.log("clickedddd");
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
      document.getElementById('wordList').innerHTML+=    `<div class="word shake" onclick='SpeakIt(this)'>${word}</div> `;
    })}




function GetNext(){
 synth.cancel();
currentPage++;
currentSentence = currentStory.sentences[currentPage];
document.getElementById('currentPicture').src = listPictures[currentPage];

PopulateSentence(currentSentence);

 if(currentPage == currentStory.sentences.length-1){
        var nextButton =  document.getElementById("nextSound");
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
currentSentence = currentStory.sentences[currentPage];
document.getElementById('currentPicture').src = listPictures[currentPage];
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
    synth.speak(utterance);}

function ReadSentence(){
    console.log(currentSentence);
     const utterance = new SpeechSynthesisUtterance(currentSentence);
    synth.cancel();
    utterance.voice = synth.getVoices()[10];
    synth.speak(utterance);}


function CloseReader(){
     document.getElementById('ReadingDiv').style.display = "none";
     synth.cancel();}


