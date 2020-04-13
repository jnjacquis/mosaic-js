const rgbColorBegin = 'rgb(';
const rgbColorEnd = ')';
const hslColorBegin = 'hsl(';
const hslColorEnd = ')';

let red = 0;
let green = 0;
let blue = 0;

let hex = "#";

let hue = 0;
let saturation = 0;
let lightness = 0;

export function generateColorRBG(color, percentR, percentG, percentB) {
    let strcolor = new String(color);
    if (!checkRGBColorFormat(color)) {
        return color;
    }
    let colorComponents = strcolor.substring(4).split(',');
    red = caculateComponentWithPercent(Number.parseInt(colorComponents[0]), percentR);
    green = caculateComponentWithPercent(Number.parseInt(colorComponents[1]), percentG);
    blue = caculateComponentWithPercent(Number.parseInt(colorComponents[2]), percentB);
    return rgbColorBegin + red + ',' + green + ',' + blue + rgbColorEnd;
}

export function generateColorHSL(color, percentH, percentS, percentL) {
    let strcolor = new String(color);
    if (!checkHSLColorFormat(color)) {
        return color;
    }
    let colorComponents = strcolor.substring(4).split(',');
    hue = caculateComponentWithPercent(Number.parseInt(colorComponents[0]), percentH);
    saturation = caculateComponentWithPercent(Number.parseInt(colorComponents[1]), percentS);
    lightness = caculateComponentWithPercent(Number.parseInt(colorComponents[2]), percentL);
    return hslColorBegin + hue + ',' + saturation + '%,' + lightness + '%' + hslColorEnd;
}

function checkRGBColorFormat(color) {
    if (color == undefined) {
        console.log('Undefined :(');
        return;
    }
    return color.startsWith(rgbColorBegin) && color.endsWith(rgbColorEnd);
}

function checkHSLColorFormat(color) {
    if (color == undefined) {
        console.log('Undefined :(');
        return;
    }
    return color.startsWith(hslColorBegin) && color.endsWith(hslColorEnd);
}

function caculateComponentWithNumber(value, number) {
    if (number == undefined) {
        return value;
    }
    return value + number;
}

function caculateComponentWithPercent(value, percent) {
    if (percent == undefined) {
        return value;
    }
    return Math.round(value * percent);
}