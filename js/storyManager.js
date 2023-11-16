

var root ="stories/listStories";
var currentStory;
var currentPage =0;
var currentText =0;
var listStories =["Alex's super medicine", "Grow flower GROW!"];//, "The Bear and the Bee"];
var listPictures=[];
var listSentences =[];

var currentSentence;
var currentPicture;


var currentPressed;
var loader = document.querySelector('#loader');


var jarOfPromise = [];


const readingTempalte = document.querySelector('#readingTemplateHolder');
fetch('./readingTemplate.html')
.then(res=>res.text())
.then(data=>{

  readingTempalte.innerHTML=data;
currentPicture = document.querySelector('#currentPicture');
document.querySelector('#confirmerDisplayer').style.display='flex';
document.querySelector('#currentPicture').style.display='block';
});


function GetSentences(el){

var file = FileHelper('stories/listStories/'+el.innerText+'/storyText.txt');
 listSentences =  file.split(/\r?\n/);
  currentSentence = listSentences[0];

 
return listSentences;}


function FileHelper(url){
    
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;}





function GenerateStory(element){

loader.style.display='flex';

setTimeout(StartGeneratin(element), 500);
}

function initReadingTemplate(){
  readingTempalte.style.display= 'block';
  InjectScript('speechSynthesis');
  InjectScript('listener');
}

function InjectScript(url){
   var script = document.createElement("script");
  script.src = `js/${url}.js`;
  document.head.appendChild(script);
}


function StartGeneratin(element){


   initReadingTemplate();

    currentPage=0;

   var divs = document.querySelectorAll(".class_box h3");
    selectedStory = Array.from(divs).indexOf(element);

  currentStory = element.innerText;


 listSentences = GetSentences(element);
 count = listSentences.length;

setTimeout(()=>{

PopulateSentence(GetWords(listSentences[currentText]));
GetStoryPictures();   
},500);

}



function PopulateSentence(element){
 document.querySelector('#displayedPhrase').innerHTML='';

var block;
    for(var i in element)
      { console.log(i);
        if(element[i] !='‎'){
         block = `<button class="word shake" onclick="SpeakIt(this)"><span>${element[i]}</span></button>`;
     }
         else{
            block = `<button class="word" style="display:none"></button>`;
         }
        document.querySelector('#displayedPhrase').innerHTML +=block;
    
      }

CheckButtonNextAvailability();
CheckButtonPreviousAvailability();
}

function GetStoryPictures(){

listPictures =[];

for(i = 0; i <= listSentences.length; i++) {

        jarOfPromise.push(
            new Promise( (resolve, reject) => {
                var name = listSentences[i];
                var image = new Image();
                image.src = 'stories/listStories/'+listSentences[0]+'/'+i+'.jpg';
               
               image.addEventListener('load', function() {
                    resolve(true);
                       listPictures.push(this);
                      

                });
            })
        )

    }


    Promise.all(jarOfPromise).then( result => {
       listPictures.sort(function(a,b){ 
     
     
        return a.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.')) -  b.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.'))});
      

      currentPicture.src = listPictures[0].src; 

setTimeout(()=>{
    loader.style.display='none';

    anime({
     targets:readingTempalte,
     left:'0%',
     duration:800,
     easing:'easeOutQuint'
});
     },800);
    
    });
}


function GetWords(element){
return element.split(" ");}


function DisplayConfirmer(){
    anime({
         targets:  document.querySelector('#Confirmer'),
         left:'0%',
         duration:800
    });
}