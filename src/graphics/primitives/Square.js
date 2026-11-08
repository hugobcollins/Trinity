import MeshData from "../MeshData.js";

function addFace(mesh, positions, tangent) {

    const start = mesh.vertices.length;

    const uvs = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
    ];

    for (let i = 0; i < 4; i++) {

        mesh.addVertex({

            position: positions[i],
            uv: uvs[i],
            tangent: tangent,
            color: [1, 1, 1, 1]

        });

    }

    mesh.addTriangle(start, start + 1, start + 2);
    mesh.addTriangle(start, start + 2, start + 3);

}

export function createSquareMeshData() {

    const mesh = new MeshData();

    const h = 1;

    addFace(mesh, [
        [-h, 0, h],
        [h, 0, h],
        [h, 0, -h],
        [-h, 0, -h]
    ], [1, 0, 0]);

    mesh.computeNormals()    

    return mesh;

}