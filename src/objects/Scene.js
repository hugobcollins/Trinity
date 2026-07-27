export default class Scene {

    constructor() {

        this.gameObjects = [];
        this.camera = null;
        
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