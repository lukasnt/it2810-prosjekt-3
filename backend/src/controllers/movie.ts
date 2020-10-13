import express, { Router, Request, Response } from "express";
import { searchMovies } from "../data/movie";

const router : Router = express.Router();

router.get("/search", (req : Request, res : Response) => {
    let query : string = req.query.query as string;
    /*
    let filters : Array<String> = req.query.filters as Array<String>;
    let order : string = req.query.order as string;
    let page : number = parseInt(req.query.page as string);
    */
    searchMovies(query).then(docs => {
        res.send(docs);
    })
});

export default router;