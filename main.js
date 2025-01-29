
function CreateCanvas(){
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    document.body.style.margin = '0px';
    document.body.style.overflow = 'hidden';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    addEventListener('resize', ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    return canvas.getContext('2d');
}

var ctx = CreateCanvas();
var layers = [];
var keys = {};
var used = false;
var camx = 0;
var camy = 0;

function CallEvent(name, value){
    used = false;
    for(var i=layers.length-1;i>=0;i--){
        var l = layers[i];
        if(l[name]){
            l[name](value);
        }
        if(used){
            return;
        }
    }
}

function KeyDown(e){
    keys[e.key] = true;
    CallEvent('KeyDown', e);
}

function KeyUp(e){
    keys[e.key] = false;
    CallEvent('KeyUp', e);
}

function MouseDown(e){
    CallEvent('MouseDown', e);
}

function MouseMove(e){
    CallEvent('MouseMove', e);
}

function MouseUp(e){
    CallEvent('MouseUp', e);
}

function Draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    used = false;
    for(var l of layers){
        if(l.Draw){
            l.Draw();
        }
    }
    requestAnimationFrame(Draw);
}

addEventListener('keydown', KeyDown);
addEventListener('keyup', KeyUp);
addEventListener('mousedown', MouseDown);
addEventListener('mousemove', MouseMove);
addEventListener('mouseup', MouseUp);
Draw();