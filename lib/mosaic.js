import { generateColorHSL } from './color.js';

export function drawFilledTriangle(context, x, y, width, height, fillStyle, angle) {
    console.log("Triangle: x=" + x + ",y=" + y + ",w=" + width + ",h=" + height + ",a=" + angle);
    context.save();
    context.translate(x + width/2, y + height / 2);
    context.rotate(angle);
    context.beginPath();
    context.fillStyle = fillStyle;
    context.moveTo(- width/2, - height/2);
    context.lineTo(width/2, - height/2);
    context.lineTo(0, height/2);
    context.lineTo(- width/2, - height/2);
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
    context.fillRect(-side/2, -side/2, side, side);
    context.restore();
}

export function drawGridWithTriangle(context, rows, columns, offsetX, offsetY, colorScheme, colorify, angle) {
    const width = 40;
    const height = 40;

    for (let row = 0; row < rows; row++) {
        let y = offsetX + row * width;
        
        for (let column = 0; column < columns; column++) {
            let x = offsetY + column * height;

            drawFilledTriangle(context, x, y, width, height, colorify(colorScheme), angle);
            drawFilledTriangle(context, x - width / 2, y, width, height, colorify(colorScheme), oppositeAngle(angle));
            
            if (column == columns -1) {
                drawFilledTriangle(context, x + width / 2, y, width, height, colorify(colorScheme), oppositeAngle(angle));
            }
        }
    }
}

function oppositeAngle(angle) {
    return Math.PI - angle;
}

export function drawGridWithSquare(context, squareSize, squareBoxSize, colorScheme, angle) {
    const rows = calculateRowsOrColumns(context.canvas.width, squareSize);
    const columns = calculateRowsOrColumns(context.canvas.height, squareSize);

    for (let row = 0; row < rows; row++) {
        let y = row * squareBoxSize;
        let color = colorScheme[row];

        for (let column = 0; column < columns; column++) {
            let x = column * squareBoxSize;     
            
            if (column % 2 == 0) {
                drawFilledSquare(context, x, y, squareSize, color, angle);
            } else {
                color = generateColorHSL(color, 1.0, 1.0, 0.9);
                drawFilledSquare(context, x, y, squareSize, color, angle);
            }
        }        
    }
}

function calculateRowsOrColumns(canvasSize, shapeSize) {
    return Math.floor(canvasSize / shapeSize);
}