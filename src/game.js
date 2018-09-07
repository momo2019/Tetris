import config from './config';
import { canvasBg, canvasBlock } from './canvas';


function Game() {
  const COL = config.map[0];
  const ROW = config.map[1];
  const LENGTH = COL * ROW;
  const TIME = 1000;

  let deadFlag = false;
  let stopFlag = true;
  let deadCallback = '';

  let map = [];
  let block;
  let stateNum = 0;
  let state = 0;
  let col = 0;
  let row = 0;
  let interval;



  document.addEventListener('keydown',(event) => {
    let ev = event || window.event;
    let tempCol = col;
    let tempRow = row;
    let tempState = state;
    if(deadFlag) {
      return false;
    }

    if(block !== null){
      if(stopFlag === true) {
        return false;
      }
      if(ev.keyCode == 37 || ev.keyCode == 39) {
        tempCol += ev.keyCode % 37 - 1;
        if(isMove(block['state'+tempState], tempCol, tempRow)){
          col = tempCol;
          canvasBlock.drawShape(block['state'+state], col, row);
        }
        return false;
      }
      if(ev.keyCode == 38) {
        tempState = state%stateNum+1;
        if(isMove(block['state'+tempState], tempCol, tempRow)){
          state = tempState;
          canvasBlock.drawShape(block['state'+state], col, row);
        }
        return false;
      }
      if(ev.keyCode == 40) {
        tempRow += 1;
        if(isMove(block['state'+tempState], tempCol, tempRow)){
          row = tempRow;
          canvasBlock.drawShape(block['state'+state], col, row);
        }
        return false;
      }
    }
  })

  let deadTime = () => {
    deadFlag = true;
    deadCallback();
  }

  let isDelete = () => {
    let length = ROW;
    let width = COL;
    for(let i=length-1; i>0; i--) {
      let j=0;
      for(; j<width; j++) {
        let site = i*width + j;
        if(map[site] === 0){
          break;
        }
      }
      if(j === width) {
        let temp = Array(width);
        temp.fill(0)
        map.splice(i*width,width);
        map.splice(0,0,...temp);
        i++;
      }
    }
  }

  let isMove = (shape, col, row) => {
    let block = shape.content;
    let length = block.length;
    let height = block[0].length;
    if(col < 0 || col+length > COL || row >= ROW) {
      return false;
    }
    for(let i=0; i<length; i++) {
      for(let j=0; j<height; j++) {
        let site = (col+i) + (row-height+1+j)*COL;
        if(map[site] === 1){
          return false;
        }
      }
    }
    return true;
  }

  let isTouch = (shape, col, row) => {
    let touchRow = shape.row;
    let length = touchRow.length;
    for(let i=0; i<length; i++) {
      let site = (row+touchRow[i])*COL + col + i;
      if(map[site] === 1){
        return true;
      } 
    }
    return false;
  }

  let addMap = (shape, col, row) => {
    let block = shape.content;
    for(let i=0, rLength=block.length; i<rLength; i++) {
      for(let j=0, cLength=block[i].length; j<cLength; j++) {
        let site = (col+i) + (row-cLength+1+j)*COL;
        if(site < 0) { 
          deadTime();
        }
        if(block[i][j] === 1){
          map[site] = 1;
        }
      }
    }
  }

  let blockInit = () => {
    if(deadFlag){
      return false;
    }
    block = config.shape[ 'shape' + parseInt(Math.random()*6 + 1)];
    stateNum = block.stateNum;
    state = 1;
    col = 4;
    row = 0;
  }

  let blockRun = () => {
    if(deadFlag) {
      return false;
    }
    interval = setInterval(function() {
      canvasBlock.drawShape(block['state'+state], col, row++);
      if(row === ROW || isTouch(block['state'+state], col, row)){
        addMap(block['state'+state], col, row-1);
        canvasBlock.clearBlock();
        block = null;
        isDelete();
        canvasBg.drawBg(map, COL, LENGTH);
        clearInterval(interval);
        if(!deadFlag){
          blockInit();
          blockRun();
        }
      }
    },TIME);
  }
  
  let blockStop = () => {
    clearInterval(interval);
  }

  this.init = () => {
    let defaultMap = Array(LENGTH);
    defaultMap.fill(0);
    map = defaultMap;
    canvasBg.drawBg(map, COL, LENGTH);
  }

  this.start = () => {
    stopFlag = false;
    deadFlag = false;
    blockInit();
    blockRun();
  }

  this.stop = () => {
    stopFlag = true;
    blockStop();
  }
  this.restart = () => {
    stopFlag = false;
    blockRun();
  }

  this.dead = (callback) => {
      deadCallback = callback;
  }
}

export default Game;