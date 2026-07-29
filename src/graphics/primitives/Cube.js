import MeshData from "../MeshData.js";

export function createCubeMeshData() {

    const meshdata = new MeshData();

    meshdata.positions = [
       -1,-1,-1,
        1,-1,-1,
        1, 1,-1,
       -1, 1,-1,
       -1,-1, 1,
        1,-1, 1,
        1, 1, 1,
       -1, 1, 1
    ];

    meshdata.indices = [
        4,5,6,
        4,6,7,
    
        1,0,3,
        1,3,2,
    
        0,4,7,
        0,7,3,
    
        5,1,2,
        5,2,6,
    
        3,7,6,
        3,6,2,
    
        0,1,5,
        0,5,4
    ];

    return meshdata;

}