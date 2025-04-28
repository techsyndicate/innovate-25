"use client"

import React from 'react'

function MyMessage({children}: {children: string}) {
  return (
    <div className="absolute left-[10vw] bottom-[40vw]">    
      <div className="relative">  
        <div className="relative w-[80vw] h-[5vw] bg-[#555555] z-[10]" style={{
          clipPath: 'polygon(5vw 0, 75vw 0, 80vw 100%, 0 100%)'
        }}></div>
        <div className="absolute w-[80vw] h-[5vw] bg-[#070707] z-[10] top-[0]" style={{
          clipPath: 'polygon(5.25vw 0.25vw, 74.75vw 0.25vw, 79.75vw 100%, 0.25vw 100%)',
          transform: 'translateY(0.1vw)'
        }}></div>
      </div>
      <div className="relative">
        <div className="text-center px-[3vw] py-[1vw] relative w-[80vw] bg-[#555555]">{children}</div>
        <div className="text-center px-[3vw] py-[1vw] absolute w-[80vw] top-0 bg-[#070707] transform-[scaleX(0.99)] [transform-origin:center_center]">{children}</div>   
      </div>
      <div className="relative">
        <div className="relative w-[80vw] h-[5vw] bg-[#555555]" style={{
          clipPath: 'polygon(0 0, 80vw 0, 75vw 100%, 5vw 100%)'
        }}></div>
        <div className="absolute top-0 w-[80vw] h-[5vw] bg-[#070707]" style={{
          clipPath: 'polygon(0.25vw 0, 79.75vw 0, 74.9vw 4.75vw, 5.1vw 4.75vw)',
          transform: 'translateY(-0.1vw)'
        }}></div>
      </div>
      <div className="relative">
        <div className="relative w-[8vw] h-[8vw] bg-[#555555] ml-[62vw]" style={{
          clipPath: 'polygon(0 0, 8vw 0, 8vw 8vw)',
        }}></div>
        <div className="absolute top-0 left-[-0.4vw] w-[8vw] h-[8vw] bg-[#070707] ml-[62vw]" style={{
          clipPath: 'polygon(0 0, 8vw 0, 8vw 8vw)',
          transform: 'translateY(-4px)'
        }}></div>
      </div>
    </div>
  )
}

export default MyMessage