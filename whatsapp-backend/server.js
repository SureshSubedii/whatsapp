//importing
import express from 'express'
import mongoose from 'mongoose';
import Messages from './dbMessages.js';

//app config
const app=express();
const port=process.env.PORT || 9000;

//middleware
app.use(express.json()); // converts string into JSON 

//DB config
const connection_url='mongodb+srv://Suresh:1Lq05XJXjwEcy2vD@cluster1.5jnc7pa.mongodb.net/whatsappdb'
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//??????

//routes
app.get('/',(req,res)=>res.status(200).send("Hello World"));
app.post("/message/new",(req,res)=>{
    const messagedb=req.body; //take the message from the body
    Messages.create(messagedb) // Store the taken message in the schema
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
})
app.get("/message/sync",(req,res)=>{
    Messages.find()
    .then((data=>res.status(200).send(data)))
    .catch(err=>res.status(500).send(err))

})

//Listen
app.listen(port,()=>console.log(`Listening on port:${port}`));