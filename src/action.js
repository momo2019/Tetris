import TestMachine from './state';
import Game from './game';

let startBtn = document.getElementById('elsfk-start');
let game = new Game();
let currentState = '';

const actionsMap = {
  gameInit: () => game.init(),
  gameBegin: history => history === 'stop' ? game.restart() : game.start(),
  gameStop: () => game.stop(),
  gameEnd: () => console.log('死了！'),
}

window.addEventListener('load', () => {
  currentState = TestMachine.initialState;
  game.init()
  game.dead( ()=> dispatch('DEAD') )
})

function dispatch(event){
  let nextState = TestMachine.transition(currentState, event);
  nextState.actions.forEach(actionKey => {
    const action = actionsMap[actionKey];
    if (action) {
      action(nextState.history.value);
    }
  });
  currentState = nextState;
}

startBtn.addEventListener('click',() => {
  dispatch('START');
});

document.addEventListener('keydown',(event)=>{
  let ev = event || window.event;
  if(ev.keyCode == 80) {
    dispatch('RUN')
  }
})
