import { generateColorHSL } from './color.js';

export function drawFilledTriangle(context, x, y, width, height, fillStyle, angle) {
    console.log("Triangle: x=" + x + ",y=" + y + ",w=" + width + ",h=" + height + ",a=" + angle);
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle);
    context.beginPath();
    context.fillStyle = fillStyle;
    context.moveTo(- width / 2, - height / 2);
    context.lineTo(width / 2, - height / 2);
    context.lineTo(0, height / 2);
    context.lineTo(- width / 2, - height / 2);
    context.fill();
    context.restore();
}

export function drawFilledSquare(context, x, y, side, fillStyle, angle) {
    console.log("Square: x=" + x + ",y=" + y + ",s=" + side + ",a=" + angle);
    context.save();
    context.translate(x + side / 2, y + side / 2);
    context.rotate(angle);
    context.beginPath();
    context.fillStyle = fillStyle;
    context.fillRect(-side / 2, -side / 2, side, side);
    context.restore();
}

export function drawFilledHexagon(context, x, y, size, fillStyle, angle) {
    console.log("Hexagon: x=" + x + ",y=" + y + ",s=" + size + ",a=" + angle);
    const halfSize = size / 2;
    context.save();
    context.translate(x + halfSize, y + halfSize);
    context.rotate(angle);
    context.beginPath();
    context.fillStyle = fillStyle;
    let currentAngle = 120 * Math.PI / 180;
    context.moveTo(Math.floor(size * Math.cos(currentAngle)), Math.floor(-size * Math.sin(currentAngle)));
    for (let index = 0; index < 7; index++) {
        currentAngle += 60 * Math.PI / 180;
        context.lineTo(Math.floor(size * Math.cos(currentAngle)), Math.floor(-size * Math.sin(currentAngle)));
    }
    context.fill();
    context.restore();
}

export function drawGridWithTriangle(context, width, height, colorScheme, colorify, angle) {
    const rows = calculateRowsOrColumns(context.canvas.width, width);
    const columns = calculateRowsOrColumns(context.canvas.height, height);

    for (let row = 0; row < rows; row++) {
        let y = row * width;

        for (let column = 0; column < columns; column++) {
            let x = column * height;

            drawFilledTriangle(context, x, y, width, height, colorify(colorScheme), angle);
            if (angle == 0) {
                drawFilledTriangle(context, x - width / 2, y, width, height, colorify(colorScheme), oppositeAngle(angle));
            } else {
                drawFilledTriangle(context, x, y - height / 2, width, height, colorify(colorScheme), oppositeAngle(angle));
            }

            if (column == columns - 1) {
                if (angle == 0) {
                    drawFilledTriangle(context, x + width / 2, y, width, height, colorify(colorScheme), oppositeAngle(angle));
                } else {
                    drawFilledTriangle(context, x, y + height / 2, width, height, colorify(colorScheme), oppositeAngle(angle));
                }
            }
        }
    }
}

function oppositeAngle(angle) {
    return angle + Math.PI;
}

export function drawGridWithSquare(context, squareSize, squareBoxSize, colorScheme, colorify, angle) {
    const rows = calculateRowsOrColumns(context.canvas.width, squareSize);
    const columns = calculateRowsOrColumns(context.canvas.height, squareSize);

    for (let row = 0; row < rows; row++) {
        let y = row * squareBoxSize;

        for (let column = 0; column < columns; column++) {
            let x = column * squareBoxSize;

            drawFilledSquare(context, x, y, squareSize, colorify(colorScheme), angle);
            if (angle % (Math.PI / 2) == Math.PI /4) {
                drawFilledSquare(context, x - squareBoxSize / 2, y - squareBoxSize / 2, squareSize, colorify(colorScheme), angle);
            }
        }
    }
}

function calculateRowsOrColumns(canvasSize, shapeSize) {
    return Math.floor(canvasSize / shapeSize);
}

export function drawGridWithHexagon(context, hexagonSize, hexagonBoxSize, colorScheme, colorify, angle) {
    const rows = calculateRowsOrColumns(context.canvas.width, hexagonSize);
    const columns = calculateRowsOrColumns(context.canvas.height, hexagonSize);

    for (let row = 0; row < rows; row++) {
        let y = row * hexagonBoxSize;
        let rowOffsetX = 0;

        if (row % 2 == 1) {
            rowOffsetX = 1.5 * hexagonSize;
        }

        for (let column = 0; column < columns; column++) {
            let x = rowOffsetX + 3 * column * hexagonSize;

            drawFilledHexagon(context, x, y, hexagonSize, colorify(colorScheme), angle);
            if (angle % (Math.PI / 2) == Math.PI /4) {
                drawFilledSquare(context, x - hexagonBoxSize / 2, y - hexagonBoxSize / 2, hexagonSize, colorify(colorScheme), angle);
            }
        }
    }
}