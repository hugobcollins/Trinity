export default class Texture {

    constructor(gl, imageUrl) {

        this.gl = gl;

        this.texture = gl.createTexture();

        // Bind the texture.
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Temporary white pixel while the image loads.
        const pixel = new Uint8Array([255, 255, 255, 255]);

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixel
        );

        gl.generateMipmap(gl.TEXTURE_2D);

        // Texture filtering.
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            gl.LINEAR_MIPMAP_LINEAR
        );

        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MAG_FILTER,
            gl.LINEAR
        );

        // Load the actual image.
        const image = new Image();

        image.onload = () => {

            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            // Flip image vertically to match our UV convention.
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );

            gl.generateMipmap(gl.TEXTURE_2D);

            gl.bindTexture(gl.TEXTURE_2D, null);

        };

        image.onerror = () => {
            console.error("Failed to load texture:", imageUrl);
        };

        image.src = imageUrl;

        gl.bindTexture(gl.TEXTURE_2D, null);

    }

    bind(unit = 0) {

        const gl = this.gl;

        gl.activeTexture(gl.TEXTURE0 + unit);

        gl.bindTexture(
            gl.TEXTURE_2D,
            this.texture
        );

    }

    unbind() {

        this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            null
        );

    }

    dispose() {

        this.gl.deleteTexture(this.texture);

    }

}