
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
var mousePos = {x:0, y:0};
var keys = {};
var buttons = {};
var e;
var guiY = 0;
var camx = 0;
var camy = 0;
var toolbarRect = {x:0, y:0, w:150, h:ctx.canvas.width};

function MouseOverToolbar(){
    return RectContains(toolbarRect, mousePos);
}

function MainModeGUI(){
    ctx.fillStyle = 'rgb(20,20,20)';
    ctx.fillRect(toolbarRect.x, toolbarRect.y, toolbarRect.w, toolbarRect.h);
    guiY = 0;

    for(var m of modes){
        if(SelectableButton(m.name, m == mode)){
            if(mode.End){
                mode.End();
            }
            mode = m;
            if(mode.Start){
                mode.Start();
            }
        }
    }
}

function OnEvent(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    mode.OnEvent();
    MainModeGUI();
    if(mode.OnGUI){
        mode.OnGUI();
    }
}

function MouseDown(evt){
    e = evt;
    buttons[e.button] = true;
    OnEvent();
}

function MouseUp(evt){
    e = evt;
    buttons[e.button] = false;
    OnEvent();
}

function KeyDown(evt){
    e = evt;
    keys[e.key] = true;
    OnEvent();
}

function KeyUp(evt){
    e = evt;
    keys[e.key] = false;
    OnEvent();
}

function MouseMove(evt){
    e = evt;
    mousePos = {x:e.clientX, y:e.clientY};
    OnEvent();
}

function Draw(){
    e = {type:'draw'};
    OnEvent();
    requestAnimationFrame(Draw);
}

addEventListener('keydown', KeyDown);
addEventListener('keyup', KeyUp);
addEventListener('mousedown', MouseDown);
addEventListener('mouseup', MouseUp);
addEventListener('mousemove', MouseMove);

var tilemap = TileMap();
var spawns = Spawns();
var play = Play();
var editor = Editor();
var vectorgraphics = VectorGraphics();
var modes = [editor, play, vectorgraphics];
var mode = editor;
Draw();