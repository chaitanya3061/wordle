 import {ex} from "./word.js";
var noofgusses=6; //height
var widthletter=5;//width
var row=0;//row row
var col=0; //tile
var gameover=false;

  
 var wordle=ex.toUpperCase();
 console.log(wordle);
var guesslist=[
    ["  ","   ","  ","  ","  "],
    ["  ","   ","  ","  ","  "],
    ["  ","   ","  ","  ","  "],
    ["  ","   ","  ","  ","  "],
    ["  ","   ","  ","  ","  "],
    ["  ","   ","  ","  ","  "],
]

window.onload=function(){
    intialisse();

}
function intialisse(){
    for(let r=0;r<noofgusses;r++){
        for(let c=0;c<widthletter;c++){
            var title=document.createElement("span");
            title.setAttribute('id','gr'+r+'-tile-'+c)
            title.classList.add("tile");
            // document.getElementById("gr"+r+"-tile-"+c).innerHTML=" ";
            document.getElementById("board").appendChild(title);
        }
    }
    let keyboard=[
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Enter","Z","X","C","V","B","N","M","⌫"],
    ]
 for(var i=0;i<keyboard.length;i++){

    let currrow=keyboard[i];
    let keyboardrow=document.createElement("div");
    keyboardrow.classList.add("keyboard-row");
    for(var j=0;j<keyboard[i].length;j++){
        let keytile=document.createElement("div");
        let key=currrow[j];
        keytile.innerText=key;
        if(key=="Enter"){
            keytile.id="Enter";
        }
        else if(key=="⌫"){
            keytile.id="Backspace";
        }
        else if("A"<=key && key<="Z"){
            keytile.id=key
        }
        keytile.addEventListener("click",processkey);
        if(key=="Enter"){
        keytile.classList.add("enter-key-tile");
        }
        else{
            keytile.classList.add("key-tile");

        }
        keyboardrow.appendChild(keytile);

    }
    document.body.appendChild(keyboardrow);
 }
 document.addEventListener("keyup",(e)=>{
    processkey(e);


 })
}
function processkey(e){
    if (!gameover) {
    e= this.id;
    // processinput(e);
    if(e=="Backspace"){
        deletele(e);
       
        return ;
    }
    if(e=="Enter"){
        check();
        return;
    }
    
    add(e);
}

}
function add(element){
    if (col < 5 && row < 6) {
        const tile = document.getElementById("gr"+row+"-tile-"+col);
        tile.innerHTML=element;
        guesslist[row][col] =element;
        col++
    }
}

function deletele(e){
    if (col> 0) {
        col--
        const tile = document.getElementById("gr"+row+"-tile-"+col)
        tile.innerHTML = ''
        guesslist[row][col] = '';
    }

}
function check(){
    const guess=guesslist[row].join(''); //join the all letters
    if(col>4){
    flipTile(guess);
     if(wordle==guess){
        showmessage('Magnificent');
       
        gameover=true;

        return;
     }else{
        if(row>=5){
            gameover=false;
            showmessage('Game over');
       
            return ;
        }
        if(row<5){
            row++;
            col=0;
        }
     }
    }
}
function showmessage(ele){
        const message1=document.getElementById("title");
        message1.innerHTML=ele;
}
function flipTile(guess){
        for(let i=0;i<guess.length;i++){
            if(guess[i]==wordle[i]){
                let style=document.getElementById("gr"+row+"-tile-"+i).classList.add('green-overlay');
                
            }else if(wordle.includes(guess[i])){
                let style=document.getElementById("gr"+row+"-tile-"+i).classList.add('yellow-overlay');
               
            }else{
                let style=document.getElementById("gr"+row+"-tile-"+i).classList.add('grey-overlay');
            
            }
        }
    }
