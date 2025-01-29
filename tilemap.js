
class Tilemap{
    constructor(tileSize){
        this.tileSize = tileSize;
        this.tiles = {};
        this.type = 'Ground';
    }

    SetTile(x,y,color){
        this.tiles[x+'_'+y] = color;
    }

    GetTile(x,y){
        return this.tiles[x+'_'+y];
    }

    SetTileWorldCoords(x,y,color){
        this.SetTile(Math.floor(x/this.tileSize), Math.floor(y/this.tileSize), color);
    }

    GetTileWorldCoords(x,y){
        return this.GetTile(Math.floor(x/this.tileSize), Math.floor(y/this.tileSize));
    }

    WorldRectOverTile(rect, tile){
        var minx = Math.floor((rect.x)/this.tileSize);
        var miny = Math.floor((rect.y)/this.tileSize);
        var maxx = Math.floor((rect.x + rect.w)/this.tileSize);
        var maxy = Math.floor((rect.y + rect.h)/this.tileSize);
        for(var x=minx;x<=maxx;x++){
            for(var y=miny;y<=maxy;y++){
                if(this.GetTile(x,y) == tile){
                    return true;
                }
            }
        }
        return false;
    }

    TryMoveY(obj){
        if(this.WorldRectOverTile(Play.GetObjRect(obj), 'Ground')){
            if(obj.velocityY >= 0){
                obj.grounded = true;
            }
            obj.y -= obj.velocityY;
            obj.velocityY = 0;
        }
    }

    TryMoveX(obj){
        if(this.WorldRectOverTile(Play.GetObjRect(obj), 'Ground')){
            obj.x -= obj.velocityX;
            obj.velocityX = 0;
        }
    }

    EnumButton(data){
        if(data.id == 0){
            if(data.name == 'Ground' || data.name == 'Empty'){
                this.type = data.name;
                this.selected = true;
            }
            else{
                this.selected = false;
            }
        }
    }

    MouseDown(e){
        if(e.button == 0 && this.selected && !play){
            this.dragging = true;
            this.SetTileWorldCoords(e.clientX+camx, e.clientY+camy, this.type);
        }
    }

    MouseMove(e){
        if(this.dragging){
            this.SetTileWorldCoords(e.clientX+camx, e.clientY+camy, this.type);
        }
    }

    MouseUp(e){
        this.dragging = false;
    }

    Draw(){
        var minx = Math.floor(camx/this.tileSize);
        var miny = Math.floor(camy/this.tileSize);
        var maxx = Math.floor((camx + ctx.canvas.width)/this.tileSize);
        var maxy = Math.floor((camy + ctx.canvas.height)/this.tileSize);
        for(var x=minx;x<=maxx;x++){
            for(var y=miny;y<=maxy;y++){
                var type = this.GetTile(x,y);
                if(type == 'Ground'){
                    ctx.fillStyle = 'lime';
                    ctx.fillRect(x*this.tileSize - camx, y*this.tileSize - camy, this.tileSize, this.tileSize);
                }
            }
        }
    }
}

layers.push(new Tilemap(50));