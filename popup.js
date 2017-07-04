function pixel1825() {
    this.x = document.getElementById('x').value;
    this.y = document.getElementById('y').value;
    this.color = document.getElementById('color').value;
    this.fingerprint = document.getElementById('fingerprint').value;

    /*var conn = new WebSocket('ws://46.101.98.128:8080');
    conn.onopen = function () {
        alert('open');
        conn.send('{"op":"unconfirmed_sub"}');
    }
    conn.onclose = function () {
        alert('close');
    }
    conn.onerror = function (error) {
        alert('websocket error: ' + error);
    }
    conn.onmessage = function (e) {
        alert(e);
    }*/

    var j = this;
    var json = coords(j);

    var arrayX1 = [];
    var x = this.x;
    var y = this.y;
    for(var i = 0; i < 20; i++){
        arrayX1.push(parseInt(x));
        x = parseInt(x)+1;
    }

    /*for(var i = 0; i < 20; i++){

        for(var k = 0; k < 20; k++){
            console.log('x: '+arrayX1[i]+' | y :'+y);
            y = parseInt(y)+1;
        }

        y = this.y;
    }*/
    sendAjax(json);
    console.log(json);

    setInterval(function(){
        j.x = parseInt(j.x)+1;
        var json = coords(j);

        console.log(json);
        sendAjax(json);
    }, 40000);
        
        //j = this;
        //Get json response
        //Url is http://pixelcanvas.io/api/ ??
        /*
            Bool 0 or 1 for first query and at first query, get the timeleft in the json response
         */

        //var timeleft = '';

        //setInterval(sendAjax, timeleft);

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

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://pixelcanvas.io/api/pixel");
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.setRequestHeader("postman-token", "5c6dc267-2d0a-9de8-6d93-069f42e789f8");

    xhr.send(json);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('but').addEventListener('click', pixel1825);
});
