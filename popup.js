function pixel1825() {
    this.x = document.getElementById('x').value;
    this.y = document.getElementById('y').value;
    this.color = document.getElementById('color').value;
    this.fingerprint = document.getElementById('fingerprint').value;

    var j = this;
    var json = coords(j);

    var arrayX1 = [];
    var x = this.x;
    for(var i = 0; i < 40; i++){
        arrayX1.push(parseInt(x)+2);
        x = parseInt(x)+2;
    }

    for(var i = 0; i < 40; i++){

        //Get json response
        var timeleft = '';

        setInterval(wait, timeleft);
    }
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
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "5c6dc267-2d0a-9de8-6d93-069f42e789f8");

    xhr.send(json);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('but').addEventListener('click', pixel1825);
});
