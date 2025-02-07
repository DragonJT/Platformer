
function TileMap(){
    var dragging = false;
    var tileTypes = ['Ground', 'Empty'];
    var tileType = 'Ground';
    var tiles = {};
    const tileSize = 50;

    function SetTile(x,y,type){
        tiles[x+'_'+y] = type;
    }

    function GetTile(x,y){
        return tiles[x+'_'+y];
    }

    function SetTileWorldCoords(x,y,type){
        SetTile(Math.floor(x/tileSize), Math.floor(y/tileSize), type);
    }

    function WorldRectOverTile(rect, tile){
        var minx = Math.floor((rect.x)/tileSize);
        var miny = Math.floor((rect.y)/tileSize);
        var maxx = Math.floor((rect.x + rect.w)/tileSize);
        var maxy = Math.floor((rect.y + rect.h)/tileSize);
        for(var x=minx;x<=maxx;x++){
            for(var y=miny;y<=maxy;y++){
                if(GetTile(x,y) == tile){
                    return true;
                }
            }
        }
        return false;
    }

    function TryMoveY(obj){
        if(WorldRectOverTile(GetObjRect(obj), 'Ground')){
            if(obj.velocityY >= 0){
                obj.grounded = true;
            }
            obj.y -= obj.velocityY;
            obj.velocityY = 0;
        }
    }

    function TryMoveX(obj){
        if(WorldRectOverTile(GetObjRect(obj), 'Ground')){
            obj.x -= obj.velocityX;
            obj.velocityX = 0;
        }
    }

    function Draw(){
        var minx = Math.floor(camx/tileSize);
        var miny = Math.floor(camy/tileSize);
        var maxx = Math.floor((camx + gfx.GetCanvasWidth())/tileSize);
        var maxy = Math.floor((camy + gfx.GetCanvasHeight())/tileSize);
        for(var x=minx;x<=maxx;x++){
            for(var y=miny;y<=maxy;y++){
                var type = GetTile(x,y);
                if(type == 'Ground'){
                    gfx.DrawRect(x*tileSize - camx, y*tileSize - camy, tileSize, tileSize, [0,1,0,1]);
                }
            }
        }
    }

    function Edit(){
        if(e.type == 'mousemove' && dragging){
            if(!MouseOverToolbar()){
                SetTileWorldCoords(e.clientX+camx, e.clientY+camy, tileType);
            }
        }
        if(e.type == 'mousedown'){
            if(e.button == 0){
                if(!MouseOverToolbar()){
                    SetTileWorldCoords(e.clientX+camx, e.clientY+camy, tileType);
                    dragging = true;
                }
            }
        }
        if(e.type == 'mouseup'){
            dragging = false;
        }
    }

    function OnGUI(){
        for(var t of tileTypes){
            if(SelectableButton(t, tileType==t)){
                tileType = t;
            }
        }
    }
    return {name:'tilemap', Edit, Draw, OnGUI, TryMoveX, TryMoveY};
}