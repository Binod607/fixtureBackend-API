const mongoose=require('mongoose')
//creating user addFAv
const AddFav=mongoose.model('AddFav',{
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    }
})
module.exports=AddFav