// Where we interact with database
const pool = require('../db')
const queries = require('../models/queries') // Store queries in seperate file

function getStudents(req, res){
    // res.status(200).send("Done")
    // console.log('Getting students')
    pool.query(queries.getStudents, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

function getStudentById(req, res){
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

function addStudent(req, res){
    const {name, email, age, dob} = req.body

    // Check if email already exists
    pool.query(queries.checkEmail, [email], (error, result)=>{
        if (error) throw error
        if (result.rows.length){
            res.status(400).send("Email already exists")
        }

        // Adding the email
        pool.query(queries.addStudent, [name, email, age, dob], (error, result)=>{
            if (error) throw error
            res.status(201).send("Student created succesfully")
        })
    })
}

function removeStudent(req, res){
    const id = parseInt(req.params.id)
    
    // Removing the student
    pool.query(queries.getStudentById, [id], (error, results)=>{
        if (error) throw error
        if (!results.rows.length){
            res.status(404).send(`Student with id ${id} not found!`)
        }
        pool.query(queries.removeStudent, [id], (error, results)=>{
            if (error) throw error
            res.status(200).send(`Student with id ${id} removed`)
        })
    })
}

function updateStudent(req, res){
    const id = parseInt(req.params.id)
    const name = req.body.name

    // Check if student exists
    pool.query(queries.getStudentById, [id], (error, result)=>{
        if (error) throw error
        if (!result.rows.length){
            res.status(404).send(`Student with id ${id} not found`)
        }
        pool.query(queries.updateStudent, [name, id], (error, result)=>{
            if (error) throw error
            res.status(201).send(`Student with id ${id} updated`)
        })
    })
}
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
}