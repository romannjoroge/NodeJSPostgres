const express =  require('express')
const router = express.Router()

const{
    getStudents,
    
} = require('../logic/students')

router.get('/', getStudents)

module.exports = router