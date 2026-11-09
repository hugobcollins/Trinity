import Transform from "./Transform.js";
import Vec3 from "./../math/Vec3.js"

export default class GameObject {

    constructor(mesh = null, texture = null, speed = 10) {

        this.name = "";

        this.transform = new Transform();

        this.mesh = mesh;

        this.acceleration = new Vec3(0, 0, 0)

        this.velocity = new Vec3(0, 0, 0)

        this.speed = speed

        this.color = [
            Math.random(),
            Math.random(),
            Math.random(),
            1
        ];

        this.texture = texture

        this.parent = null;

        this.children = [];

    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    getWorldMatrix() {
        const localMatrix = this.transform.getMatrix()

        if (this.parent) {
            return this.parent.getWorldMatrix().multiply(localMatrix);
        }

        return localMatrix;
    }

}