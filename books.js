const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        min:[1,"price is too low for Amazon selling"],
    },
    discount:{
        type: Number,
        default:25,
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"],
        default:"fiction",
    },
    genre:[String],
});

const Book = mongoose.model("Book",bookSchema);

// Book.deleteOne({author:"RD Sharma"},{new:true}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })



// const book1 =new Book({
//     title:"marval comics II",
//     author:"stan lee",
//     price:176,
//     discount:21,
//     genre:["fiction","Superhero","adventures"],
// })
// book1.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

Book.findByIdAndUpdate('698c2e2f3bc6d4b478cb62d5',
    {price:-600 },{runValidators:true}).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err.errors.price.properties.message);
});