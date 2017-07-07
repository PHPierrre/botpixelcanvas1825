/*
 Dev par PHPierre - https://www.phpierre.fr
 Pour le 18-25
 */
function pixel1825() {
    this.x = document.getElementById('x').value;
    this.y = document.getElementById('y').value;
    this.color = document.getElementById('color').value;
    this.fingerprint = document.getElementById('fingerprint').value;
    var maxX = document.getElementById('maxX').value;
    var maxY = document.getElementById('maxY').value;
    var sec = parseInt(parseInt(document.getElementById('sec').value)*1000);

    /*var conn = new WebSocket('ws://165.227.139.20:8080/?fingerprint=801b194e224cd0f4c09821401fdadcd9');
    conn.onopen = function () {

        conn.onmessage = function(event) {
            console.log(event);
        };

    }*/

    var j = this;
    var json = coords(j);

    var arrayX1 = [];
    var x = this.x;
    var y = this.y;
    for(var i = 0; i < maxX; i++){
        arrayX1.push(parseInt(x));
        x = parseInt(x)+1;
    }
    x = this.x;

    sendAjax(json);

    setTimeout(function(){
        var time = document.getElementById('time').innerHTML;
        time = time.replace('{"success":true,"waitSeconds":', '');
        time = time.replace('}', '');
        time = Math.ceil(time)*1000;
        time = parseInt(time);
    }, 2000);


    console.log(json);

    var refreshIntervalId = setInterval(function(){
        console.log(j.y, maxY);
        if(j.y <= maxY){
            if(j.x >= maxX){
                j.y++;
                j.x = x;
                json = coords(j);
                console.log('Y++ :', 'x :', x, j.y, maxY);
            } else if(j.x <= maxX && j.y <= maxY){
                j.x++;
                json = coords(j);

            }else{
                console.log('STOP :', j.x, maxX, j.y, maxY);
                clearInterval(refreshIntervalId);
            }
            if(j.y <= maxY){
                console.log(json);
                sendAjax(json);
            }

        }else{
            console.log('STOP :', j.x, maxX, j.y, maxY);
            clearInterval(refreshIntervalId);
        }
    }, sec);

}

function coords(j) {
    var coords = {
        'x': j.x,
        'y': j.y,
        'color' : j.color,
        'fingerprint' : j.fingerprint,
        'token' : null

    };

    return JSON.stringify(coords);
}

function sendAjax(json) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    var aaa;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            document.getElementById('time').innerHTML = this.responseText;
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://pixelcanvas.io/api/pixel");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(json);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('but').addEventListener('click', pixel1825);
});
