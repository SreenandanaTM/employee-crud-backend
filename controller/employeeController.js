 const data=require('../db.json');


//  get all employee
 const getAllEmp=(req,res)=>{
    res.json(data.employees);
 };

//  post employee or add
const addEmp=(req,res)=>{
    try {
        const newEmployee={...req.body}
        data.employees.push(newEmployee)
        res.status(201).json(data.employees)
        
    } catch (error) {
       res.status(500).json(error) 
    }
}

// get a employee details
const getEmpDetails=(req,res)=>{
        const empDetails=data.employees.find(emp=>emp.id==req.params.id)
        res.status(200).json(empDetails)
    
}

// update employee details
const updateEmp=(req,res)=>{
    const empDetails=data.employees.find(emp=>emp.id==req.params.id)
    empDetails.id=req.body.id
    empDetails.name=req.body.name
    empDetails.email=req.body.email
    empDetails.phone=req.body.phone
    empDetails.department=req.body.department
    empDetails.designation=req.body.designation
    empDetails.salary=req.body.salary
    empDetails.location=req.body.location
    res.status(200).json(empDetails)
}

// delete employee
const removeEmp=(req,res)=>{
    try {
        data.employees=data.employees.filter(emp=>emp.id!=req.params.id)
        res.status(200).json("Employee Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

 module.exports={getAllEmp,addEmp,getEmpDetails,updateEmp,removeEmp}