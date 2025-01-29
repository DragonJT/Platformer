
class Spawns{
    constructor(){
        this.spawns = [];

    }

    Play(){
        for(var spawn of this.spawns){
            if(spawn.type == 'Player'){
                CallEvent('Spawn', {
                    type:'Player', 
                    x:spawn.x, 
                    y:spawn.y,
                    rx:15,
                    ry:20,
                    velocityX:0,
                    velocityY:0,
                    speed:5,
                    jump:12,
                });
            }
            else if(spawn.type == 'Snake'){
                CallEvent('Spawn', {
                    type:'Snake',
                    x:spawn.x,
                    y:spawn.y,
                    maxHeight:300,
                    rx:30,
                });
            }
        }
    }

    EnumButton(data){
        if(data.id == 0){
            if(data.name == 'Player' || data.name == 'Snake'){
                this.selected = true;
                this.type = data.name;
            }
            else{
                this.selected = false;
            }
        }
    }

    MouseDown(e){
        if(this.selected && !play){
            this.spawns.push({type:this.type, x:e.clientX+camx, y:e.clientY+camy});
            used = true;
        }
    }

    static GetColor(type){
        if(type == 'Player') return 'red';
        if(type == 'Snake') return 'yellow';
    }

    Draw(){
        if(!play){
            for(var spawn of this.spawns){
                ctx.beginPath();
                ctx.arc(spawn.x - camx, spawn.y - camy, 7.5, 0, Math.PI*2);
                ctx.fillStyle = Spawns.GetColor(spawn.type);
                ctx.fill();
            }
        }
    }
}

layers.push(new Spawns());