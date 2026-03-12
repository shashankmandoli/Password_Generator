import { useState } from "react"


function App() {
  const [len, setLen] =  useState(8)

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-4 text-white">Password Generator</h1>

    </div>
  )
}

export default App
