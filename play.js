const gravity = 0.3;
var play = false;

function rectsColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}

class Play{

    constructor(){
        this.objects = [];
        this.snakeTime = 0;
    }

    static GetObjRect(obj){
        return {x:obj.x - obj.rx, y:obj.y - obj.ry, w:obj.rx*2, h:obj.ry*2};
    }

    static GetSnakeRect(obj){
        return {x:obj.x - obj.rx, y:obj.y - obj.height, w:obj.rx*2, h:obj.height};
    }

    Spawn(obj){
        this.objects.push(obj);
    }

    Edit(){
        this.objects = [];
    }

    EnumButton(data){
        if(data.id == 1){
            if(data.name == 'Play'){
                play = true;
                CallEvent('Play');
            }
            else if(data.name == 'Edit'){
                play = false;
                CallEvent('Edit');
            }
        }
    }

    TryMove(obj){
        for(var snake of this.objects.filter(o=>o.type == 'Snake')){
            if(rectsColliding(Play.GetObjRect(obj), Play.GetSnakeRect(snake))){
                obj.dead = true;
            }
        }
    }

    TryMoveX(obj){
        this.TryMove(obj);
    }

    TryMoveY(obj){
        this.TryMove(obj);
    }

    DrawObj(obj){
        if(obj.type == 'Player'){
            camx = obj.x - ctx.canvas.width/2;
            camy = obj.y - ctx.canvas.height/2;
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
            CallEvent('TryMoveY', obj);
            obj.x += obj.velocityX;
            CallEvent('TryMoveX', obj);
            ctx.fillStyle = 'red';
            ctx.fillRect(obj.x - obj.rx - camx, obj.y - obj.ry - camy, obj.rx*2, obj.ry*2);
        }
        else if(obj.type == 'Snake'){
            ctx.fillStyle = 'yellow';
            obj.height = (Math.sin(this.snakeTime + (obj.x + obj.y) * 0.025) + 1) / 2 * obj.maxHeight;
            ctx.fillRect(obj.x - obj.rx - camx, obj.y - obj.height - camy, obj.rx*2, obj.height);
        }
    }

    Draw(){
        for(var obj of this.objects){
            this.DrawObj(obj);
        }
        this.snakeTime += 0.025;
        this.objects = this.objects.filter(o=>!o.dead);
    }
}

layers.push(new Play());
