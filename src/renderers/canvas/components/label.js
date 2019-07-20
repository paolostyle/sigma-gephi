/**
 * Sigma.js Canvas Renderer Label Component
 * =========================================
 *
 * Function used by the canvas renderer to display a single node's label.
 */
export default function drawLabel(context, data, settings) {
  const size = settings.labelSize;
  const font = settings.labelFont;
  const weight = settings.labelWeight;
  const color = settings.labelColor;

  context.fillStyle = color;
  context.font = `${weight} ${size}px ${font}`;

  context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
}
