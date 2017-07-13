/*
 Dev par PHPierre - https://www.phpierre.fr
 Pour le 18-25
 */
var j, maxX, maxY, json, x, y, time, html;
console.log('[Serena] Initiallisation ...');
html = '<div style="position: absolute; right: 1em; top: 7em;"><div class="serena" style="background-color: rgba(0, 0, 0, 0.75); color: rgb(250, 250, 250); text-align: center; vertical-align: text-bottom; cursor: pointer; line-height: 42px; width:70px; height: 42px; border-radius: 21px; padding: 0px;"><img height="24" style="vertical-align:middle;margin-top:-2px" src="https://abs.twimg.com/emoji/v2/72x72/1f1eb-1f1f7.png"> </div></div>';
$('#app>div').append(html);

$( document ).ready(function() {
    $('body').append('<div class="serena-modal"></div>');
    var modal = '<div class="ReactModalPortal"><div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open" style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75); z-index: 2;"><div class="ReactModal__Content ReactModal__Content--after-open" tabindex="-1" aria-label="Bienvenu sur Serena Modal" style="position: absolute; top: 50%; left: 50%; right: auto; bottom: auto;width: 50%; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px 40px; margin-right: -50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; max-width: 500px; transition: 0.5s;"><h2>Bienvenu sur le bot Serena ! <img height="24" src="https://abs.twimg.com/emoji/v2/72x72/2764.png" /> Toby </h2><div class="serena-close" style="position: fixed; display: flex; justify-content: center; align-items: center; flex: 0 0 36px; border-width: 2px; border-style: solid; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; background-color: rgb(246, 246, 247); border-color: rgb(220, 221, 222); top: 30px; right: 40px;"><svg  class="serena-close" fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m31.6 10.7l-9.3 9.3 9.3 9.3-2.3 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"></path></g></svg></div><p style="text-align: center;"><p style="color: rgba(114, 118, 126, 0.6); font-size: 14px; font-weight: 500; position: relative; text-align: inherit; float: none; margin: 0px; padding: 0px; line-height: normal;"><!-- react-text: 10 -->Bot Pixelcanvas du 18-25<br /><br />' +
        '<div class="group"> <label for="x">Position x de d&eacute;part :</label> <input id="x" type="text" name="x" style="float: right" placeholder="x" value="0" /> </div> <div class="group"> <label for="y">Position y de d&eacute;part :</label> <input id="y" type="text" name="y" style="float: right" placeholder="y" value="-200" /> </div> <div class="group"> <label for="color">ID Couleur <a target="_blank" href="https://github.com/PHPierrre/botpixelcanvas1825/wiki/Couleurs">help ? </a> : </label> <input id="color" type="text" name="" placeholder="id color" style="float: right" value="3" /> </div> <div class="group"> <label for="fingerprint">Fingerprint (ne pas toucher) : </label> <input id="fingerprint" type="text" name="fingerprint" style="float: right" placeholder="..." value="801b194e224cd0f4c09821401fdadcd9" /> </div> <div class="group"> <label for="maxX">Nombre de case vers la droite : </label> <input id="maxX" type="text" name="maxX" style="float: right" placeholder="taille" value="20" /> </div> <div class="group"> <label for="maxY">Nombre de case vers le bas : </label> <input id="maxY" type="text" name="maxY" style="float: right" placeholder="taille" value="20" /> </div> <div class="group"> <div id="but" style="margin-top: 15px;padding: 8px;background-color: rgba(155, 89, 182,1.0);color: #fff;font-weight: bold;text-align: center;" class="but">GO !</div> </div> <div class="notdisplay" id="time"></div><p><span style="font-size: 12px">Bot <img height="16" style="vertical-align:middle;margin-top:-2px" src="https://abs.twimg.com/emoji/v2/72x72/1f1eb-1f1f7.png"> développé par PHPierre & Bisti</span><br /><span style="font-size: 8px">Remerciement to Horsefucker to develop Brazilian and Mlp bot</span></p></div></div></div>';
    $('.serena').click(function () {
        $('.serena-modal').append(modal);
    });
    $('body').on( "click", ".serena-close", function() {
        $('.serena-modal').empty();
    });
});

function pixel1825() {
    this.x = document.getElementById('x').value;
    this.y = document.getElementById('y').value;
    this.color = document.getElementById('color').value;
    this.fingerprint = document.getElementById('fingerprint').value;
    maxX = document.getElementById('maxX').value;
    maxY = document.getElementById('maxY').value;

    j = this;
    json = coords(j);

    var arrayX1 = [];
    x = this.x;
    y = this.y;
    for(var i = 0; i < maxX; i++){
        arrayX1.push(parseInt(x));
        x = parseInt(x)+1;
    }
    x = this.x;

    sendAjax(json);

    setTimeout(function () {
        time = document.getElementById('time').innerHTML;
        time = time.replace('{"success":true,"waitSeconds":', '');
        time = time.replace('}', '');
        time = Math.ceil(time)*1000;
        time = parseInt(time-5000);
        loopup();
    }, 5000);
}

function coords(j) {
    var coords = {
        'x': j.x,
        'y': j.y,
        'z': (parseInt(j.x) + parseInt(j.y)),
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
            document.getElementById('time').innerHTML = this.responseText;
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://pixelcanvas.io/api/pixel");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(json);
    return true;
}

function loopup() {
    alert('send');
    console.log(time);
    setTimeout(loop, time);
}

function loop() {
    /*json = coords(j);
    sendAjax(json);
    if(j.x >= maxX){
        j.y++;
    }else{
        j.x++;
    }*/

    loopup();

    /*if(j.y <= maxY){
        if(j.x >= maxX){
            j.y++;
            j.x = x;
            json = coords(j);
            console.log('Y++ :', 'x :', x, j.y, maxY);
        } else if(j.x <= maxX && j.y <= maxY){
            j.x++;

        }else{
            console.log('STOP :', j.x, maxX, j.y, maxY);
            clearInterval(refreshIntervalId);
        }
        if(j.y <= maxY){
            console.log(json);
        }

    }else{
        console.log('STOP :', j.x, maxX, j.y, maxY);
        clearInterval(refreshIntervalId);
    }*/
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('but').addEventListener('click', pixel1825);
});
