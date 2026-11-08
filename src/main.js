import crateImage from "./assets/crate.png";
import checkerboard from "./assets/checkerboard.png"
import houli from './assets/houli.png'
import Texture from "./graphics/TextureLoader.js";
import gameEngine from "./gameEngine.js"

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

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// 2. Listen for keydown and keyup events
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
        keys.ArrowUp = true;
    }
    if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        keys.ArrowDown = true;
    }
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        keys.ArrowLeft = true;
    }
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        keys.ArrowRight = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
        keys.ArrowUp = false;
    }
    if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        keys.ArrowDown = false;
    }
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        keys.ArrowLeft = false;
    }
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        keys.ArrowRight = false;
    }
});

gl.enable(gl.DEPTH_TEST);

const gameEngineOne = new gameEngine(gl)

//load textures
const crateTexture = new Texture(gl, crateImage);

const HouliTexture = new Texture(gl, houli)

const CheckerTexture  = new Texture(gl, checkerboard)

//make objects
const cube = gameEngineOne.makeCube(crateTexture, [1, 1, 1], [0, 2, 0], [0, 0, 0], "Cube")

const houliCube = gameEngineOne.makeCube(HouliTexture, [1, 1, 1], [-5, 2, -10], [0, 0, 0], "Houli")

const ground = gameEngineOne.makeSquare(CheckerTexture, [25, 25, 25], [0, -2, 0], [0, 0, 0], "Ground")

//add them to the scene
gameEngineOne.scene.add(cube);
gameEngineOne.scene.add(ground)
// gameEngineOne.scene.add(houliCube)

function update(dt) {
    //cube.transform.position.z -= dt;
    if (keys.ArrowUp) {
        cube.transform.position.z -= dt
    }
    if (keys.ArrowDown) {
        cube.transform.position.z += dt
    }
    if (keys.ArrowLeft) {
        cube.transform.position.x -= dt
    }
    if (keys.ArrowRight) {
        cube.transform.position.x += dt
    }
}

let previousTime = 0;

function gameLoop(time) {

    const dt = (time - previousTime) / 1000;
    previousTime = time;
    update(dt);
    gameEngineOne.render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);