var videoHolder;
var root;



function initVideoPage()
{


  Array.from(document.querySelectorAll('.videoBlock'))
    .forEach(x =>
    {
      x.onpointerup = function()
      {
        var text = x.querySelector('b').innerText;

   
        initVideos(text);
      }
    })
  DisplayLoader(false);
}



function initVideos(el)
{
  loader.style.display = 'block';
  el= el.replace(/ /g,'%20');
  root = `../videos/videos/${el}/`;
  DisplayLoader(true);
  fetch(`../videos/${el}.html`)
    .then(res => res.text())
    .then(data =>
    {

      videoHolder = document.querySelector('#videoHolder');

      videoHolder.innerHTML = data;
     

      anime(
      {
        targets: videoHolder
        , left: '0%'
        , duration: 800
        , ease: 'easeOutQuint'
      })

      initVideoLoader();

      DisplayLoader(false);
    });
}
