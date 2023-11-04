
var block =`

     <span>Loading</span>
     <div class="loaderWrapper">
         <div class="circle"></div>
         <div class="circle"></div>
         <div class="circle"></div>
         <div class="shadow"></div>
         <div class="shadow"></div>
         <div class="shadow"></div>
     </div>

`;

function AddReader(){
var div = document.createElement('div');
div.id = 'loaderPage';
div.innerHTML = block;


document.body.appendChild(div);
}
AddReader();

