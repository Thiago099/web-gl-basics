precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

uniform float width;
uniform float height;

void main() {
    vColor = color;
    gl_Position = vec4((position.x / width) * 2.0 - 1.0,(-position.y / height) * 2.0 + 1.0 ,0, 1);
}