const express=require("express")
require('dotenv').config()
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const axios=require('axios')
const mlURL=process.env.mlURL
//
app.get('/',(req,res)=>{
    res.send('Heal')

})

app.get('/ml',async(req,res)=>{
    try{
        const data=await axios.get(mlURL)
        return res.send(data)
    }
    catch(err){
        res.send(JSON.stringify(err.message))
    }
})

app.post('/predict',async(req,res)=>{
    const {meetings_per_day,total_minutes,break_minutes,role,meeting_type}=req.body
    console.log(req.body)
    try{
        if (
    typeof meetings_per_day !== "number" ||
    typeof total_minutes !== "number" ||
    typeof break_minutes !== "number" ||
    !["student", "developer", "manager"].includes(role) ||
    !["online", "offline"].includes(meeting_type)
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  let inputData={
    meetings_per_day,
    total_minutes,
    break_minutes,
    role,
    meeting_type
  }

  const mlResponse=await axios.post(mlURL+'/predict',inputData)
  return res.json(mlResponse.data)

    }
    catch(err){
        console.log(err)
        res.send(err.message)
    }
    


})

app.listen(3000,()=>{
    console.log("Server is running")

})