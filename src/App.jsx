
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRefhook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +=  "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_+{}?><"


    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setPassword(pass)



  },  [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClibboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 10)
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  
  


  return (
    <>
    <h1 className='text-5xl text-center text-yellow-600 mb-6'>Password Generator</h1>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8  text-orange-600 bg-gray-800' >
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3 '
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
         <button
         onClick={copyPasswordToClibboard}
          className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'
         >Copy</button>


      </div>


      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>length: {length}</label>


        </div>


        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
           />
           <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={() => {
            setCharAllowed((prev) =>  !prev);

          }}
           />

           <label htmlFor="characterInput">
            characterInput
           </label>

        </div>

      </div>
    </div>


    </>
  )
}

export default App
