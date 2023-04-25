//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app=express();
const port=process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1589131",
  key: "21b2b234d78b48e7a505",
  secret: "a5efbc654d27efc2f98c",
  cluster: "mt1",
  useTLS: true
});

const db=mongoose.connection;
db.once("open",()=>{
  console.log("Connected")
  const msgCollection=db.collection("messagecontents");
const changeStream=msgCollection.watch();

changeStream.on("change",(change)=>{
  console.log(change);

  if(change.operationType=='insert'){
    const messageDetails=change.fullDocument;
    pusher.trigger('messages','inserted',{ //messages-pusher channel name(could be anything)
      name:messageDetails.name,            //inserted-event name (could be anything)
      message:messageDetails.message,
      timestamp:messageDetails.timestamp,
      received:messageDetails.received
    })
  }
  else{
    console.log("Error trigerring pusher!")
  }
})
});


//middleware
app.use(express.json()); // converts string into JSON 

app.use(cors());

// app.use((req,res,next)=>{
//   req.setHeader("Access-Control-Allow-Origin","*");    //This while can be replaced by using cors
//   req.setHeader("Access-Control-Allow-Headers","*");
//   next();

// });

//DB config
const connection_url=process.env.MONGODB_URL;
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