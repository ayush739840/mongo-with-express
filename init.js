const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
main()
.then(()=>{
    console.log("connection is successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let chat = [   
    {
    from:"saurabh",
    to: "tansk",
    message:"ayush had got his first internship",
    created_at: new Date(),
    },
    {
    from:"ayush",
    to: "ayush",
    message:"i am the best",
    created_at: new Date(),
    },
     {
    from:"modi",
    to: "rahul",
    message:"annenkhadram",
    created_at: new Date(),
    },
     {
    from:"god",
    to: "human",
    message:"do good work you get punya",
    created_at: new Date(),
    },
     {
    from:"india",
    to: "newzealand",
    message:"we win the world cup",
    created_at: new Date(),
    },
     {
    from:"dhurandhar",
    to: "toxic",
    message:"where is daddy",
    created_at: new Date(),
    },
     {
    from:"teacher",
    to: "student",
    message:"have you done your task",
    created_at: new Date(),
    },
     {
    from:"ayush",
    to: "amit",
    message:"lets study mongo express",
    created_at: new Date(),
    },
     {
    from:"sitara",
    to: "vidhyak",
    message:"i am your horse",
    created_at: new Date(),
    },

]
Chat.insertMany(chat);