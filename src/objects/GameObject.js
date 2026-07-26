import Mat3 from "../math/Mat3.js";

export default class GameObject {

    constructor(mesh) {

        this.mesh = mesh;

        this.x = 0;
        this.y = 0;

        this.rotation = 0;

        this.scale = 1;

        this.color = [
            Math.random(),
            Math.random(),
            Math.random(),
            1
        ];

    }

    getModelMatrix() {

        return Mat3.translation(this.x, this.y)
            .multiply(Mat3.rotation(this.rotation))
            .multiply(Mat3.scale(this.scale, this.scale));

    }

}