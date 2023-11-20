

const loader = document.querySelector('#loader');
const pageHolder = document.querySelector('#pageHolder');
var currentHolderPageTitle='';

function loadPage(holder,url){
pageHolder.innerHTML='';
pageHolder.innerText='';
document.querySelector('#loader').style.display='flex';
		
currentHolderPageTitle = url;
	fetch(`./${url}.html`)
	.then(res=>res.text())
	.then(data=>{

	pageHolder.innerHTML=data;

	var scriptText= data.substring(data.indexOf("<script src="));

	scriptText = scriptText.substring(0,scriptText.indexOf("</script>") );
	scriptText = scriptText.substring(scriptText.indexOf('/')+1);
	scriptText = scriptText.substring(0,scriptText.indexOf('.'));
	

	if((document.querySelector(`#${scriptText}`) == null))
	InjectScript(scriptText);


	
	AnimateHolderPage(holder,0);
	initPageScripts(url);
	});



}

function initPageScripts(el){

	DisplayLoader(true);
	setTimeout(()=>{
	switch(el){
	case'video': initVideoPage();break;
	case'songs':initSongPage();break;
	case'phonics':initPhonicsPage();break;
	case'reading':initReadingPage();break;
	case'stories':initStoryPage();break;
	}
},100)
	
}




function AnimateHolderPage(holder, el){

	anime({
		targets:document.querySelector(`#${holder}`),
		left:el+'%',
		duration:800,
		easing:'easeInOutQuint'
	})
}


function InjectScript(url){
	

		
   var script = document.createElement("script");

  script.src = `js/${url}.js`;
  script.setAttribute('id', url);
  document.head.appendChild(script);

}

function DisplayLoader(bool){

if(bool)
	loader.style.display='flex';

else loader.style.display='none';
}