
function Editor(){
    const editorSpeed = 10;
    var modes = [tilemap, spawns]
    var mode = tilemap;
    
    function OnEvent(){
        if(keys.ArrowLeft){
            camx -= editorSpeed;
        }
        if(keys.ArrowRight){
            camx += editorSpeed;
        }
        if(keys.ArrowUp){
            camy -= editorSpeed;
        }
        if(keys.ArrowDown){
            camy += editorSpeed;
        }
        mode.Edit();
        for(var m of modes){
            m.Draw();
        }
    }

    function OnGUI(){
        guiY += 10;
        for(var m of modes){
            if(SelectableButton(m.name, mode == m)){
                mode = m;
            }
        }
        guiY+=10;
        mode.OnGUI();
    }
    return {name:'editor', OnEvent, OnGUI};
}