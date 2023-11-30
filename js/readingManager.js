var arrayGood;
var arrayToo;
var arraySchool;
var listSentencesContainer;
var readingTempalte;
var currentSentence;
var listSentences = [];
var currentText = 0;

function initReadingPage(el)
{
  currentText = 0;
  arrayGood = ["I am good at basketball", "I am very good at dancing", "You are extremely good at running", "He is great at swimming", "I am bad at drawing", "She is really bad at climbing", "We are horrible at singing"];
  arrayToo = ["I like apples and i like oranges too", "I cannot fly and I cannot swim either", "I do not like to dance and I do not like to play either", "If you are happy then I am happy too", "You are not my friend and I am not your friend either", "I like to drink milk but I do not like to drink water", "I like to eat vegetables but I do not like to eat fruits"];
  arraySchool = ["This is my pencil case", "I have a huge pencil case", "I can put an eraser in my pencil case", "Eraser is a school supply", "I can put a marker in my pencil case", "Marker is a school supply too", "I can put a glue stick in my pencil case", "Glue is also a school supply", "I cannot put an elephant in my pencil case", "I have a lot of crayons", "I put all of my school supplies in my schoolbag", "Because the elephant is too big!"];


  fetch('./readingTemplate.html')
    .then(res => res.text())
    .then(data =>
    {

      Array.from(document.querySelectorAll('.readingBlock'))
        .forEach(x =>
        {

          x.onpointerup = function()
          {
            DisplayLoader(true);
            PlayClick();
            currentText = 0;
           
              listSentencesContainer = document.querySelector('#listSentences');
              readingTempalte = document.querySelector('#readingTemplateHolder');
              readingTempalte.innerHTML = data;

              GetReadingText(x.getAttribute('alt'));

              speaker.onpointerup = function()
              {
                speakSentences();
              }
       
 
          }
        });
   
    });
    console.log('Done');
    
}

var sentenceClicked;


function GetReadingText(element)
{
    DisplayLoader(false);
  switch (element)
  {


    case 'school':
      this.listSentences = arraySchool;
      break;
    case 'too':
      this.listSentences = arrayToo;
      break;
    case 'good':
      this.listSentences = arrayGood;
      break;
  }



  function populate(id)
  {
    currentText = 0;
    switch (id)
    {
      case 'school':
        this.listSentences = arraySchool;
        break;
      case 'too':
        this.listSentences = arrayToo;
        break;
      case 'good':
        this.listSentences = arrayGood;
        break;
    }

    var blockStr;
    document.querySelector("#rowContent")
      .innerHTML = '';

    for (var i = 0; i < this.listSentences.length; i++)
    {

      if (this.listSentences[i].indexOf('1') > 0)
      {
        this.listSentences[i] = this.listSentences[i].replace('1', '');
      }

      document.querySelector("#listSentences .container .row")
        .innerHTML += AppendForReading(listSentences[i]);

    }


    this.listSentencesContainer.style.display = "block";

  }



  function AppendForReading(el)
  {

    return `<div class="col-md-6 margi_bottom" onmouseup="PlayClick(); GetText(this)">
      <div class="class_box text_align_center" style="background:#ef2a38; box-shadow:0 10px 0 0 #d22834; text-align:start; ">            
        <h2>${el}</h2>
        </div>
    </div>`
  }


  function initReadingTemplate()
  {

    readingTempalte.style.display = 'block';
      pageHolder.querySelector('.navButtonTracer').style.display='none';
    InjectScript('speechSynthesis');
    InjectScript('listener');
  }




  initReadingTemplate();

  anime(
  {
    targets: readingTempalte
    , left: '0%'
    , duration: 800
    , easing: 'easeOutQuint'
  });



  if (element.length < 3) $('#microphone')
    .style.display = 'none';

  PopulateSentence(GetWords(this.listSentences[this.currentText]));


}

function PopulateSentence(element)
{
  displayedPhrase = document.querySelector('.displayedPhrase');
  displayedPhrase.innerHTML = '';

  for (var i in element)
  {
    var block = `<button class="word" onpointerup="speakWord(this)"><span>${element[i]}</span></button>`;
    displayedPhrase.innerHTML += block;
  }
}

function GetWords(element)
{
  return element.split(" ");
}
