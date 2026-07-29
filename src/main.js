import vertexShaderSource from './shaders/shader.vsh?raw';
import fragmentShaderSource from './shaders/shader.fsh?raw';
import Mesh from "./graphics/Mesh.js";
import GameObject from "./objects/GameObject.js";
import Renderer from './graphics/Renderer.js';
import Mat3 from './math/Mat3.js';
import Scene from './objects/Scene.js';
import Camera from './graphics/Camera.js';

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

gl.enable(gl.DEPTH_TEST);

const scene = new Scene();
const camera = new Camera();
scene.camera = camera

const cubeVertices = [
    -1,-1,-1,
     1,-1,-1,
     1, 1,-1,
    -1, 1,-1,
    -1,-1, 1,
     1,-1, 1,
     1, 1, 1,
    -1, 1, 1
];

const cubeIndices = [
    4,5,6,
    4,6,7,

    1,0,3,
    1,3,2,

    0,4,7,
    0,7,3,

    5,1,2,
    5,2,6,

    3,7,6,
    3,6,2,

    0,1,5,
    0,5,4
];

const triangleMesh = new Mesh(gl, [
    -1, -1, 0,
     0,  1, 0,
     1, -1, 0
]);

const cubeMesh = new Mesh(gl, cubeVertices, cubeIndices);

const triangle = new GameObject(triangleMesh);

const cube = new GameObject(cubeMesh);

triangle.name = "Triangle";

cube.name = "Cube"

triangle.transform.position.set(0,0,-5);

cube.transform.position.set(0, 0, -5);

triangle.transform.scale.set(0.5,0.5,0.5);

cube.transform.scale.set(1, 1, 1);

//scene.add(triangle);

scene.add(cube);

const renderer = new Renderer(gl, program, uniforms)

function render(){

    renderer.render(scene);

}

function update(dt) {
    triangle.transform.rotation.z += dt;
    cube.transform.rotation.z += dt;
    cube.transform.rotation.y += dt * 0.7;
    cube.transform.position.z -= dt;
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