import mongoose from "mongoose";

const DBConnection = () => {

    const DB_URI = `mongodb://user:user123_123@ac-vfuszdt-shard-00-00.8kgqddb.mongodb.net:27017,ac-vfuszdt-shard-00-01.8kgqddb.mongodb.net:27017,ac-vfuszdt-shard-00-02.8kgqddb.mongodb.net:27017/?ssl=true&replicaSet=atlas-12fveg-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting with DB', error.message);
    }
}

export default DBConnection;