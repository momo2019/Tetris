import MoMachine from './mo/moXState';
const TestMachine = MoMachine({
  initial: 'init',
  states: {
    init: {
      on: {
        START: 'start',
      },
      onEntry: 'gameInit',
    },
    start: {
      on: {
        RUN: 'stop',
        DEAD: 'dead',
      },
      onEntry: 'gameBegin',
    },
    stop: {
      on: {
        RUN: 'start',
      },
      onEntry: 'gameStop',
    },
    dead: {
      on: {
        START: 'init',
      },
      onEntry: 'gameEnd',
    }
  }
});

export default TestMachine;