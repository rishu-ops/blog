const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const conectDB = require('./db');


dotenv.config();

const userRoutes = require('./routes/userRoute')
const blogRoutes = require('./routes/blogRouter')

conectDB();

const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/blog' , blogRoutes)

 const PORT = process.env.PORT || 8080

app.listen(8080 , () => { 
     console.log(`server Running ${process.env.DEV_MODE} in port ${PORT}` );
})


