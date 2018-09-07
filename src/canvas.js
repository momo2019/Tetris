const cvsBg = document.getElementById('elsfk-bg');
const cvsBlock = document.getElementById('elsfk-block');
const ctxBg = cvsBg.getContext('2d');
const ctxBlock = cvsBlock.getContext('2d');

const width = 20;
const borderColor = '#000000';
const fillColor = '#FFFF00';
const WIDTH = 10 * width;
const HEIGHT = 20 * width;

let drawBlock = (ctx, type, x, y) => {
  if(type === 1){
    ctx.fillRect(x,y,width,width);
  }else{
    ctx.rect(x,y,width,width);
  }
} 
let clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

cvsBg.width = WIDTH;
cvsBg.height = HEIGHT;
cvsBlock.width = WIDTH;
cvsBlock.height = HEIGHT;

let drawShape = (shape, col, row) => {
  clearCanvas(ctxBlock);
  ctxBlock.fillStyle = fillColor;
  ctxBlock.strokeStyle = borderColor;
  for(let i=0, rLength=shape.content.length; i<rLength; i++) {
    for(let j=0, cLength=shape.content[i].length; j<cLength; j++) {
      drawBlock(ctxBlock, shape.content[i][j], (col+i)*width, (row-cLength+1+j)*width);
    }
  }
  ctxBlock.stroke();
}

let drawBg = (map, col, length) => {
  clearCanvas(ctxBg);
  ctxBg.fillStyle = fillColor;
  ctxBg.strokeStyle = borderColor;
  for(let i=0; i<length; i++){
    drawBlock(ctxBg, map[i], (i%col) * width, parseInt(i / col) * width);
  }
  ctxBg.stroke();
}




const canvasBg = {
  drawBg: (map, col, length) => drawBg(map, col, length),
  clearBg: () => clearCanvas(ctxBg),
}

const canvasBlock = {
  drawShape: (shape, col, row) => drawShape(shape, col, row),
  clearBlock: () => clearCanvas(ctxBlock),
}

export { canvasBg, canvasBlock };
