const express = require('express')

const app = express()

app.get('/', (req,res) =>{
    res.send('Hello from node')
})

const PORT = progress.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server run at port ${PORT}`))