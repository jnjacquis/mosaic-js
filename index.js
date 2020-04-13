import { drawFilledTriangle, drawGridWithTriangle, drawGridWithSquare } from './lib/mosaic.js';

let colorSchemeRed = [
    'hsl(0, 100%, 95%)',
    'hsl(0, 100%, 90%)',
    'hsl(0, 100%, 85%)',
    'hsl(0, 100%, 80%)',
    'hsl(0, 100%, 75%)',
    'hsl(0, 100%, 70%)',
    'hsl(0, 100%, 65%)',
    'hsl(0, 100%, 60%)',
    'hsl(0, 100%, 55%)',
    'hsl(0, 100%, 50%)',
    'hsl(0, 100%, 45%)',
    'hsl(0, 100%, 40%)'
];

let randomColor = function(colors) {
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

let notPrevious = function(previous) {
    var color = randomColor(colorSchemeRed);
    while (color == previous) {
        color = randomColor(colorSchemeRed);
    }
    return color;
}
console.log(randomColor(colorSchemeRed));

var canvasTriangle = document.getElementById('canvas-triangle');
var ctxTriangle = canvasTriangle.getContext("2d");
drawFilledTriangle(ctxTriangle, 150, 150, 100, 100, 'blue', -90 * Math.PI / 180);

var canvasGridTriangle = document.getElementById('canvas-grid-triangle');
var ctxGridTriangle = canvasGridTriangle.getContext("2d");
drawGridWithTriangle(ctxGridTriangle, 4, 4, 0, 0, colorSchemeRed, notPrevious, 0);

var canvasGridSquareHorizontal = document.getElementById('canvas-grid-square-horizontal');
var ctxGridSquareHorizontal = canvasGridSquareHorizontal.getContext("2d");
drawGridWithSquare(ctxGridSquareHorizontal, 40, 40, colorSchemeRed, 0);

var canvasGridSquareRotated = document.getElementById('canvas-grid-square-rotated-45');
var ctxGridSquareRotated = canvasGridSquareRotated.getContext("2d");
drawGridWithSquare(ctxGridSquareRotated, 40, 56, colorSchemeRed, 45 * Math.PI / 180);
