import Transform from "./Transform.js";

export default class GameObject {

    constructor(mesh = null, texture = null) {

        this.name = "";

        this.transform = new Transform();

        this.mesh = mesh;

        this.color = [
            Math.random(),
            Math.random(),
            Math.random(),
            1
        ];

        this.texture = texture

    }

}