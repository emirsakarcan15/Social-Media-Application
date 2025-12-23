import { useState } from 'react'
import './App.css'
import RouterConfig from './CONFIG/RouterConfig'
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className='appContainer'>
      <div className='app'>
        <RouterConfig />
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
