
function Spawns(){
    var spawnType = 'Player';
    var spawnTypes = ['Player', 'Snake'];
    var spawns = [];
    const spawnRadius = 10;

    function GetColor(type){
        if(type == 'Player') return [1,0,0,1];
        if(type == 'Snake') return [1,1,0,1];
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
            gfx.DrawRect(spawn.x - spawnRadius - camx, spawn.y - spawnRadius - camy, spawnRadius*2, spawnRadius*2, GetColor(spawn.type));
            gfx.DrawRectBorder(spawn.x - spawnRadius - camx, spawn.y - spawnRadius - camy, spawnRadius*2, spawnRadius*2, 2, [1,1,1,1]);
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