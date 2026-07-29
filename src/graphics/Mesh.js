export default class Mesh {

    constructor(gl, vertices, indices = null) {

        this.gl = gl;

        this.vertexCount = vertices.length / 3;

        this.indexCount = 0;

        this.vao = gl.createVertexArray();

        this.positionBuffer = gl.createBuffer();

        this.indexBuffer = null;


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

        if (indices) {

            this.indexBuffer = gl.createBuffer();
            
            gl.bindBuffer(
                gl.ELEMENT_ARRAY_BUFFER,
                this.indexBuffer
            );

            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(indices),
                gl.STATIC_DRAW
            );

            this.indexCount = indices.length;
        }

        gl.bindVertexArray(null);

    }

    bind(gl) {
        gl.bindVertexArray(this.vao);
    }

}