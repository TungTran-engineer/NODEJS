import express from "express";
import rootRouter from "./routes/root.js";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import bookrouter from "./routes/booktripRoutes.js";

connectDB();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })  
);
app.use(bodyParser.json()); 

// Set view engine and static files
app.set("view engine", "ejs");
app.set("views", "./buoi7/bt/views");
app.use(express.static("./buoi4/public"));

// Routes
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/cv", userRouter);
app.use("/book", bookrouter);

app.listen(port, () => {
  console.log("Server started on port", port);
});
