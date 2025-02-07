function RectContains(rect, point){
    return point.x > rect.x && point.x < rect.x+rect.w && point.y > rect.y && point.y<rect.y+rect.h;
}

function Button(text){
    var rect = {x:0, y:guiY, w:150, h:20};
    guiY += 25;
    var contains = RectContains(rect, mousePos);
    if(contains && e.type == 'mousedown' && e.button == 0){
        return true;
    }
    if(e.type == 'draw'){
        var mousedown = buttons[0];
        ctx.fillStyle =  contains ? (mousedown ? 'lime': 'magenta') : 'blue';
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        ctx.fillText(text, rect.x+10, rect.y+18);
    }
    return false;
}

function SelectableButton(text, selected){
    var rect = {x:0, y:guiY, w:150, h:20};
    guiY += 25;
    var contains = RectContains(rect, mousePos);
    if(contains && e.type == 'mousedown' && e.button == 0){
        return true;
    }
    if(e.type == 'draw'){
        ctx.fillStyle = 'blue';
        if(contains){
            ctx.fillStyle = 'magenta';
        }
        if(selected){
            ctx.fillStyle = 'lime';
        }
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        ctx.fillText(text, rect.x+10, rect.y+18);
    }
    return false;
}