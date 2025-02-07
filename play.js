
function GetObjRect(obj){
    return {x:obj.x - obj.rx, y:obj.y - obj.ry, w:obj.rx*2, h:obj.ry*2};
}

function Play(){
    var objects = undefined;
    var snakeTime = 0;
    const gravity = 0.3;

    function Start(){
        snakeTime = 0;
        objects = spawns.GetObjects();
    }

    function rectsColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y
        );
    }

    function GetSnakeRect(obj){
        return {x:obj.x - obj.rx, y:obj.y - obj.height, w:obj.rx*2, h:obj.height};
    }

    function TryMove(obj){
        for(var snake of objects.filter(o=>o.type == 'Snake')){
            if(rectsColliding(GetObjRect(obj), GetSnakeRect(snake))){
                obj.dead = true;
            }
        }
    }

    function DrawObj(obj){
        if(obj.type == 'Player'){
            camx = obj.x - gfx.GetCanvasWidth()/2;
            camy = obj.y - gfx.GetCanvasHeight()/2;
            obj.velocityY += gravity;
            obj.velocityX = 0;
            if(keys.ArrowLeft){
                obj.velocityX -= obj.speed;
            }
            if(keys.ArrowRight){
                obj.velocityX += obj.speed;
            }
            if(keys.ArrowUp && obj.grounded){
                obj.velocityY -= obj.jump;
            }
            obj.grounded = false;
            obj.y += obj.velocityY;
            TryMove(obj);
            tilemap.TryMoveY(obj);
            obj.x += obj.velocityX;
            TryMove(obj);
            tilemap.TryMoveX(obj);
            gfx.DrawTexture(obj.x - obj.rx - camx, obj.y - obj.ry - camy, obj.rx*2, obj.ry*2, paint.GetPlayerTexture(), [1,1,1,1]);
        }
        else if(obj.type == 'Snake'){
            obj.height = (Math.sin(snakeTime + (obj.x + obj.y) * 0.025) + 1) / 2 * obj.maxHeight;
            gfx.DrawRect(obj.x - obj.rx - camx, obj.y - obj.height - camy, obj.rx*2, obj.height, [1,1,0,1]);
        }
    }

    function OnEvent(){
        if(e.type == 'draw'){
            for(var obj of objects){
                DrawObj(obj);
            }
            tilemap.Draw();
            snakeTime += 0.025;
            objects = objects.filter(o=>!o.dead);
        }
    }

    function End(){
        objects = undefined;
    }

    return {name:'play', OnEvent, Start, End}
}