let active;
let activeObj={
    "london":0,
    "paris":1,
    "tokyo":2,
}
$(function() {  
   // $( "#accordion" ).accordion();
   
  london();
  active="london";
});  

function london(){
    $("#londonH").css("color","green")
    $("#tokyoH").css("color","black")
    $("#parisH").css("color","black")
    $("#paris").hide();
    $("#tokyo").hide();
    $("#london").show();
    active="london";
    
}
function paris(){
    $("#paris").show();
    $("#tokyo").hide();
    $("#london").hide();
    
    $("#tokyoH").css("color","black")
    $("#londonH").css("color","black")
    $("#parisH").css("color","green")
    active="paris";
}
function tokyo(){
    $("#paris").hide();
    $("#tokyo").show();
    $("#london").hide();
    
    $("#londonH").css("color","black")
    $("#parisH").css("color","black")
    $("#tokyoH").css("color","green")
    active="tokyo";
}
let flag=0;
let smallFlag=0;
setInterval(function(){

    if (document.documentElement.clientWidth < 480) {
        $("#accordion").show();
            
        if (flag==0){
            let index=activeObj[active];
            console.log("hello"+index);
            $( "#accordion" ).accordion({
            "openedState": "active",
            "collapsible": true,
            "active": index, /** Integrat Dynamic open tab  */
            "multipleCollapsible": false,

        });
        flag=1;
        }
        else{
            $( "#accordion" ).accordion();
            
            
        }
        
        
        $("#navbarOne").hide();
        
    }
    else{
        let index;
        if (flag==1){
            index=$( "#accordion" ).accordion( "option", "active" );
            console.log(index);
            switch(index){
                case 0:{
                    london();
                    break;
                }
                case 1:{
                    paris();
                    break;
                }
                case 2:{
                    tokyo();
                    break;
                }
            }
            flag=0
        }
        else{

        }
       
        $("#accordion").hide()
        $("#navbarOne").show();
        
    }
    
},100);
