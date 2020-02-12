/* eslint-disable no-alert */
/* eslint-disable no-undef */

// hex code random color
function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

// rgb random color
function differentColor() {
  return `rgb(
    ${Math.floor(256 * Math.random())},
    ${Math.floor(256 * Math.random())},
    ${Math.floor(256 * Math.random())})`;
}

// hue saturation lightness random color
function randomHSL(s, l) {
  const h = Math.floor(Math.random() * 360)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const game = new Game();
game.draw();
