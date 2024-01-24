const express = require('express')
const { getAlluser, registerController, loginController } = require('../controllers/userController')

const router = express.Router()

router.get('/all-users' , getAlluser  )

router.post('/register' , registerController  )

router.post('/login' , loginController  )



module.exports = router 
