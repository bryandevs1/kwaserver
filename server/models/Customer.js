const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  tel: String,
  email: String,
  details: String,
  profileImage: String, // Ensure this field matches your schema
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", customerSchema);
console.log("Customer model loaded"); // Add this line in the model file

module.exports = Customer;
