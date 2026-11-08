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

export default class gameEngine {

    constructor(gl) {
        this.gl = gl
        this.vsh = createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexShaderSource
        );
        this.fsh = createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );
        this.program = createProgram(
            gl,
            this.vsh,
            this.fsh
        );
        this.uniforms = {

            model: gl.getUniformLocation(this.program, "u_model"),
            view: gl.getUniformLocation(this.program, "u_view"),
            projection: gl.getUniformLocation(this.program, "u_projection"),

            lightPosition: gl.getUniformLocation(this.program, "u_lightPosition"),
            lightColor: gl.getUniformLocation(this.program, "u_lightColor"),

            cameraPosition: gl.getUniformLocation(this.program, "u_cameraPosition"),

            ambientStrength: gl.getUniformLocation(this.program, "u_ambientStrength"),
            specularStrength: gl.getUniformLocation(this.program, "u_specularStrength"),
            shininess: gl.getUniformLocation(this.program, "u_shininess"),

            diffuseTexture: gl.getUniformLocation(this.program, "u_diffuseTexture")

        };
        this.camera = new Camera()
        this.scene = new Scene(this.camera)
        this.renderer = new Renderer(gl, this.program, this.uniforms, this.camera)
        this.vertexLayout = new VertexLayout(gl)
        this.squareMesh = new Mesh(gl, createSquareMeshData(), this.vertexLayout);
        this.cubeMesh = new Mesh(gl, createCubeMeshData(), this.vertexLayout);

    }

    render() {
        this.renderer.render(this.scene)
    }

    makeCube(texture, dimensions, position, rotation, name){
        const cube = new GameObject(this.cubeMesh, texture);
        cube.name = name
        cube.transform.position.set(...position)
        cube.transform.rotation.set(...rotation)
        cube.transform.scale.set(...dimensions)
        return cube
    }

    makeSquare(texture, dimensions, position, rotation, name){
        const square = new GameObject(this.squareMesh, texture);
        square.name = name
        square.transform.position.set(...position)
        square.transform.rotation.set(...rotation)
        square.transform.scale.set(...dimensions)
        return square
    }
}