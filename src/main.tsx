import React from 'react'
import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
const info = {
  name: 'React',
  version: '17.0.2',
};

const Context = createContext(info);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={info}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>,
)

export default Context;