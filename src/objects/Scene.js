export default class Scene {

    constructor(camera) {

        this.gameObjects = [];
        this.camera = camera;
        
    }

    add(gameObject) {
        this.gameObjects.push(gameObject);
        return gameObject;
    }

    remove(gameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index >= 0) {
            this.gameObjects.splice(index, 1);
        }
    }

}