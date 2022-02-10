const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://Kujo:040500@vacqcluster.8mjtl.mongodb.net/VacQCluster?retryWrites=true&w=majority"
const connectDB = async () => {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB; 