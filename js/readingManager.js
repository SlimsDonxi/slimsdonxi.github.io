var arrayGood = ["I am good at basketball", "I am very good at dancing", "You are extremely good at running", "He is great at swimming", "I am bad at drawing","She is really bad at climbing","We are horrible at singing"];
var arrayToo = ["I like apples and i like oranges too", "I cannot fly and I cannot swim either", "I do not like to dance and I do not like to play either", "If you are happy then I am happy too", "You are not my friend and I am not your friend either","I like to drink milk but I do not like to drink water","I like to eat vegetables but I do not like to eat fruits"];
var arraySchool = ["This is my pencil case", "I have a huge pencil case", "I can put an eraser in my pencil case", "Eraser is a school supply", "I can put a marker in my pencil case","Marker is a school supply too","I can put a glue stick in my pencil case","Glue is also a school supply","I cannot put an elephant in my pencil case","I have a lot of crayons","I put all of my school supplies in my schoolbag","Because the elephant is too big!"];


var listSentences = [];

var currentText =0;


const listSentencesContainer =  document.querySelector('#listSentences');

const readingTempalte = document.querySelector('#readingTemplateHolder');
fetch('./readingTemplate.html')
.then(res=>res.text())
.then(data=>{

  readingTempalte.innerHTML=data;

});

function populate(id){
  
switch(id){


case 'school': listSentences = arraySchool; break;
case 'too': listSentences = arrayToo;break;
case 'good': listSentences = arrayGood;break;
}


var blockStr;


 document.querySelector("#rowContent").innerHTML ='';

for(var i=0; i< listSentences.length; i++)
{
  
  if(listSentences[i].indexOf('1')>0) {
    listSentences[i] = listSentences[i].replace('1', '');}

    document.querySelector("#listSentences .container .row").innerHTML+= AppendForReading(listSentences[i]);
  
}
 

 listSentencesContainer.style.display ="block";
}



function AppendForReading(el){


 return `<div class="col-md-6 margi_bottom" onmouseup="PlayClick(); GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834; text-align:start; ">            
        <h2>${el}</h2>
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


var sentenceClicked;

function GetText(element) {

switch(element){


case 'school': listSentences = arraySchool; break;
case 'too': listSentences = arrayToo;break;
case 'good': listSentences = arrayGood;break;
}


initReadingTemplate();

anime({
     targets:readingTempalte,
     left:'0%',
     duration:800,
     easing:'easeOutQuint'
});



if(element.length <3)    $('#microphone').style.display ='none';

 PopulateSentence(GetWords(listSentences[currentText]));


}

function PopulateSentence(element){

document.querySelector('#displayedPhrase').innerHTML='';

    for(var i in element)
      { 
        var block = `<button class="word shake" onclick="SpeakIt(this)"><span>${element[i]}</span></button>`;
        document.querySelector('#displayedPhrase').innerHTML +=block;
      }}

function GetWords(element){
return element.split(" ");}
















