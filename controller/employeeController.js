const data = require('../db.json');
const fs = require("fs")

//  post employee or add
const addEmp = (req, res) => {
    try {
        const newEmployee = { ...req.body }
        data.employees.push(newEmployee)
        res.status(201).json(data.employees)

    } catch (error) {
        res.status(500).json(error)
    }
}

// get a employee details
const getEmpDetails = (req, res) => {
    const empDetails = data.employees.find(emp => emp.id == req.params.id)
    res.status(200).json(empDetails)

}

// update employee details
const updateEmp = (req, res) => {
    const empDetails = data.employees.find(emp => emp.id == req.params.id)
    empDetails.id = req.body.id
    empDetails.name = req.body.name
    empDetails.email = req.body.email
    empDetails.phone = req.body.phone
    empDetails.department = req.body.department
    empDetails.designation = req.body.designation
    empDetails.salary = req.body.salary
    empDetails.location = req.body.location
    res.status(200).json(empDetails)
}

// delete employee
const removeEmp = (req, res) => {
    try {
        data.employees = data.employees.filter(emp => emp.id != req.params.id)
        res.status(200).json("Employee Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}
// get all employee or server side seacrh employee
const getAllEmp = (req, res) => {
    const searchText = req.query.search
    if (searchText) {
        const result = data.employees.filter(emp => emp.name.toLowerCase().includes(searchText.toLowerCase()))
        res.json(result)

    }

}

// server side pagination 
const paginationController = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const result = data.employees.slice(start, end);
    res.json({ total: data.employees.length, data: result })
}

importEmployeeController = (req, res) => {
    const importedEmployees = req.body;
    fs.readFile("./db.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json("Unable to read file");
        }
        try {
            const jsonData = JSON.parse(data)
            jsonData.employees.push(...importedEmployees)
            fs.writeFile("./db.json", JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    res.status(500).json("Unable to save data")
                }
                res.status(200).json({ message: "Employee imported successfully", employees: jsonData.employees })
            });
            

        } catch (error) {
            res.status(500).json("Invalid JSON Format")
        }
    })
}

module.exports = { getAllEmp, addEmp, getEmpDetails, updateEmp, removeEmp, paginationController,importEmployeeController }