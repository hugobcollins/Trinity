export default class Vec2 {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2(
            this.x,
            this.y,
        );
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    length() {
        return Math.sqrt(
            this.x*this.x +
            this.y*this.y 
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
            this.y * other.y
        );
    }

    cross(other) {
        return new Vec3(
            this.x * other.y -
            this.y * other.x
        );
    }

    

}