const express =  require('express')
const router = express.Router()

const controller = require('../logic/students')

router.route('/').get(controller.getStudents).post(controller.addStudent)
router.route('/:id').get(controller.getStudentById).delete(controller.removeStudent).put(controller.updateStudent)

module.exports = router