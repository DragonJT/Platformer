

function Paint(){
    
    function PaintCanvas(name, width, height, scale){
        const offsetx = 200;
        const offsety = 25;
        const columns = 4;

        var brushRadius = 1;
        
        var dragging = false;
        var colors = [
            [0,0,0,0], [1,0,0,1], [1,1,1,1], [0,0,1,1], [0,1,1,1], 
            [1,0,1,1], [1,1,0,1], [1,0.5,0,1], [0,0,0,1], [0,1,0,1],
            [0,0.5,0,1], [0.5,0,0,1], [0,0,0.5,1] 
        ];
        var color = colors[0];

        var pixels = Array(width*height*columns).fill(0);
        var texture = gfx.CreateTexture(pixels, width, height);

        function GetTexture(){
            return texture;
        }

        function SetPixel(x, y, color){
            if(x < 0 || x > width || y < 0 || y > height){
                return;
            }
            pixels[(y*width+x)*columns + 0] = color[0] * 255;
            pixels[(y*width+x)*columns + 1] = color[1] * 255;
            pixels[(y*width+x)*columns + 2] = color[2] * 255;
            pixels[(y*width+x)*columns + 3] = color[3] * 255;
        }
    
        function Brush(brushX, brushY, radius, color){
            gfx.DeleteTexture(texture);
            var px = Math.floor((brushX - offsetx)/scale);
            var py = Math.floor((brushY - offsety)/scale);
            for(var x=px-radius;x<=px+radius;x++){
                for(var y=py-radius;y<=py+radius;y++){
                    SetPixel(x, y, color)
                }
            }
            texture = gfx.CreateTexture(pixels, width, height);
        }
    
        function OnEvent(){
            if(e.type == 'mousedown'){
                dragging = true;
                Brush(e.clientX, e.clientY, brushRadius, color);
            }
            if(e.type == 'mousemove' && dragging){
                Brush(e.clientX, e.clientY, brushRadius, color);
            }
            if(e.type == 'mouseup'){
                dragging = false;
            }
            if(e.type == 'draw'){
                gfx.DrawTexture(offsetx,offsety,width*scale,height*scale,texture,[1,1,1,1]);
                gfx.DrawRectBorder(offsetx,offsety,width*scale,height*scale,2,[1,1,1,1]);
            }
        }
    
        function OnGUI(){
            guiY+=10;
            color = ColorPallette(colors, color);
            guiY+=10;
            if(Button('1')){
                brushRadius = 1;
            }
            if(Button('2')){
                brushRadius = 2;
            }
            if(Button('4')){
                brushRadius = 4;
            }
        }

        return {name, GetTexture, OnEvent, OnGUI};
    }
    
    var player = PaintCanvas('player', 50, 75, 6);
    var groundTile = PaintCanvas('groundTile', 50, 50, 6);

    var paintCanvases = [player, groundTile];
    var paintCanvas = paintCanvases[0];

    function OnEvent(){
        paintCanvas.OnEvent();
    }

    function OnGUI(){
        guiY += 10;
        for(var c of paintCanvases){
            if(SelectableButton(c.name, paintCanvas == c)){
                paintCanvas = c;
            }
        }
        paintCanvas.OnGUI();
    }

    function GetPlayerTexture(){
        return player.GetTexture();
    }

    function GetGroundTileTexture(){
        return groundTile.GetTexture();
    }
    
    return {name:'paint', OnEvent, OnGUI, GetPlayerTexture, GetGroundTileTexture};
}