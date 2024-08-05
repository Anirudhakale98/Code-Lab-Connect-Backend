import dotenv from 'dotenv';
import connectDB from "./db/index.js"
import { app } from "./app.js";

dotenv.config({ path: '../.env' });


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR: app.on - ", error);
        throw error;
    });
    app.listen(process.env.PORT || 8080, () =>{
        console.log(`Sever is running on ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!", err);
});