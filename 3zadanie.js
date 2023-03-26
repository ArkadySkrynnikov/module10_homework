const echoUrl =  "wss://echo-ws-service.herokuapp.com";

function pageLoad(){
    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const geoBtn = document.querySelector(".btn_geo")

    let socket = new WebSocket(echoUrl);

    socket.onopen = () =>{
        infoOutput.innerHTML = "соеденение установлено"
    }

    socket.onmessage = (event) =>{
        writeToChat(event.data,true);
    }

    socket.onerror = () =>{
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }

    sendBtn.addEventListener("click",sendMessage);

    function sendMessage(){
        if(!input.value){
            return
        }
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }

    geoBtn.addEventListener("click",getLocation);

    function getLocation(){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(locationSuccess);
        } else {
            writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
        }
    }

    function locationSuccess(data) {
        let link = `https://www.openstreetmap.org/#map=19/${data.coords.latitude}/${data.coords.longtitude}`;
        writeToChat(`<a href="${link}" target="_blank">Гео-локация</a>`);
        console.log(data)
    }
}

document.addEventListener("DOMContentLoaded",pageLoad);

