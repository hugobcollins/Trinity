import crateImage from "./assets/crate.png";
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
import { createTriangleMeshData } from './graphics/primitives/Triangle.js';
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
scene.camera = camera

const vertexLayout = new VertexLayout(gl)

//const triangleMesh = new Mesh(gl, createTriangleMeshData());

const cubeMeshData = createCubeMeshData()

cubeMeshData.computeNormals()

const crateTexture = new Texture(gl, crateImage);

const HouliTexture = new Texture(gl, houli)

const cubeMesh = new Mesh(gl, cubeMeshData, vertexLayout);

//Gemini gave me the code for making a Dodecahdron, because who knows how to do that
//Unfortunately, it tweaked out, and this is definitely not a dodecahedron
//Just warning you

//const dodecahedronMesh = new Mesh(gl, createDodecahedronMeshData());

//const triangle = new GameObject(triangleMesh);

const cube = new GameObject(cubeMesh, crateTexture);

const houliCube = new GameObject(cubeMesh, HouliTexture)

//const dodecahedron = new GameObject(dodecahedronMesh);

//triangle.name = "Triangle";

cube.name = "Cube";

houliCube.name = "Houli!"

//dodecahedron.name = "Dodecahedron";

//triangle.transform.position.set(0,0,-5);

cube.transform.position.set(0, 0, -5);

houliCube.transform.position.set(-5, 2, -10)

//dodecahedron.transform.position.set(0, 0, -5);

//triangle.transform.scale.set(0.5,0.5,0.5);

cube.transform.scale.set(1, 1, 1);

houliCube.transform.scale.set(1, 1, 1)

//dodecahedron.transform.scale.set(1, 1, 1);

//scene.add(triangle);

scene.add(cube);

//scene.add(houliCube)

//scene.add(dodecahedron);

const renderer = new Renderer(gl, program, uniforms);
renderer.camera = camera

function render(){

    renderer.render(scene);

}

function update(dt) {
    //triangle.transform.rotation.z += dt;
    cube.transform.rotation.z += dt;
    cube.transform.rotation.y += dt * 0.7;
    cube.transform.position.z -= dt;
    houliCube.transform.rotation.y += dt;
    //dodecahedron.transform.rotation.x += dt;
    //dodecahedron.transform.rotation.y += dt * 0.7;
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