let gameSeq=[];
let userSeq=[];
let btns=["red","purple","green","yellow"];
let h2=document.querySelector("h2");

let start=false;
let level=0;
let highscore=0;

document.addEventListener("keypress",function(){
    if(start==false){
        console.log("started");
        start=true;

        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
};

function levelup(){
    userSeq=[];
    level++;
    h2.innerText="level "+level;

    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnflash(randomBtn);

}

function checkans(idx){

if(userSeq[idx]===gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
        setTimeout(levelup,1000);
    }
}
else{
    if(level>highscore){
        highscore=level;
    }
   h2.innerHTML = `Game Over! Your score was <b>${level} </b> <br> Press any key to start. Your Highscore was <b>${highscore}`;

    document.querySelector('body').style.backgroundColor="red";
    setTimeout(function(){document.querySelector('body').style.backgroundColor="white";},50);
    reset();
}
};

function btnpress(){
    let btn=this;
    btnflash(btn);

    usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);

    checkans(userSeq.length-1);
}

let allbtn=document.querySelectorAll(".btn");
for(b of allbtn){
    b.addEventListener("click",btnpress);
}


function reset(){
start=false;
gameSeq=[];
userSeq=[];
level=0;
};
