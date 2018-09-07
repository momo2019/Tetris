const config = {
  map: [10,20],
  shape: {
    shape1: {  //条
      stateNum: 2,
      state1: {  //横
        content: [[1], [1], [1], [1], [1]],
        row: [0, 0, 0, 0, 0],
      },
      state2: {  //竖
        content: [[1, 1, 1, 1, 1]],
        row: [0],
      }
    },
    shape2: {  //块
      stateNum: 1,
      state1: {
        content: [[1, 1], [1, 1]],
        row: [0, 0],
      }
    },
    shape3: {  //T
      stateNum: 4,
      state1: { //T
        content: [[1, 0], [1, 1], [1, 0]],
        row: [-1, 0, -1],
      },
      state2: { //-|
        content: [[0, 1, 0], [1, 1, 1]],
        row: [-1, 0],
      },
      state3: { //_|_
        content: [[0, 1], [1, 1], [0, 1]],
        row: [0, 0, 0],
      },
      state4: { //|-
        content: [[1, 1, 1], [0, 1, 0]],
        row: [0, -1],
      }
    },
    shape4: {  //L
      stateNum: 4,
      state1: { //L
        content: [[1, 1, 1], [0, 0, 1]],
        row: [0, 0],
      },
      state2: { //__|
        content: [[0, 1], [0, 1], [1, 1]],
        row: [0, 0, 0],
      },
      state3: { //`|
        content: [[1, 0, 0], [1, 1, 1]],
        row: [-2, 0],
      },
      state4: { // |``
        content: [[1, 1], [1, 0], [1, 0]],
        row: [0, -1, -1],
      }
    },
    shape5: {  //z
      stateNum: 2,
      state1: { //z
        content: [[1, 0], [1, 1], [0, 1]],
        row: [-1, 0, 0],
      },
      state2: { 
        content: [[0, 1, 1], [1, 1, 0]],
        row: [0, -1],
      },
    },
    shape6: {  //fan z
      stateNum: 2,
      state1: {
        content: [[0, 1], [1, 1], [1, 0]],
        row: [0, 0, -1],
      },
      state2: {
        content: [[1, 1, 0], [0, 1, 1]],
        row: [-1, 0],
      }
    }
  }
}
export default  config;