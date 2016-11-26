import canonizeColor from './canonizeColor';

export default function getColor(reqs) {
  let color = reqs.query.color;
  let rightColor;
  if (color === undefined || color === null) {
    rightColor = 'Invalid color';
  } else {
    rightColor = (color.charAt(0) === '#') ? canonizeColor('#', color.slice(1)) : canonizeColor(null, color);
    rightColor = (rightColor === -1) ? 'Invalid color' : `#${rightColor}`.toLowerCase();
  }

  return rightColor;
}
