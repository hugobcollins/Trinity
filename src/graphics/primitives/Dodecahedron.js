import MeshData from "../MeshData.js";

export function createDodecahedronMeshData() {

    const meshdata = new MeshData();

    const phi = (1.0 + Math.sqrt(5.0)) / 2.0;

    meshdata.positions = [
        -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1,
        1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1,
        0, -1 / phi, -phi, 0, -1 / phi, phi, 0, 1 / phi, -phi, 0, 1 / phi, phi,
        -1 / phi, -phi, 0, -1 / phi, phi, 0, 1 / phi, -phi, 0, 1 / phi, phi, 0,
        -phi, 0, -1 / phi, -phi, 0, 1 / phi, phi, 0, -1 / phi, phi, 0, 1 / phi
    ];

    meshdata.indices = [
        3, 11, 7, 3, 7, 19, 3, 19, 15,
        7, 11, 1, 7, 1, 14, 7, 14, 5,
        1, 9, 13, 1, 13, 15, 1, 15, 3,
        9, 11, 3, 9, 3, 15, 9, 15, 13,
        13, 12, 0, 13, 0, 14, 13, 14, 1,
        0, 8, 10, 0, 10, 2, 0, 2, 12,
        8, 11, 9, 8, 9, 1, 8, 1, 0,
        10, 11, 7, 10, 7, 6, 10, 6, 2,
        6, 7, 5, 6, 5, 14, 6, 14, 0,
        2, 4, 8, 2, 8, 0, 2, 0, 12,
        4, 11, 9, 4, 9, 13, 4, 13, 12,
        5, 11, 3, 5, 3, 19, 5, 19, 4
    ];

    return meshdata;

}