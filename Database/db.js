const mongoose=require('mongoose');
//Creating Data base and intilizing the url
mongoose.connect('mongodb://127.0.0.1:27017/SharmaInt', {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology : true
})