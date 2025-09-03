const express=require('express');


// PORT
PORT=process.env.PORT || 3000
const app=express()



app.get('/',(req,res)=>{
    res.send("HI ! SmartPost Ai Agent")

})



app.listen(PORT,()=>{
  console.log("the express app is running!")
})