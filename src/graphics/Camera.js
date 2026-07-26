import Mat3 from "../math/Mat3.js";

export default class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.rotation = 0;

    }

    getViewMatrix() {

        return Mat3
            .rotation(-this.rotation)
            .multiply(
                Mat3.translation(-this.x, -this.y)
            );

    }

}