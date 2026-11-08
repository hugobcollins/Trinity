import crateImage from "./assets/crate.png";
import checkerboard from "./assets/checkerboard.png"
import houli from './assets/houli.png'
import Texture from "./graphics/TextureLoader.js";
import vertexShaderSource from './shaders/shader.vsh?raw';
import fragmentShaderSource from './shaders/shader.fsh?raw';
import Mesh from "./graphics/Mesh.js";
import GameObject from "./objects/GameObject.js";
import Renderer from './graphics/Renderer.js';
import Scene from './objects/Scene.js';
import Camera from './graphics/Camera.js';
import VertexLayout from './graphics/VertexLayout.js'
import { createCubeMeshData } from './graphics/primitives/Cube.js';
import { createSquareMeshData } from './graphics/primitives/Square.js';
import { createDodecahedronMeshData } from './graphics/primitives/Dodecahedron.js';

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

    model: gl.getUniformLocation(program, "u_model"),
    view: gl.getUniformLocation(program, "u_view"),
    projection: gl.getUniformLocation(program, "u_projection"),

    lightPosition: gl.getUniformLocation(program, "u_lightPosition"),
    lightColor: gl.getUniformLocation(program, "u_lightColor"),

    cameraPosition: gl.getUniformLocation(program, "u_cameraPosition"),

    ambientStrength: gl.getUniformLocation(program, "u_ambientStrength"),
    specularStrength: gl.getUniformLocation(program, "u_specularStrength"),
    shininess: gl.getUniformLocation(program, "u_shininess"),

    diffuseTexture: gl.getUniformLocation(program, "u_diffuseTexture")

};

gl.enable(gl.DEPTH_TEST);

const scene = new Scene();
const camera = new Camera();
camera.transform.position.set(0, 5, 10)
camera.transform.rotation.set(-.2, 0, 0)
scene.camera = camera

//make vertex layout
const vertexLayout = new VertexLayout(gl)

//make mesh data and compute normals
const squareMeshData = createSquareMeshData()

squareMeshData.computeNormals()

const cubeMeshData = createCubeMeshData()

cubeMeshData.computeNormals()

//load textures
const crateTexture = new Texture(gl, crateImage);

const HouliTexture = new Texture(gl, houli)

const CheckerTexture  = new Texture(gl, checkerboard)

//make the meshes!!!
const squareMesh = new Mesh(gl, squareMeshData, vertexLayout);

const cubeMesh = new Mesh(gl, cubeMeshData, vertexLayout);

//make objects
const cube = new GameObject(cubeMesh, crateTexture);

const houliCube = new GameObject(cubeMesh, HouliTexture);

const ground = new GameObject(squareMesh, CheckerTexture);

//name them
cube.name = "Cube";

houliCube.name = "Houli!"

ground.name = "Ground"

//set scale and starting position
cube.transform.position.set(0, 0, -5);

houliCube.transform.position.set(-5, 2, -10)

ground.transform.position.set(0, -2, 0) 

cube.transform.scale.set(1, 1, 1);

houliCube.transform.scale.set(1, 1, 1)

ground.transform.scale.set(20, 20, 20)

//add them to the scene
scene.add(cube);

//scene.add(houliCube)

scene.add(ground)

const renderer = new Renderer(gl, program, uniforms);
renderer.camera = camera

function render(){

    renderer.render(scene);

}

function update(dt) {
    //triangle.transform.rotation.z += dt;
    //cube.transform.rotation.z += dt;
    //cube.transform.rotation.y += dt * 0.7;
    //cube.transform.position.z -= dt;
    //houliCube.transform.rotation.y += dt;
    //ground.transform.rotation.x += dt;
    //dodecahedron.transform.rotation.x += dt;
    //dodecahedron.transform.rotation.y += dt * 0.7;
    //camera.transform.rotation.x -= dt * .1;
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