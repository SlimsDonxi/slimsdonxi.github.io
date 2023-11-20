var videoHolder;
var root;



function initVideoPage(){


Array.from(document.querySelectorAll('.videoBlock')).forEach(x=>{
  x.onpointerup=function(){
    var text= x.querySelector('b').innerText;
    initVideos(text);
  }
 })

}


function initVideos(el){
	loader.style.display ='block';
	root =`videos/videos/${el}/`;

fetch(`videos/${el}.html`)
.then(res=>res.text())
.then(data=>{

  videoHolder = document.querySelector('#videoHolder');

  videoHolder.innerHTML=data;
  	loader.style.display ='none';
  	anime({
  		targets:videoHolder,
  		 left:'0%',
     duration:800,
     ease:'easeOutQuint'
  	})
    
initVideoLoader();

});
}

