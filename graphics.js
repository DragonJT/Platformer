
function Graphics(){

    function CreateShader(vsSource, fsSource){
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(vertexShader));
        }

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(fragmentShader));
        }

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
        }
        return program;
    }

    function CreateTexture(image, w, h){
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(image));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        return texture;
    }

    function DrawText(x, y, w, h, text, fontSize, tint){
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        tempCTX.canvas.width = w;
        tempCTX.canvas.height = h;
        tempCTX.font = fontSize+'px Arial';
        var size = tempCTX.measureText(text);
        tempCTX.fillStyle = 'white';
        tempCTX.fillText(text, w/2 - size.width/2, h/2 + fontSize/2);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tempCTX.canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        DrawTexture(x,y,w,h,texture,tint,1);
        gl.deleteTexture(texture);
    }

    function DeleteTexture(texture){
        gl.deleteTexture(texture);
    }

    function Clear(){
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function DrawTexture(x, y, w, h, texture, tint = [1,1,1,1]){
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform4fv(gl.getUniformLocation(program, 'tint'), tint);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'model'), false, MDN.trs(x+w/2,y+h/2,0,w,h));
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 
            'view'), false, MDN.orthographicMatrix(0,canvas.width,canvas.height,0,-1,1));

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function DrawRect(x, y, w, h, tint){
        DrawTexture(x,y,w,h,whiteTex,tint);
    }

    function DrawRectBorder(x, y, w, h, border, tint){
        DrawRect(x,y,border,h,tint);
        DrawRect(x+w-border,y,border,h,tint);
        DrawRect(x,y,w,border,tint);
        DrawRect(x,y+h-border,w,border,tint);
    }

    function GetCanvasWidth(){
        return canvas.width;
    }

    function GetCanvasHeight(){
        return canvas.height;
    }

    var canvas = document.createElement('canvas');
    document.body.style.margin = '0px';
    document.body.style.overflow = 'hidden';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var tempCanvas = document.createElement('canvas');
    var tempCTX = tempCanvas.getContext('2d');

    addEventListener('resize', ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("WebGL 2 not available");
        document.body.innerHTML = "This example requires WebGL 2 which is unavailable on this system."
    }

    gl.clearColor(0, 0, 0, 1);

    /////////////////////
    // SET UP PROGRAM
    /////////////////////

    var vsSource = 
    `#version 300 es
    layout (location=0) in vec4 position;
    layout (location=1) in vec2 texCoord;

    uniform mat4 model;
    uniform mat4 view;
    out vec2 vTexCoord;

    void main() {
        vTexCoord = texCoord;
        gl_Position = view * model * position;
    }`;

    var fsSource = 
    `#version 300 es
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec4 tint;

    in vec2 vTexCoord;
    out vec4 fragColor;

    void main() {
        vec4 color = texture(uTexture, vTexCoord) * tint;
        fragColor = color;
    }`;

    var program = CreateShader(vsSource, fsSource);
    gl.useProgram(program);

    /////////////////////
    // SET UP GEOMETRY
    /////////////////////

    var triangleArray = gl.createVertexArray();
    gl.bindVertexArray(triangleArray);

    var positions = new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0
    ]);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    var texCoord = new Float32Array([
        0,0,
        1,0,
        1,1,
        0,0,
        1,1,
        0,1
    ]);

    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoord, gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var whiteTex = CreateTexture([255,255,255,255], 1, 1);

    return {CreateTexture, DrawTexture, DeleteTexture, DrawText, Clear, DrawRect, DrawRectBorder, GetCanvasWidth, GetCanvasHeight};
}