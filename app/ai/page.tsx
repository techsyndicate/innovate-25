"use client"

import React from 'react'
import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'

const getResponse = async (prompt: string) => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  const data = await res.json()
  if (!data.error) {
    console.log(data)
    return data.candidates[0].content.parts[0].text
  } else {
    return
  }
}

function aiPage() {

  const [inputValue, setInputValue] = useState("")
  const [outputValue, setOutputValue] = useState("Output appears here!")

  const getResponseText = () => {
    getResponse(inputValue)
    .then((resp: string | undefined) => {
      setOutputValue(resp ? resp : "There was an error, please try again.")
    })
  }

  return (
    <div>
      <textarea onChange={(e) => setInputValue(e.target.value)}></textarea>
      <button onClick={() => {getResponseText()}}>Do it</button>
      <p>{outputValue}</p>
    </div>
  )
}

export default aiPage