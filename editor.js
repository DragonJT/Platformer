const editorSpeed = 10;

class Editor{
    Draw(){
        if(!play){
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
        }
    }
}

layers.push(new Editor());