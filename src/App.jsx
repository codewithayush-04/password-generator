 import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  // useref hook
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "0123456789"
    if (charAllow) str += "@#$%^&*()-_=+|{};:/?"

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllow, charAllow])

  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [password])

  // Automatically generate password when settings change
  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-2xl font-bold text-white text-center mb-4'>Password Generator</h1>

        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        {copied && <p className="text-green-400 text-sm mb-2">Copied!</p>}

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={5}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={charAllow}
              id="characterInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

        <div className='mt-4'>
          <button
            onClick={passwordGenerator}
            className="bg-green-700 text-white px-3 py-1 rounded-md">
            Regenerate
          </button>
        </div>
      </div>
    </>
  )
}

export default App