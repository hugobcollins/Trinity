#version 300 es

uniform mat4 u_mvmatrix;
uniform mat4 u_mvpmatrix;

layout(location = 0) in vec3 a_position;

void main()
{
    gl_Position =
        u_mvpmatrix *
        vec4(a_position, 1.0);
}