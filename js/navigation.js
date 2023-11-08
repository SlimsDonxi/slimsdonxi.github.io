function CloseReader(el){


console.log(el);
if(el == undefined) {window.location.href('index.html'); 

return;
}


else{
 document.getElementById(el).style.display = "none";

  try{
 synth.cancel();
 } catch(e) {

 }
 try{
  currentText=0;
 } catch(e) {

 }

 }
}