export default class Vertex {

    constructor({
        position = [0, 0, 0],
        normal = [0, 0, 0],
        uv = [0, 0],
        tangent = [1, 0, 0],
        color = [1, 1, 1, 1]
    } = {}) {

        this.position = [...position];
        this.normal = [...normal];
        this.uv = [...uv];
        this.tangent = [...tangent];
        this.color = [...color];

    }

}