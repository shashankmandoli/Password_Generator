import { useCallback, useEffect, useState, useRef } from "react"


function App() {
  //useState hook
  const [len, setLen] =  useState(8)
  const [nums, setNum] = useState(false)
  const [chars, setChar] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  //useRef hook
  const passRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    window.navigator.clipboard.writeText(password)
  }, [password])

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

  //useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [len, nums, chars, setPassword])

  return (
    <>
      <div className="bg-[rgba(139,138,138,0.22)] w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-4 my-[10vh]">
        <h1 className="text-4xl font-bold text-center mt-4 text-white">Password Generator</h1>
        <div className="w-full max-w-md mx-auto rounded-lg px-4 py-4 my-5 text-white">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-orange-500">
          <input type="text" value={password} 
          className="w-full outline-none py-2 px-3 bg-white"
          placeholder="Password" 
          readOnly
          ref={passRef}
          />
          <button
           onClick={copyPasswordToClipboard}
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
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

      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[rgba(34,34,34,0.32)] text-white px-4 py-2 rounded shadow-lg 
                transition-opacity duration-500 ease-in-out">
          Password copied to clipboard!
        </div>
      )}
    </>
  )
}

export default App
