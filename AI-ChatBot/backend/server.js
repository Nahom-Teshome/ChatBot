const express = require('express')
const app = express()
const chatRoutes = require('./routes/chatRoutes')
app.use(express.json())
app.use((req,res,next)=>{
    next()
})
app.use('/api/chat/',chatRoutes)
app.listen(1000, ()=>{
    console.log("listening on port 1000")
})