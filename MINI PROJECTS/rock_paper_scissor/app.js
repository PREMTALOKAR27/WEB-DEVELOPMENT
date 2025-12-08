let user_score=0;
let comp_score=0;

const choices=document.querySelectorAll('.choise');
let message=document.getElementById("final-message");
let how=document.getElementById("how");

function getcomputerchoice(){
    const choices=['rock','paper','scissor'];
    const randomnumber=Math.floor(Math.random()*3);
    return choices[randomnumber];
};

function checkwinner(u_choise,c_choise){
    if(u_choise===c_choise){
        console.log("its a draw");
        message.innerHTML="its a draw";
    }
    else if((u_choise==='rock' && c_choise==='scissor') || (u_choise==='paper' && c_choise==='rock') || (u_choise==='scissor' && c_choise==='paper')){
        console.log("user wins");
        user_score++;
        let user_score_span=document.getElementById("user-score");
        user_score_span.innerHTML=user_score;
        message.innerHTML="user wins";
        how.innerHTML=u_choise+" beats "+c_choise;
        how.classList.remove("hide");
    }
    else{
        console.log("computer wins");
        comp_score++;
        let comp_score_span=document.getElementById("comp-score");
        comp_score_span.innerHTML=comp_score;
        message.innerHTML="computer wins<br>";
        how.innerHTML=c_choise+" beats "+u_choise;
        how.classList.remove("hide");
    }
};

choices.forEach(choice=>{
    choice.addEventListener('click',()=>{
        console.log(choice.id);
        let u_choise=choice.id;
        let c_choise=getcomputerchoice();
        console.log(c_choise);

        checkwinner(u_choise,c_choise);
    });
});


let resetbtn=document.getElementById("reset");
resetbtn.addEventListener('click',()=>{
    user_score=0;
    comp_score=0;
    let user_score_span=document.getElementById("user-score");
    user_score_span.innerHTML=user_score;
    let comp_score_span=document.getElementById("comp-score");
    comp_score_span.innerHTML=comp_score;
    message.innerHTML="Make your move";
});

