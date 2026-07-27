import Vec3 from "../math/Vec3.js";
import Mat4 from "../math/Mat4.js";

export default class Transform {

    constructor() {

        this.position = new Vec3();

        this.rotation = new Vec3();

        this.scale = new Vec3(1, 1, 1);

    }

    getMatrix() {

        return Mat4.translation(
            this.position.x,
            this.position.y,
            this.position.z
        )
        .multiply(
            Mat4.rotationX(this.rotation.x)
        )
        .multiply(
            Mat4.rotationY(this.rotation.y)
        )
        .multiply(
            Mat4.rotationZ(this.rotation.z)
        )
        .multiply(
            Mat4.scale(
                this.scale.x,
                this.scale.y,
                this.scale.z
            )
        );

    }

}