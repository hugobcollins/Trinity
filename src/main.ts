import shaderCode from "./shader.wgsl?raw";
const canvas = document.getElementById("c") as HTMLCanvasElement;

console.log(shaderCode);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.configure({
    device,
    format,
  });
}

window.addEventListener("resize", resizeCanvas);

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas not found");
}

if (!navigator.gpu) {
  document.body.innerHTML = "WebGPU not supported";
  throw new Error("No WebGPU");
}

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

const format = navigator.gpu.getPreferredCanvasFormat();

context.configure({
  device,
  format,
});

resizeCanvas();

const uniformBuffer = device.createBuffer({
  size: 16, // 4 floats = 16 bytes
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

const data = new Float32Array([
  canvas.width,
  canvas.height,
  0.0, // time
  0.0, // padding
]);

device.queue.writeBuffer(uniformBuffer, 0, data);

const pipeline = device.createRenderPipeline({
  layout: "auto",
  vertex: {
    module: device.createShaderModule({ code: shaderCode }),
    entryPoint: "vs_main",
  },
  fragment: {
    module: device.createShaderModule({ code: shaderCode }),
    entryPoint: "fs_main",
    targets: [{ format }],
  },
  primitive: {
    topology: "triangle-list",
  },
});

const bindGroup = device.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 0,
      resource: { buffer: uniformBuffer },
    },
  ],
});

let time = 0;

function frame() {
  time += 0.016;

  const data = new Float32Array([
    canvas.width,
    canvas.height,
    time,
    0.0
  ]);

  device.queue.writeBuffer(uniformBuffer, 0, data);
  const encoder = device.createCommandEncoder();
  const view = context.getCurrentTexture().createView();
  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view,
      loadOp: "clear",
      storeOp: "store",
    }],
  });
  pass.setBindGroup(0, bindGroup);
  pass.setPipeline(pipeline);
  pass.draw(6);
  pass.end();

  device.queue.submit([encoder.finish()]);
  requestAnimationFrame(frame);
}

frame();