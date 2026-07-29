import MeshData from "../MeshData.js";

export function createTriangleMeshData() {

    const meshdata = new MeshData();

    meshdata.positions = [
        -1, -1, 0,
         0,  1, 0,
         1, -1, 0
    ];

    meshdata.indices = [
        1,2,3
    ];

    return meshdata;

}