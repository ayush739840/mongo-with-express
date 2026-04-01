const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  age:Number
});

const User = mongoose.model("User", userSchema);
/*const user2 = new User({
  name:"Eelina",
  email:"elina@gmail.com",
  age:28
});

user2.save()
.then((res)=>{
  console.log(res);
})
.catch((err)=>{
  console.log(err);
});*/

// User.insertMany([
//    {name:"tony", email:"tony@gmail.com",age:50},
//    {name:"stark", email:"stark@gmail.com",age:50},
//    {name:"peter", email:"peter@gmail.com",age:28},
//    {name:"parker", email:"parker@gmail.com",age:28}
// ]).then((data)=>{
//   console.log(data);
// })
User.findOneAndUpdate({name:"tony"},{age:60},{new :true}).then((data)=>{
  console.log(data);
}).catch((err)=>{
  console.log(err);
} )
// User.updateOne({name:"tony"},{age:35}).then((res)=>{
//   console.log(res);
// })