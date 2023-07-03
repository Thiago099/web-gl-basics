export { WebGL }

function WebGL(canvas, vertex, fragment)
{

    const gl = canvas.getContext('webgl2');

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);
    // console.log(gl.getShaderInfoLog(fragmentShader));

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    function buffer(name)
    {
        let buffer;
        const location = gl.getAttribLocation(program, name);
        function bind(data)
        {
            if(buffer)
            {
                gl.deleteBuffer(buffer)
            }
            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
        }
        return { bind }
    }

    function uniform(type,name)
    {
        const location = gl.getUniformLocation(program, name)
        function bind(value)
        {
            gl["uniform"+type](location, value)
        }
        return { bind }
    }

    function draw()
    {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    return { draw, buffer, uniform }
}