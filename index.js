const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const cookieParser=require('cookie-parser');
const router=require('./routers/auth');
const upload =require('./routers/upload/upload');
const post=require('./routers/post/post');
const users=require('./routers/users/users');
const jwt=require('jsonwebtoken');
const app=express();

mongoose.set('useFindAndModify', false);
const image =require('./Model/image')
const PORT=4000;
const dbURL=`mongodb+srv://${process.env.DBUSER}:${process.env.PASS}@cluster0.vmjpo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
app.use(cookieParser());


  app.use(cors({origin:'http://localhost:3000',credentials:true}));

app.use(bodyParser.json({limit:'30mb'}));
console.log(process.env.DBNAME)
app.use(express.json());

app.use('/auth',router);


app.use('/upload',upload);
app.use('/post',post);
app.use('/users',users);

app.get('/verify',(req,res)=>{
   
})
app.use('/',(req,res)=>res.send("server"));
mongoose.connect(dbURL,{  useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
    if(err) console.log("NOT CONNECTED TO DB")
    else{
        console.log("CONNNETD TO DB")
        app.listen(PORT,()=>(console.log(`running on port ${PORT}`)))
    }
})



