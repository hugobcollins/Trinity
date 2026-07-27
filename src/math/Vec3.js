export default class Vec3 {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Vec3(
            this.x,
            this.y,
            this.z
        );
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    length() {
        return Math.sqrt(
            this.x*this.x +
            this.y*this.y +
            this.z*this.z
        );
    }

    normalize() {
        const len = this.length();
        if (len > 0) {
            this.multiplyScalar(1 / len);
        }
        return this;
    }

    dot(other) {
        return (
            this.x * other.x +
            this.y * other.y +
            this.z * other.z
        );
    }

    cross(other) {
        return new Vec3(
            this.y * other.z -
            this.z * other.y,

            this.z * other.x -
            this.x * other.z,

            this.x * other.y -
            this.y * other.x
        );
    }

    

}