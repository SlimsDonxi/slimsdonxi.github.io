const loader = document.querySelector('#loader');
const pageHolder = document.querySelector('#pageHolder');
var currentHolderPageTitle = '';
var selectedVoice = 'UK English Male';





function Check(){
  return location.protocol === 'https:'
}
if ( !Check()){
  var _location = location.toString();
  var _newLink = _location.replace('http:', 'https:');
  location = _newLink ;
}




Array.from(document.querySelectorAll('.lobbyLauncher')).forEach(x=>{
  x.onpointerup=function(){
 
    PlayClick();
    loadPage('pageHolder',x.getAttribute('data'))
  }
})



function pageLoaded() {
  anime({
    targets: document.querySelector('#mainLoader')
    , top: '100%'
    , duration: 2500
  })

}

function loadPage(holder, url) {



  DisplayLoader(true);
  pageHolder.innerHTML = '';
  pageHolder.innerText = '';


  document.querySelector('#loader').style.display = 'flex';

  currentHolderPageTitle = url;

  console.log(url);

  fetch(`./${url}.html`)
    .then(res => res.text())
    .then(data => {

      pageHolder.innerHTML = data;

      var scriptText = data.substring(data.indexOf("<script src="));

      scriptText = scriptText.substring(0, scriptText.indexOf("</script>"));
      scriptText = scriptText.substring(scriptText.indexOf('/') + 1);
      scriptText = scriptText.substring(0, scriptText.indexOf('.'));


      if ((document.querySelector(`#${scriptText}`) == null)) {
        InjectScript(scriptText);



        document.querySelector(`#${scriptText}`).addEventListener('load', function() {
          console.log('script loaded');
              initPageScripts(url);

            });
      } 
      else {
        initPageScripts(url);
      }

      AnimateHolderPage(holder, 0);
    });



}

function initPageScripts(el) {

  DisplayLoader(false);


  switch (el) {
    case 'video':
      initVideoPage();
      break;
    case 'songs':
      initSongPage();
      break;
    case 'phonics':
      initPhonicsPage();
      break;
    case 'reading':
      initReadingPage();
      break;
    case 'stories':
      initStoryPage();
      break;
  }


}




function AnimateHolderPage(holder, el) {

  anime({
    targets: document.querySelector(`#${holder}`)
    , left: el + '%'
    , duration: 800
    , easing: 'easeInOutQuint'
  })
}


function InjectScript(url) {



  var script = document.createElement("script");

  script.src = `js/${url}.js`;
  script.setAttribute('id', url);
  document.head.appendChild(script);

}

function DisplayLoader(bool) {

  if (bool)
    loader.style.display = 'flex';

  else loader.style.display = 'none';
}
