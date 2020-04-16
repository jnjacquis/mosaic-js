import { drawFilledTriangle, drawGridWithTriangle, drawGridWithSquare, drawFilledHexagon, drawGridWithHexagon } from './lib/mosaic.js';

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
drawFilledHexagon(ctxTriangle, 40, 60, 32, 'red', 90 * Math.PI / 180);

var canvasGridTriangleHorizontal = document.getElementById('canvas-grid-triangle-horizontal');
var ctxGridTriangleHorizontal = canvasGridTriangleHorizontal.getContext("2d");
drawGridWithTriangle(ctxGridTriangleHorizontal, 40, 40, colorSchemeRed, notPrevious, 90 * Math.PI / 180);

var canvasGridTriangleVertical = document.getElementById('canvas-grid-triangle-vertical');
var ctxGridTriangleVertical = canvasGridTriangleVertical.getContext("2d");
drawGridWithTriangle(ctxGridTriangleVertical, 40, 40, colorSchemeRed, notPrevious, 0);

var canvasGridSquareHorizontal = document.getElementById('canvas-grid-square-horizontal');
var ctxGridSquareHorizontal = canvasGridSquareHorizontal.getContext("2d");
drawGridWithSquare(ctxGridSquareHorizontal, 40, 40, colorSchemeRed, notPrevious, 0);

var canvasGridSquareRotated = document.getElementById('canvas-grid-square-rotated-45');
var ctxGridSquareRotated = canvasGridSquareRotated.getContext("2d");
drawGridWithSquare(ctxGridSquareRotated, 40, 56, colorSchemeRed, notPrevious, 45 * Math.PI / 180);

var canvasGridHexagonHorizontal = document.getElementById('canvas-grid-hexagon-horizontal');
var ctxGridHexagonHorizontal = canvasGridHexagonHorizontal.getContext("2d");
drawGridWithHexagon(ctxGridHexagonHorizontal, 28, 24, colorSchemeRed, notPrevious, 0);