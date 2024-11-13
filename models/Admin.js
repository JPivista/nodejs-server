const mongoose = require('mongoose');

// Define the schema for the Admin collection
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'admin' },
    createdAt: { type: Date, default: Date.now },
});

// Create the Admin model based on the schema
const Admin = mongoose.model('Users', adminSchema);

// Export the model
module.exports = Admin;


// const mongoose = require('mongoose');
// const EmployeeSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
// const Employee = mongoose.model('Employee', EmployeeSchema);
// module.exports = Employee;



// const mongoose = require('mongoose')
// const EmployeeSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })
// const EmployeeModel = mongoose.model("employees", EmployeeSchema)
// module.exports = EmployeeModel