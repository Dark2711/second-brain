import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Connected to DB:  ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`MongoDB connection error`, error);

    }
}

export default connectDB;