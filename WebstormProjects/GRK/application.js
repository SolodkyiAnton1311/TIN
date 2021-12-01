var imgA;
var imgB;
var imgC;
function setup() {
    createCanvas(512,512);
    background(255);
    imgA = createImage(512,512);
    imgB = createImage(512,512);
    imgC = createImage(512,512);
    imgA.loadPixels();
    imgB.loadPixels();
    imgC.loadPixels();
    var d = pixelDensity();
    for(var i=0; i<512*512*4*d; i+=4) {
        imgA.pixels[i]=240;
        imgA.pixels[i+1]=250;
        imgA.pixels[i+2]=240;
        imgA.pixels[i+3]=255;
        imgB.pixels[i]=240;
        imgB.pixels[i+1]=240;
        imgB.pixels[i+2]=250;
        imgB.pixels[i+3]=255;
        imgC.pixels[i]=250;
        imgC.pixels[i+1]=240;
        imgC.pixels[i+2]=250;
        imgC.pixels[i+3]=255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
    imgC.updatePixels();
}
function draw() {
    if (keyIsDown(DOWN_ARROW)) {
        image(imgC,0,0);
        text('Image C',10,20);
    } else if (keyIsDown(32)) {
        image(imgB,0,0);
        text('Image B',10,20);
    } else {
        image(imgA,0,0);
        text('Image A',10,20);
    }
}
function makeVector(x, y) {
    return [x, y, 1];
}
function drawVector(img, vec) {
    img.set(vec[0], vec[1], color('black'));
    img.updatePixels();
}

function combineTransformation() {
    let transformation = arguments[0];
    for (let i = 1; i < arguments.length; i ++) {
        transformation = multiplyByMatrix(transformation, arguments[i]);
    }
    return transformation;
}

function mouseDragged() {
    let vec = makeVector(mouseX, mouseY);
    drawVector(imgA, vec);
    let scale = makeScale(0.5, 0.5);
    let translate = makeTranslate(0, -75);
    let rotate = makeRotation(90);
    let transformation1 = combineTransformation(translate, rotate, scale);
    drawVector(imgB, multiplyByVector(transformation1, vec));
    let transformation2 = combineTransformation(scale, translate, rotate);
    drawVector(imgC, multiplyByVector(transformation2, vec));
}
function makeScale(sx, sy) {
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
}
function makeIdentity() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}
function makeTranslate(tx, ty) {
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}
function makeRotation(angle) {
    let radians = (angle/180) * Math.PI;
    let cosine = Math.cos(radians);
    let sine = Math.sin(radians);
    return [[cosine, -sine, 0], [sine, cosine, 0], [0, 0, 1]];
}
function printMatrices() {
    console.log('Identity');
    console.log(makeIdentity());
    console.log('Scale');
    console.log(makeScale(1000, 500));
    console.log('Translate');
    console.log(makeTranslate(1000, 500));
    console.log('Rotation');
    console.log(makeRotation(30));
    console.log('MultiplyByVector');
    let matrix = [[1, -1, 2], [0, -3, 1]];
    let vector = [2, 1, 0];
    // expected [1, -3]
    console.log(multiplyByVector(matrix, vector));
    console.log('MultiplyByMatrix');
    let matrix1 = [[1, 0, 2], [-1, 3, 1]];
    let matrix2 = [[3, 1], [2, 1], [1, 0]];
    // expected [[5, 1], [4, 2]]
    console.log(multiplyByMatrix(matrix1, matrix2));
}
function multiplyByVector(matrix, vector) {
    let result = Array(matrix.length).fill(0);
    for(let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for(let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result[i] = sum;
    }
    return result;
}

function multiplyByMatrix(matrix1, matrix2) {
    let result = Array(matrix1.length).fill(0);
    let columns = matrix2[0].length;
    for(let i = 0; i < matrix1.length; i++) {
        result[i] = Array(columns).fill(0);
        for(let j = 0; j < columns; j++) {
            let sum = 0;
            for (let k = 0; k < matrix2.length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
printMatrices();