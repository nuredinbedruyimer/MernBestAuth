import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MotionAnimation from './components/MotionAnimation'
import VerificationPage from './pages/VerificationPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { ProtectedRoute, RedirectAuthenticatedUser } from './common/CheckAuth'
import Loading from './components/Loading'
import ForgotPasswordPage from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {

  const {isAuthenticated, isCheckingAuth, checkAuth, user} = useAuthStore()

  useEffect(()=>{
    checkAuth()

  }, [checkAuth])
  console.log("User : ", user)
  console.log("isAuth : ", isAuthenticated)
  console.log("isCheching Auth : ", isCheckingAuth)

  if (isCheckingAuth){
    <Loading/>
  }




  return (
    <div className='min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-emerald-900 flex justify-center items-center  relative overflow-hidden'>
    	<MotionAnimation color='bg-lime-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<MotionAnimation color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<MotionAnimation color='bg-sky-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />



    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
      <HomePage/>


        </ProtectedRoute>
      }/>
      <Route path='/login' element={
        <RedirectAuthenticatedUser>
      <LoginPage/>


        </RedirectAuthenticatedUser>
      }/>
      <Route path='/signup' element={
        <RedirectAuthenticatedUser>
      <SignupPage/>


        </RedirectAuthenticatedUser>

      }/>
      <Route path='/verify-email' element={<VerificationPage/>}/>

      <Route path='/forgot-password/' element={
        <RedirectAuthenticatedUser>
        <ForgotPasswordPage/>
          
        </RedirectAuthenticatedUser>
      }/>
       <Route path='/forgot-password/:token' element={
        <RedirectAuthenticatedUser>
        <ResetPasswordPage/>
          
        </RedirectAuthenticatedUser>
      }/>



    </Routes>
    <Toaster/>
      
    </div>
  )
}

export default App
