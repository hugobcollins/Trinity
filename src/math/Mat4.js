export default class Mat4 {

    constructor(values = null) {
        if (values) {
            this.m = new Float32Array(values);
        } else {
            this.m = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }
    }

    static index(row, col) {
        return col * 4 + row;
    }

    static identity() {
        return new Mat4();
    }

    static translation(x, y, z) {
        return new Mat4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]);
    }

    static scale(x, y, z) {
        return new Mat4([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    static rotationX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]);
    }

    static rotationY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ]);
    }

    static rotationZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    multiply(other) {
        const result = new Array(16).fill(0);
        const index = Mat4.index;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum +=
                        this.m[index(row, k)] *
                        other.m[index(k, col)];
                }
                result[index(row, col)] = sum;
            }
        }
        return new Mat4(result);
    }

    static orthographic(width, height) {
        return new Mat4([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 0,
            -1, 1, 0, 1
        ]);
    }

    static perspective(fov, aspect, near, far) {
        const f = 1 / Math.tan(fov / 2);
        return new Mat4([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), -1,
            0, 0, (2 * far * near) / (near - far), 0
        ]);
    }

    normalMatrix() {

        const index = Mat4.index;

        const m00 = this.m[index(0, 0)], m01 = this.m[index(0, 1)], m02 = this.m[index(0, 2)];
        const m10 = this.m[index(1, 0)], m11 = this.m[index(1, 1)], m12 = this.m[index(1, 2)];
        const m20 = this.m[index(2, 0)], m21 = this.m[index(2, 1)], m22 = this.m[index(2, 2)];

        const det = m00 * (m11 * m22 - m21 * m12) -
            m10 * (m01 * m22 - m21 * m02) +
            m20 * (m01 * m12 - m11 * m02);

        if (det === 0) {
            console.warn("Matrix is not invertible! Returning standard 3x3 identity.");
            return new Float32Array([
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ]);
        }

        const invDet = 1.0 / det;

        return new Float32Array([
            (m11 * m22 - m21 * m12) * invDet,
            (m20 * m12 - m10 * m22) * invDet,
            (m10 * m21 - m20 * m11) * invDet,
            (m21 * m02 - m01 * m22) * invDet,
            (m00 * m22 - m20 * m02) * invDet,
            (m20 * m01 - m00 * m21) * invDet,
            (m01 * m12 - m11 * m02) * invDet,
            (m10 * m02 - m00 * m12) * invDet,
            (m00 * m11 - m10 * m01) * invDet
        ]);
    }
}