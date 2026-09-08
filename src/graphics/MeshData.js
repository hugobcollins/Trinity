export default class MeshData {

    constructor() {

        this.positions = [];

        this.normals = [];
        
        this.uvs = [];

        this.tangents = [];

        this.colors = [];

        this.indices = [];

    }

    computeNormals() {

        const vertexCount = this.positions.length / 3;

        for (let i = 0; i < vertexCount; i++) {

            this.normals[i * 3 + 0] = 0.0;
            this.normals[i * 3 + 1] = 0.0;
            this.normals[i * 3 + 2] = 0.0;

        }

        const triangleCount = this.indices.length / 3;

        for (let i = 0; i < triangleCount; i++) {

            const indexA = this.indices[i * 3 + 0];
            const indexB = this.indices[i * 3 + 1];
            const indexC = this.indices[i * 3 + 2];

            const ax = this.positions[indexA * 3 + 0];
            const ay = this.positions[indexA * 3 + 1];
            const az = this.positions[indexA * 3 + 2];

            const bx = this.positions[indexB * 3 + 0];
            const by = this.positions[indexB * 3 + 1];
            const bz = this.positions[indexB * 3 + 2];

            const cx = this.positions[indexC * 3 + 0];
            const cy = this.positions[indexC * 3 + 1];
            const cz = this.positions[indexC * 3 + 2];

            const abx = bx - ax;
            const aby = by - ay;
            const abz = bz - az;

            const acx = cx - ax;
            const acy = cy - ay;
            const acz = cz - az;

            const nx = aby * acz - abz * acy;
            const ny = abz * acx - abx * acz;
            const nz = abx * acy - aby * acx;

            this.normals[indexA * 3 + 0] += nx;
            this.normals[indexA * 3 + 1] += ny;
            this.normals[indexA * 3 + 2] += nz;

            this.normals[indexB * 3 + 0] += nx;
            this.normals[indexB * 3 + 1] += ny;
            this.normals[indexB * 3 + 2] += nz;

            this.normals[indexC * 3 + 0] += nx;
            this.normals[indexC * 3 + 1] += ny;
            this.normals[indexC * 3 + 2] += nz;

        }

        for (let i = 0; i < vertexCount; i++) {

            const nx = this.normals[i * 3 + 0];
            const ny = this.normals[i * 3 + 1];
            const nz = this.normals[i * 3 + 2];

            const length = Math.sqrt(nx * nx + ny * ny + nz * nz);

            this.normals[i * 3 + 0] = nx / length;
            this.normals[i * 3 + 1] = ny / length;
            this.normals[i * 3 + 2] = nz / length;

        }

    }

    interleave() {

        const result = [];

        const vertexCount = this.positions.length / 3;

        for (let i = 0; i < vertexCount; i++) {

            // Position
            result.push(
                this.positions[i * 3 + 0],
                this.positions[i * 3 + 1],
                this.positions[i * 3 + 2]
            );

            // Normal
            result.push(
                this.normals[i * 3 + 0],
                this.normals[i * 3 + 1],
                this.normals[i * 3 + 2]
            );

            // UV
            result.push(
                this.uvs[i * 2 + 0],
                this.uvs[i * 2 + 1]
            );

            result.push(
                this.tangents[i * 3 + 0],
                this.tangents[i * 3 + 1],
                this.tangents[i * 3 + 2]
            );

            result.push(
                this.colors[i * 4 + 0],
                this.colors[i * 4 + 1],
                this.colors[i * 4 + 2],
                this.colors[i * 4 + 3]
            );
        }

        return new Float32Array(result);
    }

}