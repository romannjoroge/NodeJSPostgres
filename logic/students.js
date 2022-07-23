// Where we interact with database
const pool = require('../db')

function getStudents(req, res){
    // res.status(200).send("Done")
    // console.log('Getting students')
    pool.query("SELECT * FROM students", (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getStudents,
}