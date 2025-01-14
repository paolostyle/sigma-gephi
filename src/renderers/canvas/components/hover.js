/**
 * Sigma.js Canvas Renderer Hover Component
 * =========================================
 *
 * Function used by the canvas renderer to display a single node's hovered
 * state.
 */
import drawNode from './node';
import drawLabel from './label';

export default function drawHover(context, data, settings) {
  const size = settings.labelSize;
  const font = settings.labelFont;
  const weight = settings.labelWeight;

  context.font = `${weight} ${size}px ${font}`;

  // Then we draw the label background
  context.beginPath();
  context.fillStyle = '#fff';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 8;
  context.shadowColor = '#000';

  const textWidth = context.measureText(data.label).width;

  const x = Math.round(data.x - size / 2 - 2);
  const y = Math.round(data.y - size / 2 - 2);
  const w = Math.round(textWidth + size / 2 + data.size + 9);
  const h = Math.round(size + 4);
  const e = Math.round(size / 2 + 2);

  context.moveTo(x, y + e);
  context.moveTo(x, y + e);
  context.arcTo(x, y, x + e, y, e);
  context.lineTo(x + w, y);
  context.lineTo(x + w, y + h);
  context.lineTo(x + e, y + h);
  context.arcTo(x, y + h, x, y + h - e, e);
  context.lineTo(x, y + e);

  context.closePath();
  context.fill();

  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 0;

  // Then we need to draw the node
  drawNode(context, data);

  // And finally we draw the label
  drawLabel(context, data, { ...settings, labelColor: '#000' });
}
