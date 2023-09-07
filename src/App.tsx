import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css'
import Context from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state,action) => {
  switch(action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}


function App() {
  let [count,setCount] = useState(0);
  const ref = useRef();
  const info = useContext(Context);
  const [state,dispatch] = useReducer(reducer,0); 

  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log('useEffect');
    /* setCount(count + 1); */
  },[count])

  const handleRef = () => {
    console.log(ref.current.value);
    console.log(ref.current.offsetWidth);
    console.log(ref.current.offsetHeight);
  };

  //useMemo
  const [num,setNum] = useState(0);
  const [num2,setNum2] = useState(0);
  

  const handleNum = useMemo(() => {
    let i = 0;
    while(i < 200000) {
      i++;
    }
    console.log('handleNum');
    return num2 * num2;
},[num2]);

const [counter,setCounter] = useState(0);
/* const showCount = () => {
  alert('重い処理です');
};
 */

const showCount = useCallback(() => {
  alert(`重い処理です`);
},[counter]);

//カスタムフック
const [age,setAge] = useLocalStorage("age",20);

  return (
    <>
      <div className="App">
        <h1>useState, useEffect</h1>
        <button onClick={handleClick}>+</button>
        <p>{count}</p>
      </div>
      <hr />
      <h1 className="App">useContext</h1>
      <p>{info.name}</p>
      <p>{info.version}</p>
      <hr />
      <h1 className="App">useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
      <hr />
      <h1 className="App">useReducer</h1>
      <p>{state}</p>
      <button onClick={() => dispatch({type: 'add'})}>+</button>
      <button onClick={() => dispatch({type: 'sub'})}>-</button>
      <hr />
      <h1 className="App">useMemo</h1>
      <div>カウント１：{num}</div>
      <div>カウント２：{num2}</div>
      <div>結果：{handleNum}</div>
      <button onClick={() => setNum(num + 1)}>+</button>
      <button onClick={() => setNum2(num2 + 1)}>+</button>
      <hr />
      <h1 className="App">useCallback</h1>
      <SomeChild showCount = {showCount} />
      <hr />
      <h1 className="App">カスタムフック</h1>
      <p>{age}</p>
      <button onClick = {() => setAge(80)}>年齢をセット</button>
    </>
  )
}

export default App
