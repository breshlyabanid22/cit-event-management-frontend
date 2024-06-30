import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
      </Routes>
    </>
  )
}

export default App
