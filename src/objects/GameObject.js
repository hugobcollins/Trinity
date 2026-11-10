import Transform from "./Transform.js";
import Vec3 from "./../math/Vec3.js"
import Vec2 from "./../math/Vec2.js"

export default class GameObject {

    constructor(mesh = null, texture = null, accel = [10, 1]) {

        this.name = "";

        this.transform = new Transform();

        this.velocity = new Transform();

        this.acceleration = new Transform();

        this.mesh = mesh;

        this.accel = new Vec2(...accel)

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