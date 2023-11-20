var songsHolder;
var root;

function initSongPage()
{

  Array.from(document.querySelectorAll('.songBlock'))
    .forEach(x =>
    {
      x.onpointerup = function()
      {
        var text = x.querySelector('b')
          .innerText;
        initSongs(text);
      }
    })
  DisplayLoader(false);
}

function initSongs(el)
{
  DisplayLoader(true);
  root = `songs/videos/${el}/`;

  fetch(`songs/${el}.html`)
    .then(res => res.text())
    .then(data =>
    {
      songsHolder = document.querySelector('#songsHolder');

      songsHolder.innerHTML = data;
      loader.style.display = 'none';
      anime(
      {
        targets: songsHolder
        , left: '0%'
        , duration: 800
        , ease: 'easeOutQuint'
      })



      initVideoLoader();
      DisplayLoader(false);
    });
}
