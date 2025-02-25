import mongoose from "mongoose"

const dataBaseConnection = async () =>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((error)=>{
        console.log("Error connecting to MongoDB", error)
    })
}
export default dataBaseConnection