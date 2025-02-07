
function Spawns(){
    var spawnType = 'Player';
    var spawnTypes = ['Player', 'Snake'];
    var spawns = [];

    function GetColor(type){
        if(type == 'Player') return 'red';
        if(type == 'Snake') return 'yellow';
    }

    function GetObjects(){
        var objects = [];
        for(var spawn of spawns){
            if(spawn.type == 'Player'){
                objects.push({
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
                objects.push({
                    type:'Snake',
                    x:spawn.x,
                    y:spawn.y,
                    maxHeight:300,
                    rx:30,
                });
            }
        }
        return objects;
    }

    function Draw(){
        for(var spawn of spawns){
            ctx.beginPath();
            ctx.arc(spawn.x - camx, spawn.y - camy, 7.5, 0, Math.PI*2);
            ctx.fillStyle = GetColor(spawn.type);
            ctx.fill();
        }
    }

    function Edit(){
        if(e.type == 'mousedown' && !MouseOverToolbar()){
            spawns.push({type:spawnType, x:e.clientX+camx, y:e.clientY+camy});
        }
    }

    function OnGUI(){
        for(var s of spawnTypes){
            if(SelectableButton(s, spawnType==s)){
                spawnType = s;
            }
        }
    }

    return {name:'spawns', Edit, Draw, OnGUI, GetObjects}
}