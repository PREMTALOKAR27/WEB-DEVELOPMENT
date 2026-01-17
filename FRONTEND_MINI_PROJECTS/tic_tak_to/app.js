let boxes=document.querySelectorAll(".box");
let reset_btn=document.querySelector(".reset_btn");
let turnO=true;// playerO and playerX
let message=document.querySelector(".message");
let new_game=document.querySelector("#new_game");




const winPatter=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
            if(turnO){
                
                box.innerText="O";
                 box.classList.add("o-color");
                console.log("O");
                turnO=false;
            }
            else{
                
                box.innerText="X";
                 box.classList.add("x-color");
                console.log("X");
                turnO=true;
            }

            box.disabled=true;

            let isWin=checkWin();
            if(isWin != -1){
                boxes.forEach((b)=>b.disabled=true);
               showMessage(isWin);
            }
        }
    );

});

function showMessage(winner){
    message.innerText=winner+" is the winner";
    message.classList.remove("hide");
    new_game.classList.remove("hide");
};

function checkWin(){
    for(win of winPatter){
        let box1=boxes[win[0]].innerText;
        let box2=boxes[win[1]].innerText;
        let box3=boxes[win[2]].innerText;

        if(box1!="" && box2!="" && box3!=""){
            if(box1=== box2 && box2===box3){
                return box1;
            } 
        }
        }
        return -1;
};



function reset_game(){
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
        box.classList.remove("x-color", "o-color");
       
    });
     message.classList.add("hide");
    new_game.classList.add("hide");
};

reset_btn.addEventListener('click',reset_game);
new_game.addEventListener('click',reset_game);