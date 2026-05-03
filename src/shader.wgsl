struct Uniforms {
    resolution: vec2<f32>,
    time: f32,
    padding: f32, // needed for alignment (important!)
};

@group(0) @binding(0)
var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(@builtin(vertex_index) i : u32)
     -> @builtin(position) vec4<f32> {

    var pos = array<vec2<f32>, 3>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>( 3.0, -1.0),
        vec2<f32>(-1.0,  3.0)
    );

    return vec4<f32>(pos[i], 0.0, 1.0);
}

fn length3(v: vec3<f32>) -> f32 {
    return sqrt(dot(v, v));
}

// Signed distance to a sphere
fn sphereSDF(p: vec3<f32>, r: f32) -> f32 {
    return length3(p) - r;
}

// Scene SDF
fn map(p: vec3<f32>) -> f32 {
    return sphereSDF(p - vec3<f32>(0.0, 0.0, -3.0), 1.0);
}

// Estimate normal
fn getNormal(p: vec3<f32>) -> vec3<f32> {
    let e = 0.001;

    let dx = map(p + vec3<f32>(e, 0.0, 0.0)) - map(p - vec3<f32>(e, 0.0, 0.0));
    let dy = map(p + vec3<f32>(0.0, e, 0.0)) - map(p - vec3<f32>(0.0, e, 0.0));
    let dz = map(p + vec3<f32>(0.0, 0.0, e)) - map(p - vec3<f32>(0.0, 0.0, e));

    return normalize(vec3<f32>(dx, dy, dz));
}

// Raymarch
fn raymarch(ro: vec3<f32>, rd: vec3<f32>) -> f32 {
    var t = 0.0;

    for (var i = 0; i < 100; i = i + 1) {
        let p = ro + rd * t;
        let d = map(p);

        if (d < 0.001) {
            return t;
        }

        t = t + d;

        if (t > 100.0) {
            break;
        }
    }

    return -1.0;
}

@fragment
fn fs_main(@builtin(position) coord : vec4<f32>)
     -> @location(0) vec4<f32> {

    let resolution = vec2<f32>(800.0, 600.0);
    let uv = (coord.xy - 0.5 * uniforms.resolution) / uniforms.resolution.y;

    // Camera
    let ro = vec3<f32>(0.0, 0.0, 0.0);
    let rd = normalize(vec3<f32>(uv, -1.0));

    let t = raymarch(ro, rd);

    if (t > 0.0) {
        let p = ro + rd * t;
        let n = getNormal(p);

        let lightDir = normalize(vec3<f32>(-1.0, 1.0, -1.0));
        let diff = max(dot(n, lightDir), 0.0);

        return vec4<f32>(diff, diff, diff, 1.0);
    }

    // background
    return vec4<f32>(0.1, 0.1, 0.15, 1.0);
}