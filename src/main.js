import crateImage from "./assets/crate.png";
import checkerboard from "./assets/checkerboard.png"
import houli from './assets/houli.png'
import Texture from "./graphics/TextureLoader.js";
import gameEngine from "./gameEngine.js"

const canvas = document.querySelector("#c");

if (!canvas) {
    throw new Error("Canvas not found.");
} else {
    canvas.width = 800;
    canvas.height = 600;
}

const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL2 is not supported.");
} else {
    console.log("WebGL found!")
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    SpaceBar: false
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
    if (e.code === 'Space' || e.key === ' ') {
        keys.SpaceBar = true;
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

const CheckerTexture = new Texture(gl, checkerboard)

//make objects
const cube = gameEngineOne.makeCube(crateTexture, [1, 1, 1], [0, 2, -5], [0, 0, 0], "Cube")

const houliCube = gameEngineOne.makeCube(HouliTexture, [1, 1, 1], [-5, 2, -10], [0, 0, 0], "Houli")

const ground = gameEngineOne.makeSquare(CheckerTexture, [100, 100, 100], [0, -1, 5], [0, 0, 0], "Ground")

//add them to the scene
gameEngineOne.scene.add(cube);
gameEngineOne.scene.add(ground)
// gameEngineOne.scene.add(houliCube)

function update(dt) {
    //cube.transform.position.z -= dt;
    if (keys.ArrowUp) {
        cube.acceleration.z = -cube.speed;
    } else if (keys.ArrowDown) {
        cube.acceleration.z = cube.speed;
    } else {
        cube.acceleration.z = 0;
        cube.velocity.z *= .98;
    }
    if (keys.ArrowLeft) {
        cube.acceleration.x = -cube.speed;
    } else if (keys.ArrowRight) {
        cube.acceleration.x = cube.speed;
    } else {
        cube.acceleration.x = 0;
        cube.velocity.x *= .98;
    }
    if (keys.SpaceBar) {
        cube.acceleration.y = 10;
        keys.SpaceBar = false
    }

    if (cube.transform.position.y > 0){
        cube.acceleration.y -= 10 * dt
    } else if (cube.transform.position.y < 0){
        cube.acceleration.y = 0;
        cube.velocity.y = 0;
        cube.transform.position.y = 0;
    }

    for (let i = 0; i < gameEngineOne.scene.gameObjects.length; i++) {
        const gameObject = gameEngineOne.scene.gameObjects[i]
        gameObject.velocity.x += gameObject.acceleration.x * dt;
        gameObject.velocity.y += gameObject.acceleration.y * dt;
        gameObject.velocity.z += gameObject.acceleration.z * dt;

        gameObject.transform.position.x += gameObject.velocity.x * dt;
        gameObject.transform.position.y += gameObject.velocity.y * dt;
        gameObject.transform.position.z += gameObject.velocity.z * dt;
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