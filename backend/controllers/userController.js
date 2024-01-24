const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.registerController = async ( req , res) => {

     try {
      const { username , email , password } = req.body 
       
       if( !username , !email || !password ) {
         return res.status(400).send({
             success : false , 
             message : "please fill all fields"
         })
       }
        
        const existingUser = await userModel.findOne({email})
        if( existingUser ) {
             return res.status(401).send({
                 success : false ,
                 message : "user already there" ,
             })
        }

        const hasedPassword = await bcrypt.hash(password , 4) 
          
         const user =  new userModel({ username , email , password : hasedPassword })
          await user.save();

          return res.status(201).send({   
             success : true ,
             message : 'new user created' ,
             user
          })
        
      } catch (error) {
       console.log(error);
       return res.status(500).send({
         messagse : 'error in regiter user ' ,
         success : false ,
         error
       })
    }

}

exports.getAlluser = async (req , res) => {
     
      try {
        const user =  await userModel.find({});
       return res.status(201).send({
         userCount : user.length , 
         success : true , 
         message : "all user details " ,
          user 
       })
         
      } catch (error) {
        console.log(error);
        return res.status(500).send({
             success : false , 
             message : "Error in geting all user " ,
             error
        })
      } 
     
}

exports.loginController = async  (req , res ) => {
         
     try {
        
        const {  email , password } = req.body 
       
        if(  !email || !password ) {
          return res.status(400).send({
              success : false , 
              message : "please fill all fields"
          })
        }
      const user = await userModel.findOne({ email })

      if(!user) {
          return res.status(500).send({
             success : false , 
             message : "email is not register" 
          })
      }
         
      const isMatch = await bcrypt.compare(password, user.password);

        if( !isMatch ) {
             return res.status(401).send({
                 success : false , 
                 message : 'invalid username or password'
             })
        }
       
        return res.status(200).send({
             success : true , 
              message : "login successfully ",
              user
        })
         
 
     } catch (error) {
        console.log(error);
        return res.status(500).send({
             success : false , 
             message : "Error in geting login user " ,
             error
        })
     }

}

