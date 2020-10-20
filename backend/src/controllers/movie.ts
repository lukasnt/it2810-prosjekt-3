import express, { Router, Request, Response } from "express";
import { findSingleMovie, searchMovies } from "../data/movie";

function parseStringArray(text : string) : Array<string> {
    return text.split(",");
}

const router : Router = express.Router();

router.get("/single/:tconst", (req : Request, res : Response) => {
    const tconst : string = req.params.tconst as string;

    findSingleMovie(tconst).then(result => {
        res.send(result);
    })
});

router.get("/search", (req : Request, res : Response) => {
    let query : string = req.query.query as string;
    let filters : Array<string> = req.query.filters == undefined ? [] : parseStringArray(req.query.filters as string);
    let orderField : string = req.query.orderField == undefined ? "voteCount" : req.query.orderField as string;
    let orderDir : number = req.query.orderDir == undefined ? -1 : parseInt(req.query.orderDir as string);
    let page : number = req.query.page == undefined ? 1 : parseInt(req.query.page as string);
    let pageSize : number = req.query.pageSize == undefined ? 25 : parseInt(req.query.pageSize as string);
    let callID : number = req.query.callID == undefined ? 0 : parseInt(req.query.callID as string);

    searchMovies(query, page, pageSize, orderField, orderDir, filters).then(result => {
        res.send({ result: result, callID: callID });
    })
});

export default router;