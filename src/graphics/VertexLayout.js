export default class VertexLayout {

    constructor(gl) {

        this.gl = gl;

        // Every attribute is stored as floats.
        this.attributes = [

            {
                location: 0,
                size: 3
            },

            {
                location: 1,
                size: 3
            },

            {
                location: 2,
                size: 2
            },

            {
                location: 3,
                size: 3
            },

            {
                location: 4,
                size: 4
            }

        ];

        this.stride = 15 * Float32Array.BYTES_PER_ELEMENT;

    }

    apply() {

        const gl = this.gl;

        let offset = 0;

        for (const attribute of this.attributes) {

            gl.enableVertexAttribArray(attribute.location);

            gl.vertexAttribPointer(
                attribute.location,
                attribute.size,
                gl.FLOAT,
                false,
                this.stride,
                offset
            );

            offset +=
                attribute.size * Float32Array.BYTES_PER_ELEMENT;

        }

    }

}