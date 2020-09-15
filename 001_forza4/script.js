"use strict";
let buttons=[];
let rows=6;
let columns=7;
let buttonHeight=60;
let buttonWidth=60;
let borderRadius=50;
let player1="yellow";
let player2="red";
let wait=false;
let turn;
let bottone;
window.onload = function ()
{
    turn=player1;
    bottone=document.getElementById("bottone");
    setButton(bottone,turn);

    let contenitore=document.getElementById("contenitore");
    let widthCont=columns*buttonWidth;
    let heightCont=rows*buttonHeight;
    let style="background-color:black;width:"+widthCont+"px;height:"+heightCont+"px;padding:5px;";
    contenitore.style=style;
    console.log(contenitore.style);
     for(let i=0;i<rows;i++)
     {
         buttons[i]= new Array(columns);
         for(let j=0;j<columns;j++)
         {
            let button=document.createElement("input");
            button.id=i+"-"+j;
            button.className="none";
            button.type="button";
            button.value="";
            setButton(button,"gray");
            button.setAttribute("onclick","buttonClicked(this);");
            contenitore.appendChild(button);
            buttons[i][j]=button;
         }
         let br=document.createElement("br");
         contenitore.appendChild(br);
     }
}
function buttonClicked(button)
{
    if(!wait)
    {
        wait=true;
        let positionY=parseInt(button.id.toString().split('-')[0]);
        let positionX=parseInt(button.id.toString().split('-')[1]);
        if(buttons[0][positionX].className=="none")
        {

            setButton(buttons[0][positionX],turn);
            let i=0;
            //let aspetta=400;
            //let inizio=new Date();
            while(i!=(rows-1)&&buttons[i+1][positionX].className=="none") {
                //let adesso=new Date();
                //if((adesso.getTime()-aspetta)>=inizio.getTime())
                //{
                setButton(buttons[i][positionX], "gray");
                setButton(buttons[i + 1][positionX], turn);
                // alert("scende");

                i++;
                //inizio=new Date();

                //}
            }
            buttons[i][positionX].className=turn;

            checkVictory(buttons[i][positionX],positionX,i);

            if(turn==player1)
                turn=player2;
            else
                turn=player1;
            setButton(bottone,turn);

        }
        else {
            alert("colonna piena");
        }
        wait=false;
    }else{
        alert("aspetta");
    }
}
function setButton(button,backGroundColor)
{
    if(backGroundColor!="gray")
        button.style="width:"+buttonWidth+"px;height:"+buttonHeight+"px;background-color:"+backGroundColor+";"+"border-radius:"+borderRadius+"px;";
    else
        button.style="width:"+buttonWidth+"px;height:"+buttonHeight+"px;background-color:rgb(127,127,127);"+"border-radius:"+borderRadius+"%;";
}
function checkVictory(button,positionX,positionY) {
    let right=0;
    let left=0;
    let up=0;
    let down=0;


    for(let i=1;i<=4;i++)
    {

        if((positionX-i)>=0&&buttons[positionY][positionX-i].className==turn){
            left++;
        }
        if((positionX+i)<columns&&buttons[positionY][positionX+i].className==turn){
            right++;
        }
        if((positionY-i)>=0&&buttons[positionY-i][positionX].className==turn){
            up++;
        }

        if((positionY+i)<rows&&buttons[positionY+i][positionX].className==turn){
            down++;
        }

    }
    if((up+down)==3||(left+right)==3){
        alert("ha vinto il giocatore "+turn);
        for(let i=0;i<rows;i++)
        {
            for(let j=0;j<columns;j++)
            {
               buttons[i][j].disabled=true;
            }

        }
    }
}

