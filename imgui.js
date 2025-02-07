function RectContains(rect, point){
    return point.x > rect.x && point.x < rect.x+rect.w && point.y > rect.y && point.y<rect.y+rect.h;
}

function Button(text){
    var rect = {x:0, y:guiY, w:150, h:25};
    guiY += 30;
    var contains = RectContains(rect, mousePos);
    if(contains && e.type == 'mousedown' && e.button == 0){
        return true;
    }
    if(e.type == 'draw'){
        var mousedown = buttons[0];
        var tint = contains ? (mousedown ? [0,1,0,1]: [1,0,1,1]) : [0,0,1,1];
        gfx.DrawRect(rect.x, rect.y, rect.w, rect.h, tint);
        gfx.DrawRectBorder(rect.x, rect.y, rect.w, rect.h, 2, [1,1,1,1]);
        gfx.DrawText(rect.x, rect.y, rect.w, rect.h, text, 18, [1,1,1,1]);
    }
    return false;
}

function SelectableButton(text, selected){
    var rect = {x:0, y:guiY, w:150, h:25};
    guiY += 30;
    var contains = RectContains(rect, mousePos);
    if(contains && e.type == 'mousedown' && e.button == 0){
        return true;
    }
    if(e.type == 'draw'){
        var tint = [0,0,1,1];
        if(contains){
            tint = [1,0,1,1];
        }
        if(selected){
            tint = [0,1,0,1];
        }
        gfx.DrawRect(rect.x, rect.y, rect.w, rect.h, tint);
        gfx.DrawRectBorder(rect.x, rect.y, rect.w, rect.h, 2, [1,1,1,1]);
        gfx.DrawText(rect.x, rect.y, rect.w, rect.h, text, 18, [1,1,1,1]);
    }
    return false;
}

function ColorButton(x, y, color, selected){
    var rect = {x, y, w:30, h:30};
    var contains = RectContains(rect, mousePos);
    if(contains && e.type == 'mousedown' && e.button == 0){
        return true;
    }
    if(e.type == 'draw'){
        gfx.DrawRect(rect.x, rect.y, rect.w, rect.h, color);
        var color = selected ? [1,0,1,1] : [1,1,1,1];
        gfx.DrawRectBorder(rect.x, rect.y, rect.w, rect.h, 2, color);
    }
    return false;
}

function ColorPallette(colors, color){
    var x = 0;
    for(var c of colors){
        if(ColorButton(x, guiY, c, color == c)){
            color = c;
        }
        x+=30;
        if(x>=150){
            x=0;
            guiY+=30;
        }
    }
    guiY += 30;
    return color;
}

function NewLine(){
    guiX = 0;
    guiY += 30;
}