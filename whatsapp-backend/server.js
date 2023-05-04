//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import User from './dbUser.js';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
dotenv.config({ path: "./.env.local" });
import jwt from 'jsonwebtoken';
 let success=false;
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
  // console.log(change);

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

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.post("/createuser", async (req,res)=>{
  success=false;
  const dbuser=req.body;
  const salt= await bcrypt.genSalt(20);
  const securePass=await bcrypt.hash(dbuser.password,salt);
  let checkUser=await User.findOne({email:dbuser.email});
    if(checkUser){
      return res.status(400).send("User already exists with this email");

    }
  

 User.create({
    email:dbuser.email,
    password:securePass,
    name:dbuser.name
  })
  .then((data) => {
    // res.status(201).send(data);
    const token=jwt.sign({id:data.id},"mamamamal");
    success=true

    res.json({data,token,success});
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
});

app.post("/login", async (req,res)=>{
  success=false;
  const loginUser=await User.findOne({email:req.body.email});
  try{
    if(!loginUser){
    return res.status(400).send("Login with correct credentials");
  }
  const checkPass= await bcrypt.compare(req.body.password,loginUser.password);
  if(!checkPass){
    return res.status(400).send("Login with correct credentials"); 
  }
  const token=jwt.sign({id:loginUser.id},"mamamamal"); 
  success=true
  res.json({token,success,username:loginUser.name}); //only sucess and AuthToken can be accessed from frontend now
  
}
catch(err){
  res.status(500).send(err)
}

})

 

//Listen
app.listen(port,()=>console.log(`Listening on port:${port}`));