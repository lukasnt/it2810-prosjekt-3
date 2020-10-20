import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";
import { authTokens } from "./controllers/user";
import cors from "cors";
import { connect, db } from "./data/database";

const app : Application = express();

// Connect to Database
connect();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true , type: 'application/x-www-form-urlencoded'}));

// To support JSON-encoded bodies
app.use(bodyParser.json({ type: 'application/json' }))

// To parse cookies from the HTTP Request
app.use(cookieParser());

// Enable cors-headers
app.use(cors());

app.use((req : Request, res : Response, next : NextFunction) => {
    // Get auth token from the cookies
    let authToken : string = req.cookies['AuthToken'];

    // If token is not in cookie and in header
    if (!authToken) authToken = req.headers["authorization"] as string;

    // Inject the user to the request
    req.body.user = authTokens.get(authToken);

    next();
});

app.get("/", (req : Request, res : Response) => {
    res.send("hello");
});

app.use("/api", router);

app.listen(8080, () => {
    console.log("App listening at http://localhost:8080");
});
