
const wsUrl = "wss://echo-ws-service.herokuapp.com";

document.addEventListener('DOMContentLoaded', () => {
    const btnSend = document.querySelector('#send');
    const btnGeo = document.querySelector('#geo');
    const output =document.querySelector('.output-massege');
    const massege = document.querySelector('.echo-text');
    let websocket = new WebSocket(wsUrl);
    websocket.onopen = function() {
        console.log("WS CONNECTED");
    };
    function sendMessage(inner, who) {
        output.innerHTML += `
            <div class="${who}"><span>${inner}</span></div>
            `;
    }
    websocket.onmessage = function(evt) {
            sendMessage(evt.data, 'server');
            ;}
            
    btnSend.addEventListener('click', () => {
        sendMessage(massege.value, 'client')
        websocket.send(massege.value);
        massege.value = '';
    })

    btnGeo.addEventListener('click', () => {
        if (!navigator.geolocation) {
            attantion = 'Geolocation не поддерживается вашим браузером';
            sendMessage(attantion, 'client')
        } 
        else {
            navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            console.log(coords.latitude, coords.longitude);
            const href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            link = `<a href="${href}" class="href" target="_blank">Геолокация</a>`
            sendMessage(link, 'client');
            });
        } 
    })
})
