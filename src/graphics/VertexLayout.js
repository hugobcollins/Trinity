export default class VertexLayout {

    constructor(attributes) {
        this.attributes = attributes;

        let stride = 0;

        for (const attribute of attributes) {
            stride = Math.max(
                stride,
                attribute.offset + attribute.size * 4
            );
        }

        this.stride = stride;
    }

    apply(gl) {
        for (const attribute of this.attributes) {

            gl.enableVertexAttribArray(attribute.location);

            gl.vertexAttribPointer(
                attribute.location,
                attribute.size,
                attribute.type,
                attribute.normalized,
                this.stride,
                attribute.offset
            );
        }
    }
}