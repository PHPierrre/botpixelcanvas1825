function pixel1825() {
    this.x = document.getElementById('x').value;
    this.y = document.getElementById('y').value;
    this.color = document.getElementById('color').value;
    this.fingerprint = document.getElementById('fingerprint').value;

    var json = coords();

    sendAjax(json);

    setInterval(wait, 60000);
}

function coords() {
    var coords = {
        'x': this.x,
        'y': this.y,
        'color' : this.color,
        'fingerprint' : this.fingerprint,
        'token' : null

    };
    console.log(coords);
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

function wait() {
    var x = (parseInt(this.x)+2);
    var json  = coords(x, this.y, this.color, this.fingerprint);
    sendAjax(json);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('but').addEventListener('click', pixel1825);
});
