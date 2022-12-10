import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://hssini:webservice@hssini.g6uuw.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected : ${conn.connection.host} `);
  } catch (error) {
    console.log(`error :  ${error.message}`);
  }
};

export default connectDB;
