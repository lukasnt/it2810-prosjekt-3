import express, { Router, Request, Response } from "express";
import { searchMovies } from "../data/movie";

function parseStringArray(text : string) : Array<string> {
    return text.split(",");
}

const router : Router = express.Router();

router.get("/search", (req : Request, res : Response) => {
    let query : string = req.query.query as string;
    let filters : Array<string> = req.query.filters == undefined ? [] : parseStringArray(req.query.filters as string);
    let orderField : string = req.query.orderField == undefined ? "relevance" : req.query.orderField as string;
    let orderDir : number = req.query.orderDir == undefined ? 1 : parseInt(req.query.orderDir as string);
    let page : number = req.query.page == undefined ? 1 : parseInt(req.query.page as string);

    searchMovies(query, page, 25, orderField, orderDir, filters).then(docs => {
        res.send(docs);
    })
});

export default router;