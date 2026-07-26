#version 300 es

uniform mat3 u_model;
uniform mat3 u_view;
uniform mat3 u_projection;

in vec2 a_position;

void main() {

    vec3 position =
        u_projection *
        u_view *
        u_model *
        vec3(a_position, 1.0);

    gl_Position = vec4(position.xy, 0.0, 1.0);
}