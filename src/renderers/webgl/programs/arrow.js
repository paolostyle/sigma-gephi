/**
 * Sigma.js WebGL Renderer Arrow Program
 * ======================================
 *
 * Program rendering direction arrows as a simple triangle.
 */
import Program from './program';
import { floatColor } from '../utils';
import vertexShaderSource from '../shaders/arrow.vert.glsl';
import fragmentShaderSource from '../shaders/arrow.frag.glsl';

const POINTS = 3;
const ATTRIBUTES = 10;

export default class ArrowProgram extends Program {
  constructor(gl) {
    super(gl, vertexShaderSource, fragmentShaderSource);

    // Binding context
    this.gl = gl;

    // Array data
    this.array = null;

    // Initializing buffers
    this.buffer = gl.createBuffer();

    // Locations
    this.positionLocation = gl.getAttribLocation(this.program, 'a_position');
    this.normalLocation = gl.getAttribLocation(this.program, 'a_normal');
    this.thicknessLocation = gl.getAttribLocation(this.program, 'a_thickness');
    this.radiusLocation = gl.getAttribLocation(this.program, 'a_radius');
    this.colorLocation = gl.getAttribLocation(this.program, 'a_color');
    this.barycentricLocation = gl.getAttribLocation(this.program, 'a_barycentric');
    this.resolutionLocation = gl.getUniformLocation(this.program, 'u_resolution');
    this.ratioLocation = gl.getUniformLocation(this.program, 'u_ratio');
    this.matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');
    this.scaleLocation = gl.getUniformLocation(this.program, 'u_scale');

    this.bind();
  }

  bind() {
    const { gl } = this;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    // Bindings
    gl.enableVertexAttribArray(this.positionLocation);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.enableVertexAttribArray(this.thicknessLocation);
    gl.enableVertexAttribArray(this.radiusLocation);
    gl.enableVertexAttribArray(this.colorLocation);
    gl.enableVertexAttribArray(this.barycentricLocation);

    gl.vertexAttribPointer(
      this.positionLocation,
      2,
      gl.FLOAT,
      false,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.vertexAttribPointer(
      this.normalLocation,
      2,
      gl.FLOAT,
      false,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      8
    );
    gl.vertexAttribPointer(
      this.thicknessLocation,
      1,
      gl.FLOAT,
      false,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      16
    );
    gl.vertexAttribPointer(
      this.radiusLocation,
      1,
      gl.FLOAT,
      false,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      20
    );
    gl.vertexAttribPointer(
      this.colorLocation,
      4,
      gl.UNSIGNED_BYTE,
      true,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      24
    );

    // TODO: maybe we can optimize here by packing this in a bit mask
    gl.vertexAttribPointer(
      this.barycentricLocation,
      3,
      gl.FLOAT,
      false,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      28
    );
  }

  allocate(capacity) {
    this.array = new Float32Array(POINTS * ATTRIBUTES * capacity);
  }

  process(sourceData, targetData, data, offset) {
    if (sourceData.hidden || targetData.hidden || data.hidden) {
      for (let l = i + POINTS * ATTRIBUTES; i < l; i++) this.array[i] = 0;
    }

    const thickness = Math.max((data.size || 1) * 2.5, 5);
    const radius = targetData.size || 1;
    const x1 = sourceData.x;
    const y1 = sourceData.y;
    const x2 = targetData.x;
    const y2 = targetData.y;
    const color = floatColor(data.color);

    // Computing normals
    const dx = x2 - x1;
    const dy = y2 - y1;

    let len = dx * dx + dy * dy;
    let n1 = 0;
    let n2 = 0;

    if (len) {
      len = 1 / Math.sqrt(len);

      n1 = -dy * len;
      n2 = dx * len;
    }

    let i = POINTS * ATTRIBUTES * offset;

    const { array } = this;

    // First point
    array[i++] = x2;
    array[i++] = y2;
    array[i++] = -n1;
    array[i++] = -n2;
    array[i++] = thickness;
    array[i++] = radius;
    array[i++] = color;
    array[i++] = 1;
    array[i++] = 0;
    array[i++] = 0;

    // Second point
    array[i++] = x2;
    array[i++] = y2;
    array[i++] = -n1;
    array[i++] = -n2;
    array[i++] = thickness;
    array[i++] = radius;
    array[i++] = color;
    array[i++] = 0;
    array[i++] = 1;
    array[i++] = 0;

    // Third point
    array[i++] = x2;
    array[i++] = y2;
    array[i++] = -n1;
    array[i++] = -n2;
    array[i++] = thickness;
    array[i++] = radius;
    array[i++] = color;
    array[i++] = 0;
    array[i++] = 0;
    array[i] = 1;
  }

  bufferData() {
    const { gl } = this;

    // Vertices data
    gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
  }

  render(params) {
    const { gl } = this;

    const { program } = this;
    gl.useProgram(program);

    // Binding uniforms
    gl.uniform2f(this.resolutionLocation, params.width, params.height);
    gl.uniform1f(this.ratioLocation, params.ratio);

    gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);

    gl.uniform1f(this.scaleLocation, params.scalingRatio);

    // Drawing:
    gl.drawArrays(gl.TRIANGLES, 0, this.array.length / ATTRIBUTES);
  }
}
