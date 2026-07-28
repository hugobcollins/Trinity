import Mat4 from "../math/Mat4.js";
import Transform from "../objects/Transform.js";

export default class Camera {

    constructor() {

        this.transform = new Transform();

    }

    getViewMatrix() {

        return Mat4
            .rotationZ(-this.transform.rotation.z)
            .multiply(
                Mat4.translation(
                    -this.transform.position.x,
                    -this.transform.position.y,
                    -this.transform.position.z)
            );

    }

}