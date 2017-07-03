function pixel1825() {
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var color = document.getElementById('color').value;
    var fingerprint = document.getElementById('fingerprint').value;
    var x_double = x+2;

    var array = {
        'x': x,
        'y': y,
        'color' : color,
        fingerprint : fingerprint,
        'token' : null

    };
    var json = JSON.stringify(array);

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