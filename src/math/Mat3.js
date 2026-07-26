export default class Mat3 {

    constructor(values = null) {

        if (values) {
            this.m = values;
            } else {
            this.m = [
                1,0,0,
                0,1,0,
                0,0,1
            ];
        }
    }

    static orthographic(width, height) {
        return new Mat3([
            2 / width, 0,          0,
            0,        -2 / height, 0,
           -1,         1,          1
        ]);
    }

    static index(row, col) {
        return col * 3 + row;
    }

    static translation(x, y){
        return new Mat3([
            1,0,0,
            0,1,0,
            x,y,1
        ]);
    }

    static scale(x, y){
        return new Mat3([
            x,0,0,
            0,y,0,
            0,0,1
        ]);
    }

    static rotation(angle){
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat3([
             c, s, 0,
            -s, c, 0,
             0, 0, 1
        ]);
    }

    multiply(other) {

        const result = new Array(9).fill(0);
        const index = Mat3.index;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum +=
                        this.m[index(row, k)] *
                        other.m[index(k, col)];
                }
                result[index(row, col)] = sum;
            }
        }
        return new Mat3(result);
    }

}