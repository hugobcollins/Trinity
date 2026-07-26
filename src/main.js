import vertexShaderSource from './shaders/shader.vsh?raw';
import fragmentShaderSource from './shaders/shader.fsh?raw';
import Mesh from "./graphics/Mesh.js";
import GameObject from "./objects/GameObject.js";
import Renderer from './graphics/Renderer.js';
import Mat3 from './math/Mat3.js';

const canvas = document.querySelector("#c");

if (!canvas) {
    throw new Error("Canvas not found.");
}else{
    canvas.width = 800;
    canvas.height = 600;
}

const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL2 is not supported.");
}else{
    console.log("WebGL found!")
}

function resizeCanvas(canvas) {

    const pixelRatio = window.devicePixelRatio || 1;

    const displayWidth =
        Math.floor(canvas.clientWidth * pixelRatio);

    const displayHeight =
        Math.floor(canvas.clientHeight * pixelRatio);

    if (
        canvas.width !== displayWidth ||
        canvas.height !== displayHeight
    ) {

        canvas.width = displayWidth;
        canvas.height = displayHeight;

        return true;
    }

    return false;

}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
);

const program = createProgram(
    gl,
    vertexShader,
    fragmentShader
);

const uniforms = {

    model: gl.getUniformLocation(
        program,
        "u_model"
    ),

    view: gl.getUniformLocation(
        program,
        "u_view"
    ),

    projection: gl.getUniformLocation(
        program,
        "u_projection"
    )

};

const attributes = {

    position: gl.getAttribLocation(
        program,
        "a_position"
    )

};

const buffers = {

    position: gl.createBuffer()

};

const vao = gl.createVertexArray();

gl.bindVertexArray(vao);

gl.bindBuffer(
    gl.ARRAY_BUFFER,
    buffers.position
);

gl.enableVertexAttribArray(
    attributes.position
);

gl.vertexAttribPointer(
    attributes.position,
    2,
    gl.FLOAT,
    false,
    0,
    0
);

gl.bindVertexArray(null);

console.log(
    gl.getAttribLocation(program, "a_position")
);

console.log(uniforms);

const triangleMesh = new Mesh(gl, [
    -33.3, -33.3,
    -33.3,  66.7,
     66.7, -33.3
]);

const triangle = new GameObject(triangleMesh);

triangle.x = gl.canvas.width / 2;
triangle.y = gl.canvas.height / 2;
triangle.rotation = 0;
triangle.scale = .5;

function render(){

    const renderer = new Renderer(gl, program, uniforms)

    renderer.render([
        triangle
    ]);

}

function update(dt){
    triangle.rotation += dt;
}

let previousTime = 0;

function gameLoop(time) {

    const dt = (time - previousTime) / 1000;
    previousTime = time;
    update(dt);
    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);