addEventListener("DOMContentLoaded",pageLoad);

function pageLoad(){
const btn = document.createElement("button");
document.body.appendChild(btn);
btn.textContent = "screen size";

    btn.addEventListener("click",()=>{
        alert(`width:${window.screen.width},height:${window.screen.height};\ninnerWidth:${window.innerWidth},innerHeight:${window.innerHeight};`)
    })
}