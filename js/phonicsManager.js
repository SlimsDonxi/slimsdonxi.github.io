var arrayLetters = ["a", "t", "i", "p", "n", "ck", "e", "h","r","m","d","g","o","u","l","f","b","ai","j","oa","ie","ee","or","z","w","ng","v","oo","oo1","y","x","ch","sh","th","th1","qu","ou","oi","ue","er","ar"];
var arrayAt = ["bat", "cat", "fat", "hat", "lat", "mat","pat"];
var arrayCh = ["chip", "chow", "chew", "chin", "chop","chess","chic", "chase","chalk", "china", "chirp", "chest", "catch","batch", "fetch", "watch", "match" ];
var arrayOO = ["too", "zoo", "goo", "boo", "poo", "moo","goop","tool","fool", "pool", "root","loot","moon", "roof", "doom","boom", "groom", "vroom","goose",  "cookie","poor", "good", "look","took", "book",   "foot",
     "hook" ];
var arraySh = ["shake", "shade", "shape", "shack", "she","sheep","sheet", "shed","shy", "shine", "shell", "shin", "shoe", "shut","shop", "ship", "shot", "ash", "bash", "dash", "flash", "trash", "cash", "mesh", "flesh", "fish", "wash", "push" ];

var listSentences = [];

var currentText =0;

var arrayDesired = [ "ch","at", "oo", "sh"]

const listPhonics =  document.querySelector('#listPhonics');

const readingTempalte = document.querySelector('#readingTemplateHolder');
fetch('./readingTemplate.html')
.then(res=>res.text())
.then(data=>{

  readingTempalte.innerHTML=data;

});



function AppendForPhonics(el){
return `<div class="col-md-4 margi_bottom" onmouseup="PlayClick();GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834">            
        <h1> ${el}</h1>
        </div>
    </div>`    }


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


var textClicked;
function GetText(element) {
 

switch(element){

case 'letters':listSentences = arrayLetters; break;
case `at`: listSentences = arrayAt;break;
case `ch`: listSentences = arrayCh;break;
case `sh`: listSentences = arraySh;break;
case `oo`: listSentences = arrayOO;break;

}

initReadingTemplate();
anime({
     targets:readingTempalte,
     left:'0%',
     duration:800,
     ease:'easeOutQuint'
});

setTimeout(()=>{
   CheckButtonNextAvailability();
  CheckButtonPreviousAvailability();   
},10)





if(element.length <3)    
document.querySelector('#microphone').style.display ='none';


highlight(listSentences[currentText]);


}


function highlight(el){


var desired = arrayDesired.filter( function(x){return el.includes(x)});

if (el.length > 2){

var startPosition =  el.indexOf(desired[0]);
var splitted = el.split(desired);
splitted.forEach(x=>{console.log(x)});
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
