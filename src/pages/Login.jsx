import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <LoginForm />
          <div className="relative flex items-center justify-center bg-black">
            <div className="items-center justify-center w-full rounded-full bg-white p-12 lg:p-16 m-10 lg:m-20 hidden md:flex">
              <img
                src="/logo.jpg"
                alt="img"
                className="w-[150px] h-[150px] hidden rounded-r-2xl md:block object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login