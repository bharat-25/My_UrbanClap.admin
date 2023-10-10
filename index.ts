import express,{Express} from "express"
import {  sequelize } from "./src/databases/connection";
import { adminRouter } from "./src/routes/admin.route";
import { adminContext, portNumber } from "./src/constant/constant";
import {loggers} from "./src/middleware/logger/logger.middleware"

class App{
    private app!:Express;
    private port!:number|string;
    private admincontext!:string;

    constructor() {
        this.startApp();
    }
    startApp(){
        this.app=express();
        this.port=process.env.PORT
        this.loadGlobalMiddleWare();
        sequelize;
        this.loadRouter();
        this.Server();
        
    } 
    loadGlobalMiddleWare() {
        this.admincontext = adminContext;
        this.app.use(express.json());
        this.port = portNumber;
    
    }
    loadRouter() {
        this.app.use(this.admincontext ,adminRouter.adminRouter());
      }
    Server() {
        this.app.listen(this.port, this.callback);
    }
      private callback = () => {
        loggers.info(`Server listing on port: ${this.port}`);
          };
    }
    new App();