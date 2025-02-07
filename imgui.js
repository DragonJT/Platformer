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