#version 300 es

precision highp float;

// Values received from the vertex shader
in vec3 v_worldPosition;
in vec3 v_normal;
in vec4 v_color;

// Light properties
uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;

// Camera position
uniform vec3 u_cameraPosition;

// Lighting parameters
uniform float u_ambientStrength;
uniform float u_specularStrength;
uniform float u_shininess;

out vec4 fragColor;

void main() {

    // Normalize the interpolated normal.
    vec3 N = normalize(v_normal);

    // Direction from fragment to light.
    vec3 L = normalize(
        u_lightPosition - v_worldPosition
    );

    // Direction from fragment to camera.
    vec3 V = normalize(
        u_cameraPosition - v_worldPosition
    );

    // ---------------------------------
    // Ambient lighting
    // ---------------------------------

    vec3 ambient =
        u_ambientStrength * u_lightColor;

    // ---------------------------------
    // Lambertian diffuse lighting
    // ---------------------------------

    float diffuseStrength =
        max(dot(N, L), 0.0);

    vec3 diffuse =
        diffuseStrength * u_lightColor;

    // ---------------------------------
    // Phong specular lighting
    // ---------------------------------

    vec3 R = reflect(-L, N);

    float specularStrength =
        pow(
            max(dot(V, R), 0.0),
            u_shininess
        );

    // Don't calculate a specular highlight
    // on a surface facing away from the light.
    if (diffuseStrength <= 0.0) {
        specularStrength = 0.0;
    }

    vec3 specular =
        u_specularStrength *
        specularStrength *
        u_lightColor;

    // ---------------------------------
    // Combine lighting
    // ---------------------------------

    vec3 lighting = ambient + diffuse + specular;

    vec3 finalColor = lighting * v_color.rgb;

    fragColor = vec4(finalColor, v_color.a);

}