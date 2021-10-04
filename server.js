const express = require('express')
const mongoose = require('mongoose')

const {MONGO_URI} = require('./config')


//Routes

const phoneslistRoutes = require('./routes/phoneslist')
const phoneRoutes = require('./routes/phone')

const cors = require('cors');
const app = express() 
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.options('*', cors());

//Body Parser Middleware

app.use(express.json())


// Connect MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

app.get('/', (req,res) =>{
    res.send('Hello from node')
})


// Use routes
app.use('/phoneslist', phoneslistRoutes)
app.use('/phone', phoneRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server run at port ${PORT}`))