export default function canonizeColor(first, color) {
  console.log(`get: ${color}`);
  let result;
  const RE = /^[0-9ABCDEF]{1,6}$/ig;
  const RGB = /^\s*rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/ig;
  const HSL = /^\s*hsl\s*\((\s*\d{1,3})\s*,\s*(?:%20)?(\d{1,3})\s*[%]+\s*,\s*(?:%20)?(\d{1,3})\s*[%]+\s*\)$/ig;

  let regexpColor = color.trim().match(RE);
  let rgbColor = color.trim().match(RGB);
  let hslColor = color.trim().match(HSL);

  // console.log(regexpColor, rgbColor, hslColor);

  if (regexpColor === null) {
    if (rgbColor === null) {
      if (hslColor === null) {
        return -1;
      } else {
        // console.log(hslColor);
        hslColor = HSL.exec(color);
        result = '';
        if (first === '#') {
          return -1;
        }

        let hsl = analizeHslColor(hslColor[1], hslColor[2], hslColor[3]);
        console.log(hsl);
        if (hsl === -1) {
          return -1;
        }
        //
        // for (let i = 0; color < 3; i++) {
        //     result += numberToHex(hsl[i]);
        //     console.log(result);
        // }
        console.log(hsl);
        result = numberToHex(hsl[0]) + numberToHex(hsl[1]) + numberToHex(hsl[2]);
      }
    } else {
      rgbColor = RGB.exec(color);
      result = '';
      if (first === '#') {
        return -1;
      }

      for (let color = 1; color < 4; color++) {
        if (analizeRgbColor(rgbColor[color]) === -1) {
          return -1;
        } else {
          result += analizeRgbColor(rgbColor[color]);
        }
      }
    }
  } else {
    result = analizeColor(regexpColor);
  }

  console.log(`after operate: ${result}`);
  return result;
}

function analizeColor(localColor) {
  let result;
  switch (`${localColor}`.length) {
    case 0:
    case 1:
    case 2:
    case 4:
      result = -1;
      break;
    case 3:
      let first = `${localColor}`.charAt(0);
      let second = `${localColor}`.charAt(1);
      let third = `${localColor}`.charAt(2);
      result = `${first}${first}${second}${second}${third}${third}`;
      break;
    case 5:
      result = `${localColor}00`;
      break;
    case 6:
      result = localColor;
  }
  return result;
}

function analizeRgbColor(color) {
  return numberToHex(color);
}

function analizeHslColor(h, s, l) {
  console.log(h,s,l);
  let r, g, b;
  if (!isInLimit(h, 360) || !isInLimit(s, 100) || !isInLimit(l, 100)) {
    return -1;
  };
  h /= 360;
  s /= 100;
  l /= 100;
  // console.log(h,s,l);
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  // console.log(r,g,b);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function isInLimit(number, upLimit) {
  number = Number(number);
  console.log(number);
  // return (number < 0) || (number > upLimit);
  if ((number < 0) || (number > upLimit)) {
    console.log(false);
    return false;
  } else {
    console.log(true);
    return true;
  }
}

function numberToHex(number) {
  number = Number(number);
  // console.log(number);
  if (isInLimit(number, 255)) {
    return (number < 16) ? `0${number.toString(16)}` : `${number.toString(16)}`;
  } else {
    return -1;
  }
}
