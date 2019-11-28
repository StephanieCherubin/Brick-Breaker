/* eslint-disable no-alert */
/* eslint-disable no-undef */

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

function differentColor() {
  return `rgb(
    ${Math.floor(256 * Math.random())},
    ${Math.floor(256 * Math.random())},
    ${Math.floor(256 * Math.random())})`;
}

const game = new Game();
game.draw();
