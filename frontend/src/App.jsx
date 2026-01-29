import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [data,setData]=useState(false)
  const [mpd,setMpd]=useState("")
  const [tm,setTm]=useState("")
  const [role,setRole]=useState("")
  const [bm,setBm]=useState("")
  const [mt,setMt]=useState("")
  const url=import.meta.env.VITE_BASE_URL

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (loading) return; 
  setLoading(true);
    try{
    const data=await axios.post('https://liviwork-backend.onrender.com/predict',{
      "meetings_per_day":Number(mpd),
      "total_minutes":Number(tm),
      "break_minutes":Number(bm),
      "role":role,
      "meeting_type":mt
    })
    setResult(data.data)
    console.log(result.fatigueLevel,result.confidence)
  }catch(err){
    console.log(err)
    alert("Failed to get prediction")
  }finally {
    setLoading(false);
  }
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

      <h1>LiviWork</h1>
      {result? <>
      <h2>Fatigue Level:{result.fatigueLevel}</h2>
      
      <h4>Confidence:{result.confidence}</h4>
      </>:
      
      <form onSubmit={handleSubmit}>
        <label >Meetings per day <input type="number" value={mpd} onChange={(e)=>setMpd(e.target.value)} /></label>
        <br />
        <label >Total Minutes <input type="number" value={tm} onChange={(e)=>setTm(e.target.value)} /></label>
        <br />
        <label >Role <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="">Select role</option>
  <option value="student">Student</option>
  <option value="developer">Developer</option>
  <option value="manager">Manager</option>
</select></label>
        <br />
        <label >Break Minutes <input type="number" value={bm} onChange={(e)=>setBm(e.target.value)} /></label>
        <br />
        <label >Meeting Type <select value={mt} onChange={(e) => setMt(e.target.value)}>
  <option value="">Select meeting type</option>
  <option value="online">Online</option>
  <option value="offline">Offline</option>
</select>
</label>
        <br />
        <button type='submit'>Analyse</button>
      </form>
}
    </>
  )
}

export default App
