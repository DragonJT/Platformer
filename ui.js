
class EnumButton{
    constructor(name, id, height, width = 150){
        this.name = name;
        this.id = id;
        this.height = height;
        this.width = width;
        this.over = false;
        this.selected = false;
    }

    IsOver(e){
        return e.clientX > 0 && e.clientX < this.width && e.clientY > this.y && e.clientY < this.y+this.height;
    }

    MouseDown(e){
        if(e.button == 0){
            if(this.IsOver(e)){
                CallEvent('EnumButton', {name:this.name, id:this.id});
                used = true;
            }
        }
    }

    EnumButton(data){
        if(data.id == this.id){
            this.selected = (this.name == data.name);
        }
    }

    MouseMove(e){
        this.over = this.IsOver(e);
    }

    Draw(y){
        this.y = y;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.selected?'red':this.over?'magenta':'white';
        
        ctx.fillRect(0,y,this.width,this.height);
        ctx.strokeRect(0,y,this.width,this.height);
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        ctx.fillText(this.name, 10, y+18);
    }
}

class UI{
    constructor(){
        const height = 25;
        this.elements = [
            new EnumButton('Ground', 0, height), 
            new EnumButton('Empty', 0, height), 
            new EnumButton('Player', 0, height), 
            new EnumButton('Snake', 0, height), 
            new EnumButton('Play', 1, height),
            new EnumButton('Edit', 1, height)
        ];
        this.uiUsed = false;
    }

    CallElementReversed(name, e){
        this.uiUsed = false;
        for(var i=this.elements.length-1;i>=0;i--){
            var element = this.elements[i];
            if(element){
                element[name](e);
            }
            if(this.uiUsed){
                return;
            }
        }
    }

    EnumButton(data){
        this.CallElementReversed('EnumButton', data);
    }

    MouseDown(e){
        this.CallElementReversed('MouseDown', e);
    }

    MouseMove(e){
        this.CallElementReversed('MouseMove', e);
    }

    Draw(){
        var y = 0;
        for(var e of this.elements){
            e.Draw(y);
            y += e.height;
        }
    }

    Awake(){
        CallEvent('EnumButton', {name:'Ground', id:0});
        CallEvent('EnumButton', {name:'Edit', id:1});
    }
}