
var root
var currentStory;
var currentPage =0;
var currentText =0;
var listStories;
var listPictures;
var listSentences;
var currentSentence;
var currentPicture;
var currentStoryPressed;

var jarOfPromise;
var readingTempalte 

function initStoryPage(){
console.log(loader);


this.root ="stories/listStories";
this.currentPage =0;
this.currentText =0;
this.listStories =["Alex's super medicine", "Grow flower GROW!"];//, "The Bear and the Bee"]; 
this.listPictures=[];
this.listSentences =[];
this.jarOfPromise = [];




fetch('./readingTemplate.html')
.then(res=>res.text())
.then(data=>{


readingTempalte = document.querySelector('#readingTemplateHolder');
readingTempalte.innerHTML=data;
this.currentPicture = document.querySelector('#currentPicture');
currentPicture.style.display='block';

document.querySelector('#confirmerDisplayer').style.display='flex';

Array.from(document.querySelectorAll('.storyBlock')).forEach(x=>{
    x.onpointerup=function(){
        initStory(x);
    }
})
DisplayLoader(false);

});
}


function initStory(el){
DisplayLoader(true);
this.GenerateStory(el)

}


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



setTimeout(StartGeneratin(element), 500);
}

function initReadingTemplate(){
  readingTempalte.style.display= 'block';
  InjectScript('speechSynthesis');
  InjectScript('listener');
  InjectScript('storyQuestions')
}




function StartGeneratin(element){


   initReadingTemplate();

    this.currentPage=0;

   var divs = document.querySelectorAll(".class_box h3");
    this.selectedStory = Array.from(divs).indexOf(element);

  this.currentStory = element.innerText;


 this.listSentences = GetSentences(element);
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
      { 
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

this.listPictures =[];

for(i = 0; i <= listSentences.length; i++) {

        jarOfPromise.push(
            new Promise( (resolve, reject) => {
                var name = this.listSentences[i];
                var image = new Image();
                image.src = 'stories/listStories/'+this.listSentences[0]+'/'+i+'.jpg';
               
               image.addEventListener('load', function() {
                    resolve(true);
                       listPictures.push(this);
                      

                });
            })
        )

    }


    Promise.all(jarOfPromise).then( result => {
       this.listPictures.sort(function(a,b){ 
     
     
        return a.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.')) -  b.src.substring(a.src.lastIndexOf('/')+1,a.src.lastIndexOf('.'))});
      

      this.currentPicture.src = listPictures[0].src; 

setTimeout(()=>{
    DisplayLoader(false);
console.log(listPictures.length);
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