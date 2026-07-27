import Mat4 from "../math/Mat4.js";

export default class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.rotation = 0;

    }

    getViewMatrix() {

        return Mat4
            .rotationZ(-this.rotation)
            .multiply(
                Mat4.translation(-this.x, -this.y, 0)
            );

    }

}