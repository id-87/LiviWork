import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
  const [mpd,setMpd]=useState("")
  const [tm,setTm]=useState("")
  const [role,setRole]=useState("")
  const [bm,setBm]=useState("")
  const [mt,setMt]=useState("")
  const url=import.meta.env.VITEBaseURL

  const handleSubmit=async()=>{


  }
//   {
//   "meetings_per_day": 5,
//   "total_minutes": 260,
//   "break_minutes": 20,
//   "role": "developer",
//   "meeting_type": "online"
// }


  return (
    <>
      <p>Welcome to LiviWork</p>
      <form onSubmit={handleSubmit}>
        <label >Meetings per day <input type="text" value={mpd} onChange={(e)=>setMpd(e.target.value)} /></label>
        <br />
        <label >Total Minutes <input type="text" value={tm} onChange={(e)=>setTm(e.target.value)} /></label>
        <br />
        <label >Role <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} /></label>
        <br />
        <label >Break Minutes <input type="text" value={bm} onChange={(e)=>setBm(e.target.value)} /></label>
        <br />
        <label >Meeting Type <input type="text" value={mt} onChange={(e)=>setMt(e.target.value)} /></label>
        
        <button type='submit'>Analyse</button>
      </form>
    </>
  )
}

export default App
