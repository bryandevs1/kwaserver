const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb+srv://bryanojji4:rbMiN5cxNlKqXuVu@cluster.focgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
    );
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
