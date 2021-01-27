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
    console.log("previous");
    clearTimeout(timerid);
    count-=2;
    if (count<=0){
        count=totalImages;
    }
    console.log(count);
    slider();
}
function next(){
    console.log("next");
    clearTimeout(timerid);
    
    if (count>=totalImages+1){
        count=1
    }
    console.log(count);
    slider();
}

document.addEventListener('keyup', (e) => {
    console.log("key pressed");
    //left 
    if (e.code =="ArrowLeft") {
        previous();
        console.log("previous");
    }
    //right
    else if (e.code=="ArrowRight"){
        
       next();
        console.log("next");
    }
  
    
});

