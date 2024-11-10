import express, { query } from "express";
import HomeController from "../controllers/home_controller.js";
import CvController from "../controllers/cv_controller.js";
const rootRouter = express.Router()

  rootRouter.get("/about", HomeController.about );
  
  rootRouter.get("/", HomeController.index);
  rootRouter.get("/cv", CvController.detail);
  
  
  export default rootRouter;