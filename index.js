const express=require('express')
const cors=require('cors')
const router=require('./router')
const server=express()


server.use(cors())
server.use(express.json())
server.use(router)

server.get('/',(req,res)=>{
    res.send('Server is Running')
})

const PORT=3000
server.listen(PORT,()=>{
    console.log('Server is Running ');
    
})

