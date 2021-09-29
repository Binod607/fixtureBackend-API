const mongoose=require('mongoose')
//creating user model
const User=mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    role:{
        type:String,
        enum:['User','Admin'],
        defult:'User'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})
module.exports=User;