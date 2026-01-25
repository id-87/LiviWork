const express=require("express")
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Heal')

})

app.post('/predict',(req,res)=>{
    const {meetings_per_day,total_minutes,break_minutes,role,meeting_type}=req.body
    
})

app.listen(3000,()=>{
    console.log("Server is running")

})