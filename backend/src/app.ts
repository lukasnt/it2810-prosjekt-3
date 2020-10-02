import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";

const app : Application = express();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.get("/", (req : Request, res : Response) => {
    res.send("hello");
});

app.use("/api", router);

app.listen(3000, () => {
    console.log("App listening at http://localhost:3000");
});
