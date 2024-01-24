const mongoose = require('mongoose')

const conectDB = async () => {
     try {
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("conneted to db ");

     } catch (error) {
        console.log("mongoose error " , error);
     }
}
module.exports = conectDB