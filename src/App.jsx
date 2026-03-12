import { useCallback, useEffect, useState } from "react"


function App() {
  const [len, setLen] =  useState(8)
  const [nums, setNum] = useState(false)
  const [chars, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm"
    if(nums) str += "1234567890"
    if(chars) str += "!@#$%^&*()_+-=[]{}~"

    for(let i=1; i <= len; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)

  }, [len, nums, chars])

  useEffect(() => {
    passwordGenerator()
  }, [len, nums, chars, passwordGenerator])

  return (
    <>
      <div className="bg-gray-700 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-[10vh]">
        <h1 className="text-4xl font-bold text-center mt-4 text-white">Password Generator</h1>
        <div className="w-full max-w-md mx-auto rounded-lg px-4 py-4 my-5 text-orange-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} 
          className="w-full outline-none py-2 px-3 bg-white"
          placeholder="Password" 
          readOnly
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2 py-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={80} value={len} className="cursor-pointer" 
            onChange={(e) => {setLen(Number(e.target.value))}}/>
            <label >Length: {len}</label>
          </div>

          <div className="flex items-center justify-center gap-x-2">
            <input 
              type="checkbox"
              defaultChecked={nums}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numerInput">Numbers</label>

            <input 
              type="checkbox"
              defaultChecked={chars}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

        </div>
      </div>
    </>
  )
}

export default App
