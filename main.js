

var gfx = Graphics();

var mousePos = {x:0, y:0};
var keys = {};
var buttons = {};
var e;
var guiY = 0;
var camx = 0;
var camy = 0;

function MouseOverToolbar(){
    return RectContains( {x:0, y:0, w:150, h:gfx.GetCanvasHeight()}, mousePos);
}

function MainModeGUI(){
    gfx.DrawRect(0, 0, 150, gfx.GetCanvasHeight(), [0.1,0.1,0.1,1])
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
    gfx.Clear();
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
var paint = Paint();
var modes = [editor, play, paint];
var mode = editor;
Draw();