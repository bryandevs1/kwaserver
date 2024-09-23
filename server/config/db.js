const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb+srv://asinma209:QGSzk3RuJl8brSxa@cluster0.uezam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
