export default class Mesh {

    constructor(gl, meshData, vertexLayout) {

        this.vao = gl.createVertexArray();

        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        this.indexCount = meshData.indices.length;

        // Check that indices fit in Uint16.
        for (const index of meshData.indices) {

            if (!Number.isInteger(index) || index < 0 || index > 65535) {
                throw new Error("Mesh contains an invalid or out-of-range index.");
            }

        }

        // ---------------------------------
        // Bind VAO
        // ---------------------------------

        gl.bindVertexArray(this.vao);

        // ---------------------------------
        // Vertex buffer
        // ---------------------------------

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.vertexBuffer
        );

        // MeshData handles converting the vertices
        // into the interleaved Float32Array.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            meshData.interleave(),
            gl.STATIC_DRAW
        );

        // Configure vertex attributes.
        // This configuration is stored in the VAO.
        vertexLayout.apply();

        // ---------------------------------
        // Index buffer
        // ---------------------------------

        gl.bindBuffer(
            gl.ELEMENT_ARRAY_BUFFER,
            this.indexBuffer
        );

        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(meshData.indices),
            gl.STATIC_DRAW
        );

        // ---------------------------------
        // Cleanup
        // ---------------------------------

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

    bind(gl) {

        gl.bindVertexArray(this.vao);

    }

    unbind(gl) {

        gl.bindVertexArray(null);

    }

    dispose(gl) {

        gl.deleteVertexArray(this.vao);
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.indexBuffer);

    }

}