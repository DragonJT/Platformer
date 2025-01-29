const elementHeight = 25;
var uiUsed = false;

class EnumButton{
    constructor(name, id, width = 150){
        this.name = name;
        this.width = width;
        this.id = id;
        this.over = false;
        this.selected = false;
    }

    IsOver(e){
        return e.clientX > 0 && e.clientX < this.width && e.clientY > this.y && e.clientY < this.y+elementHeight;
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
        
        ctx.fillRect(0,y,this.width,elementHeight);
        ctx.strokeRect(0,y,this.width,elementHeight);
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        ctx.fillText(this.name, 10, y+18);
    }
}

class UI{
    constructor(){
        this.elements = [
            new EnumButton('Ground', 0), 
            new EnumButton('Empty', 0), 
            new EnumButton('Player', 0), 
            new EnumButton('Snake', 0), 
            new EnumButton('Play', 1),
            new EnumButton('Edit', 1)
        ];
    }

    CallElementReversed(name, e){
        uiUsed = false;
        for(var i=this.elements.length-1;i>=0;i--){
            var element = this.elements[i];
            if(element){
                element[name](e);
            }
            if(uiUsed){
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
            y += elementHeight;
        }
    }
}

layers.push(new UI());
CallEvent('EnumButton', {name:'Ground', id:0});
CallEvent('EnumButton', {name:'Edit', id:1});