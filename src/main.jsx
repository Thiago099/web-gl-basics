import "./style.css"
import { WebGL } from "./webgl";


const vertexData = [
    400, 0, 0,    // V1.position
    800, 600, 0,   // V2.position
    0, 600, 0,  // V3.position
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
    
    const gl = WebGL(canvas, vertex, fragment)
    
    const position = gl.buffer("position")
    
    const color = gl.buffer("color")

    gl.uniform("1f","width").bind(800)
    gl.uniform("1f","height").bind(600)
    
    color.bind(colorData)
    position.bind(vertexData)
    
    canvas.$on("click",e=>{
        color.bind( [
            1, 1, 0,    // V3.color
            1, 0, 1,    // V1.color
            0, 1, 1,    // V2.color
        ])
        gl.draw()
    })
    canvas.$on("mousemove",e=>{
        position.bind([
            e.offsetX, e.offsetY, 0,    // V1.position
            800, 600, 0,   // V2.position
            0, 600, 0,  // V3.position
        ])
        gl.draw()
    })
    
    gl.draw()
}
main()






// gl.deleteBuffer(positionBuffer)
// gl.deleteBuffer(colorBuffer)