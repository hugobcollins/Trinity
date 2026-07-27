export default class Mat4 {

    constructor(values = null) {
        if (values) {
            this.m = new Float32Array(values);
        } else {
            this.m = new Float32Array([
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1
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
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            x,y,z,1
        ]);
    }

    static scale(x, y, z) {
        return new Mat4([
            x,0,0,0,
            0,y,0,0,
            0,0,z,0,
            0,0,0,1
        ]);
    }

    static rotationX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            1,0,0,0,
            0,c,s,0,
            0,-s,c,0,
            0,0,0,1
        ]);
    }

    static rotationY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            c,0,-s,0,
            0,1,0,0,
            s,0,c,0,
            0,0,0,1
        ]);
    }

    static rotationZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat4([
            c,s,0,0,
            -s,c,0,0,
            0,0,1,0,
            0,0,0,1
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
            2 / width, 0,           0, 0,
            0,        -2 / height,  0, 0,
            0,         0,           1, 0,
           -1,         1,           0, 1
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
    

}