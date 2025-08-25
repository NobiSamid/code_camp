import mongoose from 'mongoose';


export const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfullyyyyyyyyyyyy');
  } catch(error){
    console.error('MongoDB connection failed', error);
    process.exit(1); // Exit process with failure
  }
}


///mongodb+srv://nobiSamid:nothings2ru@cluster0.selbi96.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0"