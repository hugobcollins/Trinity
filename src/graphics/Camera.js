import Mat4 from "../math/Mat4.js";
import Transform from "../objects/Transform.js";

export default class Camera {

    constructor() {

        this.transform = new Transform([0, 5, 10], [-.2, 0, 0]);

    }

    getViewMatrix() {

        return Mat4
            .rotationZ(-this.transform.rotation.z)
            .multiply(
                Mat4.rotationX(-this.transform.rotation.x)
            )
            .multiply(
                Mat4.rotationY(-this.transform.rotation.y)
            )
            .multiply(
                Mat4.translation(
                    -this.transform.position.x,
                    -this.transform.position.y,
                    -this.transform.position.z)
            );

    }

}