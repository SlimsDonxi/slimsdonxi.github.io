
var  arrayLetters;
var  arrayAt;
var  arrayCh;
var  arrayOO;
var arraySh;
var  currentText;
var arrayToHighlight;
var listPhonics;
var displayedText;
var readingTemplate;
var  listSentences = [];

function initPhonicsPage(){
 arrayLetters = ["a", "t", "i", "p", "n", "ck", "e", "h","r","m","d","g","o","u","l","f","b","ai","j","oa","ie","ee","or","z","w","ng","v","oo","oo1","y","x","ch","sh","th","th1","qu","ou","oi","ue","er","ar"];
   arrayAt = ["bat", "cat", "fat", "hat", "lat", "mat","pat"];
   arrayCh = ["chip", "chow", "chew", "chin", "chop","chess","chic", "chase","chalk", "china", "chirp", "chest", "catch","batch", "fetch", "watch", "match" ];
   arrayOO = ["too", "zoo", "goo", "boo", "poo", "moo","goop","tool","fool", "pool", "root","loot","moon", "roof", "doom","boom", "groom", "vroom","goose",  "cookie","poor", "good", "look","took", "book",   "foot",
     "hook" ];
  arraySh = ["shake", "shade", "shape", "shack", "she","sheep","sheet", "shed","shy", "shine", "shell", "shin", "shoe", "shut","shop", "ship", "shot", "ash", "bash", "dash", "flash", "trash", "cash", "mesh", "flesh", "fish", "wash", "push" ];


  currentText = 0;

  arrayToHighlight = [ "ch","at", "oo", "sh"]


fetch('./readingTemplate.html')
.then(res=>res.text())
.then(data=>{

setTimeout(()=>{
Array.from(document.querySelectorAll('.phonicsBlock')).forEach(x=>{

    x.onpointerup=function(){
      PlayClick();  
      currentText=0;
      setTimeout(()=>{
      readingTemplate = document.querySelector('#readingTemplateHolder');
      readingTemplate.innerHTML=data;
      initPhonics(x.querySelector('h1').innerText);
     },100) ;
    }
  })
DisplayLoader(false);
},200)
  



 


});

}



function initPhonics(el){
  
   currentText=0;
 
   displayedtext = readingTemplate.querySelector('#displayedText');

   anime({
    targets:readingTemplate,
    left:el+'%',
    duration:500,
    easing:'easeInOutQuint'
  })
    initReadingTemplate();
 GetPhonicsText(el);


}



function AppendForPhonics(el){
return `<div class="col-md-4 margi_bottom" onmouseup="PlayClick();GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834">            
        <h1> ${el}</h1>
        </div>
    </div>`    }


function initReadingTemplate(){
  readingTemplate.style.display= 'block';
  InjectScript('speechSynthesis');
  InjectScript('listener');

}





function GetPhonicsText(element) {
 

switch(element){

case 'A..Z':listSentences = arrayLetters; break;
case `at`: listSentences = arrayAt;break;
case `ch`: listSentences = arrayCh;break;
case `sh`: listSentences = arraySh;break;
case `oo`: listSentences = arrayOO;break;
}

anime({
     targets:readingTemplate,
     left:'0%',
     duration:800,
     ease:'easeOutQuint'
});





console.log('element == '+ element);
if(listSentences[0].length <3)    
pageHolder.querySelector('#microphone').style.display ='none';


highlight(listSentences[this.currentText]);
setTimeout(()=>{
   CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();   
},50)


}


function highlight(el){

var desired = arrayToHighlight.filter( function(x){return el.includes(x)});

if (el.length > 2){

var startPosition =  el.indexOf(desired[0]);
var splitted = el.split(desired);

 var output = el.substring(0, startPosition) + `<span>` +  el.substring(startPosition,startPosition+desired.length+1) +`</span>` + el.substring(startPosition+desired.length+1);

document.querySelector('#displayedText').innerHTML = output;


}
else{
document.querySelector('#displayedText').innerHTML = `<span style="font-size: 180px">${el}</span>`;
}
}


function GetWords(element){
var arraySpliced = element.split(" ");

return arraySpliced;}






function replaceString(oldS, newS, fullS) {
  for (let i = 0; i < fullS.length; ++i) {
    if (fullS.substring(i, i + oldS.length) === oldS) {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}
