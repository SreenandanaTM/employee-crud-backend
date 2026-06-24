const express=require('express')
const { getAllEmp, addEmp, removeEmp, getEmpDetails, updateEmp} = require('./controller/employeeController')
const router=express.Router()

// get all employee
router.get('/all-emp',getAllEmp)

// add employee
router.post('/all-emp',addEmp)

// get a employee details
router.get('/get-emp/:id',getEmpDetails)

// update employee details
router.put('/update-emp/:id',updateEmp)

// delete employee
router.delete('/remove-emp/:id',removeEmp)

module.exports=router