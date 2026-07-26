import Camera from "./Camera.js";
import Mat3 from "../math/Mat3.js";

export default class Renderer {

    constructor(gl, program, uniforms) {

        this.gl = gl;
        this.program = program;
        this.uniforms = uniforms;
        this.camera = new Camera();

    }

    clear() {

        const gl = this.gl;

        gl.viewport(
            0,
            0,
            gl.canvas.width,
            gl.canvas.height
        );

        gl.clearColor(
            0.17,
            0.24,
            0.31,
            1.0
        );

        gl.clear(gl.COLOR_BUFFER_BIT);

    }

    draw(gameObject) {

        const gl = this.gl;

        const model = gameObject.getModelMatrix();

        //console.log(model.m);

        const view = this.camera.getViewMatrix();

        const projection =
            Mat3.orthographic(
                gl.canvas.width,
                gl.canvas.height
            );

        gl.uniformMatrix3fv(
            this.uniforms.model,
            false,
            model.m
        );

        gl.uniformMatrix3fv(
            this.uniforms.view,
            false,
            view.m
        );

        gl.uniformMatrix3fv(
            this.uniforms.projection,
            false,
            projection.m
        );

        gameObject.mesh.bind(gl);

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            gameObject.mesh.vertexCount
        );

    }

    render(objects) {

        const gl = this.gl;

        this.clear();

        gl.useProgram(this.program);

        for (const object of objects) {

            this.draw(object);

        }

    }

}