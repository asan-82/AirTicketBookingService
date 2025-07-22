const express=require('express');
const app=express();
const {PORT}=require("../src/config/serverConfig");
const apiRoutes=require("./routes/index");
const db=require("./models/index");


const setupAndStartServer = () => {
 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Mount API routes
    app.use("/api", apiRoutes);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
        
        // Optional DB sync
        /*
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
        */
    });
};

setupAndStartServer();