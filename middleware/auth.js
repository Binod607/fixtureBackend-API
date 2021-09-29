const jwt=require('jsonwebtoken');
const User=require("../Models/User")
 //creating user auth middleware
module.exports.varifyUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token)
        const decodedData=jwt.verify(token,'secretkey');
        User.findById({_id:decodedData.userId}).then(function(alldata){
            req.user=alldata;
            next()
        }).catch(function(err){
            return res.status(201).json({success:true,msg:"Unauthorized access!!"})
        })
    }
    catch(err){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
}
 
module.exports.varifyAdmin=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='Admin'){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
    next()
}
 
module.exports.varifyParticularUser=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='User'){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
    next()
}
 
module.exports.varifyAdminorUser=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:true,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='User' || req.user.role!=='Admin'){
        next()
    }
}