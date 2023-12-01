var arrayLetters;
var arrayAt;
var arrayCh;
var arrayOO;
var arraySh;
var currentText;
var arrayToHighlight;
var listPhonics;
var displayedText;
var readingTemplate;
var listSentences;
var listLetterAudios = [];
var listPhonicsTracing = [];





function initPhonicsPage()
{
 

      arrayLetters = ["a", "t", "i", "p", "n", "ck", "e", "h", "r", "m", "d", "g", "o", "u", "l", "f", "b", "j", "z", "w", "v","y", "x", "ai", "oa", "ie", "ee", "or",  "ng",  "oo", "oo ",  "ch", "sh", "th", "th ", "qu", "ou", "oi", "ue", "er", "ar"];
      arrayAt = ["at", "bat", "cat", "fat", "hat", "lat", "mat", "pat"];
      arrayCh = ["ch", "chip", "chow", "chew", "chin", "chop", "chess", "chic", "chase", "chalk", "china", "chirp", "chest", "catch", "batch", "fetch", "watch", "match"];
      arrayOO = ["oo","too", "zoo", "goo", "boo", "poo", "moo", "goop", "tool", "fool", "pool", "root", "loot", "moon", "roof", "doom", "boom", "groom", "vroom", "goose", "cookie", "poor", "good", "look", "took", "book", "foot"
        , "hook"
      ];
      arraySh = ["sh", "shake", "shade", "shape", "shack", "she", "sheep", "sheet", "shed", "shy", "shine", "shell", "shin", "shoe", "shut", "shop", "ship", "shot", "ash", "bash", "dash", "flash", "trash", "cash", "mesh", "flesh", "fish", "wash", "push"];
      arrayEE =['ee', 'bee', 'see', 'fee', 'pee', 'dee', 'gee', 'wee', 'free', 'tree', 'three', 'flee', 'glee', 'meek', 'peek', 'reek', 'leek', 'meet', 'feet', 'seen', 'seem', 'seed', 'seep', 'beef']
     arrayER = ['her', 'per', 'ser', 'erg', 'ers', 'ern', 'erns', 'perk', 'zerk', 'merk', 'verb', 'berg', 'herb', 'herd', 'germ', 'over', 'ever', 'user' ]
     arrayNG=['song', 'long', 'tong', 'dong', 'hong', 'hung', 'lung', 'dung', 'sung', 'gang', 'hang', 'sang', 'bang', 'fang', 'king', 'ring', 'wing', 'sing', 'ding']
arrayQU = ['quiz', 'quid', 'quit', 'quip', 'quag', 'quick', 'queen', 'quilt', 'quiff', 'quash']
      listLetterAudios = [];
      listPhonicsTracing = [];
      currentText = 0;
      arrayToHighlight = ["ch", "at", "oo", "sh", "ee", 'er', 'ng', 'qu'];
 
      DisplayLoader(true);


      fetch('./readingTemplate.html')
        .then(res => res.text())
        .then(data =>
        {
            DisplayLoader(false);  

            Array.from(document.querySelectorAll('.phonicsBlock'))
              .forEach(x =>
              {
                x.onpointerup = function()
                {
                 loadInnerPhonicsPage(x,data);
                }
              })


        });

}


function loadInnerPhonicsPage(x,data){
   DisplayLoader(true);
    PlayClick();
    currentText = 0;
    readingTemplate = document.querySelector('#readingTemplateHolder');
    readingTemplate.innerHTML = data;
    initPhonics(x.querySelector('h1').innerText);             
}

function initPhonics(el)
{



  displayedtext = readingTemplate.querySelector('#displayedText');
  pageHolder.querySelector('.navButtonTracer').style.display='block';

 
  initReadingTemplate();
  GetPhonicsText(el);


}

function initReadingTemplate()
{
  readingTemplate.style.display = 'block';
  InjectScript('speechSynthesis');
  InjectScript('listener');
  InjectScript('tracer');

}



function LoadReadingVideos()
{

  fetch('../readingvideos/readingVideos.html')
    .then(res => res.text())
    .then(data =>
    {

      setTimeout(() =>
      {
        PlayClick();
        videoTemplate = document.querySelector('#videoHolder');
        videoTemplate.innerHTML = data;
        anime(
        {
          targets: videoTemplate
          , left: 0
          , duration: 500
          , easing: 'easeInOutQuint'
        })
        root = "readingvideos/videos/";
        Array.from(document.querySelectorAll(".containerVideo"))
          .forEach((x) =>
          {
            x.onpointerup = function()
            {
              initVideo(x.getAttribute('alt'));

            }
          });
      });
      
    }, 200)

}




function GetPhonicsText(element)
{
document.querySelector('.traceme').style.display="none";



  switch (element)
  {

 
    case 'A ~ Z':
      listSentences = arrayLetters;

       DisplayLoader(true);
       document.querySelector('.traceme').style.display="block";    
       GetPhonicsTracing();    
      break;
    case `at`:
      listSentences = arrayAt;
      break;
    case `ch`:
      listSentences = arrayCh;
      break;
    case `sh`:
      listSentences = arraySh;
      break;
    case `oo`:
      listSentences = arrayOO;
      break;
    case `ee`:
      listSentences = arrayEE;
      break;
          case `er`:
      listSentences = arrayER;
      break;
      case `ng`:
      listSentences = arrayNG;
      break;
        case `qu`:
      listSentences = arrayQU;
      break;
  }
 loadAudios();

  if (element == "A ~ Z") speaker.onpointerup = function upForLetter()
  {
    speakLetters(currentText);
  }
  else speaker.onpointerup = function upForWord()
  {
    speakSentences();
  }

  anime(
  {
    targets: readingTemplate
    , left: '0%'
    , duration: 800
    , ease: 'easeOutQuint'
  });



  if (listSentences[0].length < 3)
    pageHolder.querySelector('#microphone')
    .style.display = 'none';


  highlight(replaceString(' ','',listSentences[this.currentText]));


}


function loadAudios()
{

 
  arrayLetters.forEach((x) =>
  {
    listLetterAudios.push(new Audio(`audios/LetterSounds/${x}.mp3`));
     
  })
  DisplayLoader(false)

}




var jarOfPromisePhonics=[];

function GetPhonicsTracing()
{

 DisplayLoader(true);

    for (i = 0; i < arrayLetters.length; i++)
    {

        jarOfPromisePhonics.push(
            new Promise((resolve, reject) =>
            {             
              var image = new Image();
        
                 var url = replaceString(' ','',arrayLetters[i]);
              image.src = `../letters/${url}.svg`;

              image.addEventListener('load', function()
              { 
                    resolve(true);
                    listPhonicsTracing.push(image);

                });
            })
        )

    }

    Promise.all(jarOfPromisePhonics)
        .then(result =>
        {
           
                DisplayLoader(false);
                       

        });
}































function highlight(el)
{

  var desired = arrayToHighlight.filter(function(x)
  {
    return el.includes(x)
  });

  if (el.length > 2)
  {

    var startPosition = el.indexOf(desired[0]);
    var splitted = el.split(desired);

    var output = el.substring(0, startPosition) + `<span>` + el.substring(startPosition, startPosition + desired.length + 1) + `</span>` + el.substring(startPosition + desired.length + 1);

    document.querySelector('#displayedText')
      .innerHTML = output;


  }
  else
  {
    document.querySelector('#displayedText')
      .innerHTML = `<span>${el}</span>`;
  }
}


function GetWords(element)
{
  var arraySpliced = element.split(" ");

  return arraySpliced;
}




function replaceString(oldS, newS, fullS)
{
  for (let i = 0; i < fullS.length; ++i)
  {
    if (fullS.substring(i, i + oldS.length) === oldS)
    {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}
