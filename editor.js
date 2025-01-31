
class Editor{
    constructor(){
        this.editorSpeed = 10;
    }

    Draw(){
        if(!GetLayer('Play').play){
            if(keys.ArrowLeft){
                camx -= this.editorSpeed;
            }
            if(keys.ArrowRight){
                camx += this.editorSpeed;
            }
            if(keys.ArrowUp){
                camy -= this.editorSpeed;
            }
            if(keys.ArrowDown){
                camy += this.editorSpeed;
            }
        }
    }
}