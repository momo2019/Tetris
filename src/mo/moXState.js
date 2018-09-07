import { Machine } from 'xstate';


const MoMachine = (dataJSON) => {
  let temp = Machine(dataJSON);
  temp._moString = () => {
    let url = 'https://musing-rosalind-2ce8e7.netlify.com/?machine=';
    console.log(url + encodeURI(JSON.stringify(dataJSON), "utf-8"));
  }
  return temp;
}

export default MoMachine;