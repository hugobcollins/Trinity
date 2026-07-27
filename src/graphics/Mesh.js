export default class Mesh {

    constructor(gl, vertices) {

        this.gl = gl;

        this.vertexCount = vertices.length / 3;

        this.vao = gl.createVertexArray();

        this.positionBuffer = gl.createBuffer();

        gl.bindVertexArray(this.vao);

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.positionBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(0);

        gl.vertexAttribPointer(
            0,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.bindVertexArray(null);

    }

    bind(gl) {
        gl.bindVertexArray(this.vao);
    }

}