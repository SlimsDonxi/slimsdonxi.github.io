function CloseReader(el){


console.log(el);
if(el == undefined) {window.location.href('index.html'); 

return;
}


else{
 document.getElementById(el).style.display = "none";
 if(synth != null) synth.cancel();
if(currentText != null) currentText =0;
   }
 }