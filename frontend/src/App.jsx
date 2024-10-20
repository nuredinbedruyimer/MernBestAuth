import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MotionAnimation from './components/MotionAnimation'
import VerificationPage from './pages/VerificationPage'

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-emerald-900 flex justify-center items-center  relative overflow-hidden'>
    	<MotionAnimation color='bg-lime-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<MotionAnimation color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<MotionAnimation color='bg-sky-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />



    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/verify-email' element={<VerificationPage/>}/>


    </Routes>
      
    </div>
  )
}

export default App
