import React from 'react'
import Sidebar from '../components/Sidebar'
import TextArea from '../components/TextArea'

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className={`py-7 px-5 lg:px-10 pb-16 w-full h-screen overflow-y-scroll bg-[#f4f4f4]`}>
        <TextArea />
      </div>
    </div>
  )
}

export default Home