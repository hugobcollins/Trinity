export default class Mesh {

    constructor(gl, meshData) {

        this.gl = gl;

        this.vertexCount = meshData.positions.length / 3;

        this.indexCount = meshData.indices.length;

        this.vao = gl.createVertexArray();

        this.positionBuffer = gl.createBuffer();

        this.indexBuffer = gl.createBuffer();


        gl.bindVertexArray(this.vao);

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.positionBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(meshData.positions),
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
        
        gl.bindBuffer(
            gl.ELEMENT_ARRAY_BUFFER,
            this.indexBuffer
        );

        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(meshData.indices),
            gl.STATIC_DRAW
        );

        gl.bindVertexArray(null);

    }

    bind(gl) {
        gl.bindVertexArray(this.vao);
    }

}