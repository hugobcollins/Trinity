#version 300 es

precision highp float;

// Vertex attributes
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 2) in vec2 a_uv;
layout(location = 4) in vec4 a_color;

// Matrices
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

// Values passed to the fragment shader
out vec3 v_worldPosition;
out vec3 v_normal;
out vec4 v_color;
out vec2 v_uv;

void main() {

    // Transform position into world space.
    vec4 worldPosition =
        u_model * vec4(a_position, 1.0);

    v_worldPosition = worldPosition.xyz;

    // Transform normal into world space.
    mat3 normalMatrix =
        mat3(transpose(inverse(u_model)));

    v_normal = normalize(normalMatrix * a_normal);

    // Pass vertex color along.
    v_color = a_color;

    v_uv = a_uv;

    // Transform position into clip space.
    gl_Position =
        u_projection *
        u_view *
        worldPosition;

}