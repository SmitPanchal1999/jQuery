let totalImages=5;
$(document).ready(function(){
    slider();
});
let count=1;
let prev=0;
let timerid;
function slider(){
    
    if (prev!=0){
        $(`#i${prev}`).hide();
        
        $(`#c${prev}`).removeClass("white");
    }
    $(`#i${count}`).show();
    $(`#c${count}`).addClass("white");

    prev=count
    count+=1;
    
   timerid= setInterval(function(){
       console.log("in",typeof `${count}`,prev);

        if (count==totalImages+1){
            count=1
        }
        if (prev!=0){

            $(`#i${prev}`).hide();
            $(`#c${prev}`).removeClass("white");
            $(`#i${count}`).show();
            $(`#c${count}`).addClass("white");
        }
        else{
            $(`#i${count}`).show();
            
            $(`#c${count}`).addClass("white");
          
        }
        
        prev=count;
        count+=1;
        
    },3000);    
}
function showThisImage(ID){
    clearTimeout(timerid);

    count=Number(String(ID).slice(1));
   slider();
    
}
function previous(){
    
    clearTimeout(timerid);
    count-=2;
    if (count<=0){
        count=totalImages;
    }
    console.log("previos"+count);
    slider();
}
function next(){
    
    clearTimeout(timerid);
    
    if (count>=totalImages+1){
        count=1
    }
    console.log("next"+count);
    slider();
}

document.addEventListener('keyup', (e) => {
    console.log("key pressed");
    //left 
    if (e.code =="ArrowLeft") {
        previous();
        console.log("key button previous");
    }
    //right
    else if (e.code=="ArrowRight"){
        
       next();
        console.log("key button next");
    }
  
    
});
let oldx;
let oldy;
document.getElementById("carousel").addEventListener("mousedown",function(b){
    b.preventDefault();
    oldx=b.pageX;
    oldy=b.pageY;
    console.log("mousedown",oldx,oldy);
   
    
})

document.getElementById("carousel").addEventListener("mouseup",function(e){
    e.preventDefault();
      console.log("up")
      console.log(oldx,oldy,e.pageX,e.pageY);
      if ((e.pageX > (oldx+60) && (e.pageY<=oldy+20 || e.pageY>=oldy-20) ) ) {
          
          previous();
          console.log("mouse move right");
      }
      else if ((e.pageX < (oldx-60) && (e.pageY<=oldy+20 || e.pageY>=oldy-20) ) )  {
         
          console.log("mouse move left");
          next();
      }
      


  })