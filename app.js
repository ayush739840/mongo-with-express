const express=require('express');
const app= express();
const ExpressError =require("./ExpressError");
let port= 8080;
const mongoose = require('mongoose');
const Chat = require("./models/chat");
const methodOverride= require("method-override");
const path= require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs"); 
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"));


main()
.then(()=>{
    console.log("connection is successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/",(req,res)=>{
    res.send("route is working");
})


app.get("/chats", async (req,res)=>{
    try {
        let chats = await Chat.find();
        res.render("index.ejs",{chats})
    } catch (err) {
        next(err);
    }
})

app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"page not found");
    res.render("new.ejs")
})

// let create Route

app.post("/chats", async (req,res)=>{
    try {
        let {from,message,to}= req.body;
        let newChat = new Chat({
            from:from,
            to:to,
            message:message,
            created_at: new Date(),
        })
        await newChat.save()
        res.redirect("/chats")
    
    }
   catch(err){
        next(err);
   }
    
});
//New _ Show route
app.get("/chats/:id" , asyncWrap (async (req,res,next)=>{
   
         let {id} =req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            next(new ExpressError(404 , "chat not found"));
        }
        res.render("edit.ejs" , {chat});
   
   
}));

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err) => next(err));
    }
}
app.get("/chats/:id/edit",  asyncWrap(async (req,res)=>{
    
        let {id} =req.params;
        let chat=  await Chat.findById(id);
 
        res.render("edit.ejs",{chat});
   
    
    
  
}))

// update route
app.put("/chats/:id",asyncWrap( async (req,res)=>{
    
        let {id} =req.params;
        let{message:newMsg}=req.body;
        console.log(newMsg);
        let updatedChat= await Chat.findByIdAndUpdate(id ,
            { message:newMsg},{runValidators:true , new:true});
        console.log(updatedChat);
        res.redirect("/chats");
   
   
    
}))

// Destroy route
app.delete("/chats/:id",  asyncWrap(async (req,res)=>{
    
        let {id} =req.params;
        let chatDeleted= await Chat.findByIdAndDelete(id);
        console.log(chatDeleted);
        res.redirect("/chats");
}))


const handleValidationErr = (err)=>{
    console.log(" this was a validation error. Please follow rules");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name === "ReferenceError"){
        err = handleValidationErr(err);
    }
    next(err);
});

// error handeling middleware
app.use((err,req,res,next)=>{
    let{status=500,message="some error occured"}=err;
    res.status(status).send(message);
})
app.listen(port,()=>{
    console.log(`app is listening to the port ${port}`);
})
// let chat1 = new Chat({
//     from:"harman",
//     to: "sanu",
//     message:"send me your exam sheets",
//     created_at: new Date(),
// })
// chat1.save()
// .then((res)=>{
//     console.log(res)
// })
// .catch((err)=>{
//     console.log(err);
// })


