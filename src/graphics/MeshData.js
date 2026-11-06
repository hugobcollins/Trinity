import Vertex from "./Vertex.js";

export default class MeshData {

    constructor() {

        this.vertices = [];
        this.indices = [];

    }

    addVertex(vertex) {

        if (!(vertex instanceof Vertex)) {
            vertex = new Vertex(vertex);
        }

        this.vertices.push(vertex);

        return this.vertices.length - 1;

    }

    addTriangle(a, b, c) {

        this.indices.push(a, b, c);

    }

    computeNormals() {

        // Reset all vertex normals.
        for (const vertex of this.vertices) {

            vertex.normal = [0, 0, 0];

        }

        const triangleCount = this.indices.length / 3;

        for (let i = 0; i < triangleCount; i++) {

            const indexA = this.indices[i * 3 + 0];
            const indexB = this.indices[i * 3 + 1];
            const indexC = this.indices[i * 3 + 2];

            const vertexA = this.vertices[indexA];
            const vertexB = this.vertices[indexB];
            const vertexC = this.vertices[indexC];

            if (!vertexA || !vertexB || !vertexC) {
                throw new Error("MeshData contains an invalid vertex index.");
            }

            const a = vertexA.position;
            const b = vertexB.position;
            const c = vertexC.position;

            // Calculate AB and AC.
            const abx = b[0] - a[0];
            const aby = b[1] - a[1];
            const abz = b[2] - a[2];

            const acx = c[0] - a[0];
            const acy = c[1] - a[1];
            const acz = c[2] - a[2];

            // Cross product: AB × AC.
            const nx = aby * acz - abz * acy;
            const ny = abz * acx - abx * acz;
            const nz = abx * acy - aby * acx;

            // Accumulate the face normal at each vertex.
            for (const vertex of [vertexA, vertexB, vertexC]) {

                vertex.normal[0] += nx;
                vertex.normal[1] += ny;
                vertex.normal[2] += nz;

            }

        }

        // Normalize the accumulated normals.
        for (const vertex of this.vertices) {

            const n = vertex.normal;

            const length = Math.sqrt(
                n[0] * n[0] +
                n[1] * n[1] +
                n[2] * n[2]
            );

            if (length > 0) {

                n[0] /= length;
                n[1] /= length;
                n[2] /= length;

            }

        }

    }

    interleave() {

        // 3 position + 3 normal + 2 UV
        // + 3 tangent + 4 color = 15 floats.
        const floatsPerVertex = 15;

        const result = new Float32Array(
            this.vertices.length * floatsPerVertex
        );

        let offset = 0;

        for (const vertex of this.vertices) {

            // Position
            result[offset++] = vertex.position[0];
            result[offset++] = vertex.position[1];
            result[offset++] = vertex.position[2];

            // Normal
            result[offset++] = vertex.normal[0];
            result[offset++] = vertex.normal[1];
            result[offset++] = vertex.normal[2];

            // UV
            result[offset++] = vertex.uv[0];
            result[offset++] = vertex.uv[1];

            // Tangent
            result[offset++] = vertex.tangent[0];
            result[offset++] = vertex.tangent[1];
            result[offset++] = vertex.tangent[2];

            // Color
            result[offset++] = vertex.color[0];
            result[offset++] = vertex.color[1];
            result[offset++] = vertex.color[2];
            result[offset++] = vertex.color[3];

        }

        return result;

    }

}