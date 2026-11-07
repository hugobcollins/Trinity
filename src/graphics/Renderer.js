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

        var u_model = model;

        var u_view = view;

        var u_projection = projection;

        gl.uniformMatrix4fv(
            this.uniforms.model,
            false,
            u_model.m
        );

        gl.uniformMatrix4fv(
            this.uniforms.view,
            false,
            u_view.m
        );

        gl.uniformMatrix4fv(
            this.uniforms.projection,
            false,
            u_projection.m
        );

        gl.uniform3f(
            this.uniforms.lightPosition,
            2.0, 3.0, 2.0
        );

        gl.uniform3f(
            this.uniforms.lightColor,
            1.0, 1.0, 1.0
        );

        gl.uniform3f(
            this.uniforms.cameraPosition,
            this.camera.transform.position.x,
            this.camera.transform.position.y,
            this.camera.transform.position.z
        );

        gl.uniform1f(
            this.uniforms.ambientStrength,
            0.15
        );

        gl.uniform1f(
            this.uniforms.specularStrength,
            0.5
        );

        gl.uniform1f(
            this.uniforms.shininess,
            32.0
        );

        gl.uniform1i(
            this.uniforms.diffuseTexture,
            0
        );

        gameObject.texture.bind(0);

        gameObject.mesh.bind(gl);

        gl.drawElements(
            gl.TRIANGLES,
            gameObject.mesh.indexCount,
            gl.UNSIGNED_SHORT,
            0
        );

        gameObject.mesh.unbind(gl);

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