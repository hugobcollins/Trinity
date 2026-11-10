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
    SpaceBar: false,
    A: false,
    S: false,
    D: false,
    W: false,
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
    if (e.code === 'A' || e.key === 'a') {
        keys.A = true;
    }
    if (e.code === 'D' || e.key === 'd') {
        keys.D = true;
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
    if (e.code === 'A' || e.key === 'a') {
        keys.A = false;
    }
    if (e.code === 'D' || e.key === 'd') {
        keys.D = false;
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

const child = gameEngineOne.makeCube(crateTexture, [1, 1, 1], [0, 0, -4], [0, 0, 0], "Child")

cube.addChild(child)

//add them to the scene
gameEngineOne.scene.add(cube);
gameEngineOne.scene.add(ground);
gameEngineOne.scene.add(child)
// gameEngineOne.scene.add(houliCube)

function update(dt) {
    //cube.transform.position.z -= dt;
    if (keys.ArrowUp) {
        cube.acceleration.position.z = -cube.accel.x;
    } else if (keys.ArrowDown) {
        cube.acceleration.position.z = cube.accel.x;
    } else {
        cube.acceleration.position.z = 0;
        cube.velocity.position.z *= .98;
    }
    if (keys.ArrowLeft) {
        cube.acceleration.position.x = -cube.accel.x;
    } else if (keys.ArrowRight) {
        cube.acceleration.position.x = cube.accel.x;
    } else {
        cube.acceleration.position.x = 0;
        cube.velocity.position.x *= .98;
    }
    if (keys.SpaceBar) {
        cube.acceleration.position.y = 10;
        keys.SpaceBar = false
    }
    if (keys.A) {
        cube.acceleration.rotation.y = cube.accel.y;
    } else if (keys.D) {
        cube.acceleration.rotation.y = -cube.accel.y;
    } else {
        cube.acceleration.rotation.y = 0;
        cube.velocity.rotation.y *= .98;
    }

    for (let i = 0; i < gameEngineOne.scene.gameObjects.length; i++) {
        const gameObject = gameEngineOne.scene.gameObjects[i]
        gameObject.velocity.position.add(gameObject.acceleration.position.clone().multiplyScalar(dt))
        gameObject.velocity.rotation.add(gameObject.acceleration.rotation.clone().multiplyScalar(dt))
        if (gameObject.name != "Ground") {
            if (gameObject.transform.position.y > 0) {
                gameObject.acceleration.position.y -= 10 * dt
            } else if (gameObject.transform.position.y < 0) {
                gameObject.acceleration.position.y = 0;
                gameObject.velocity.position.y = 0;
                gameObject.transform.position.y = 0;
            }
        }

        gameObject.transform.position.add(gameObject.velocity.position.clone().multiplyScalar(dt))
        gameObject.transform.rotation.add(gameObject.velocity.rotation.clone().multiplyScalar(dt))
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