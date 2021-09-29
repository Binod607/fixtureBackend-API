const express=require('express');
const bpdyparser=require('body-parser');
const cors=require('cors')
const bodyParser = require('body-parser');
const db=require('./Database/db')
const path=require("path")
//import all teh component
const { static } = require('express');
const Comment=require('./Routes/CommentRoute')
const URouter=require('./Routes/UserRoutes')
const Productroute=require("./Routes/productRoute")
const AddFav=require("./Routes/AddFavRoute")
const app=express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(cors())
app.use(URouter)
app.use(Productroute)
app.use(Comment)
app.use(AddFav)
app.listen(90)