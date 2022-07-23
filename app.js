const express = require('express')
const app = express()

const student = require('./routes/students')

app.use(express.json())

app.use('/api/v1/students', student)

app.get('*', (req, res)=>{
    res.status(404).json({'success':false, 'message':'Could not find resource'})
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000')
})