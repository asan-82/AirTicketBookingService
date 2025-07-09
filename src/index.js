const express=require('express');
const app=express();
const {PORT}=require("../src/config/serverConfig");
const apiRoutes=require("./routes/index");
const db=require("./models/index");


const setupAndStartServer=()=>{
    app.listen(PORT,()=>{
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/api",apiRoutes);
        console.log(`Server listening on ${PORT}`);
        /*if(process.env.DB_SYNC)
        {
            db.sequelize.sync({alter:true});

        }
            */
           
    });
    
}

setupAndStartServer();