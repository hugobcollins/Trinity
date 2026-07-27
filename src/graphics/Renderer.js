import Camera from "./Camera.js";
import Mat4 from "../math/Mat4.js";

export default class Renderer {

    constructor(gl, program, uniforms) {

        this.gl = gl;
        this.program = program;
        this.uniforms = uniforms;
        this.camera = null;

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

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

    }

    draw(gameObject, view) {

        const gl = this.gl;

        const model = gameObject.transform.getMatrix();

        const projection =
            Mat4.perspective(
                Math.PI / 3,
                gl.canvas.width / gl.canvas.height,
                0.1,
                1000
            );

        gl.uniformMatrix4fv(
            this.uniforms.model,
            false,
            model.m
        );

        gl.uniformMatrix4fv(
            this.uniforms.view,
            false,
            view.m
        );

        gl.uniformMatrix4fv(
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

    render(scene) {

        const gl = this.gl;
        this.clear();
        const view = scene.camera.getViewMatrix();
        gl.useProgram(this.program);

        for (const object of scene.gameObjects) {
            this.draw(object, view);
        }
    }

}