import "./style.css"
import { WebGL } from "./webgl";


const vertexData = [
    0, 1, 0,    // V1.position
    1, -1, 0,   // V2.position
    -1, -1, 0,  // V3.position
];

const colorData = [
    1, 0, 0,    // V1.color
    0, 1, 0,    // V2.color
    0, 0, 1,    // V3.color
];


var canvas = 
<canvas></canvas>

canvas.width = 800
canvas.height = 600

canvas.$parent(document.body)

async function main()
{
    const vertex = await fetch("vertex.glsl").then(x=>x.text())
    const fragment =  await fetch("fragment.glsl").then(x=>x.text())
    
    const gl = WebGL(canvas, vertex,fragment)
    
    gl.buffer("position").bind(vertexData)
    
    const color = gl.buffer("color")
    
    color.bind(colorData)
    
    canvas.$on("click",()=>{
        color.bind( [
            1, 1, 0,    // V3.color
            1, 0, 1,    // V1.color
            0, 1, 1,    // V2.color
        ])
        gl.draw()
    })
    
    gl.draw()
}
main()






// gl.deleteBuffer(positionBuffer)
// gl.deleteBuffer(colorBuffer)