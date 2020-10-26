import React from "react";
import {Button, Typography} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {User} from "../utils/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../utils/store";
import { Movie } from "../utils/reducers/searchresult";
import { postData } from "../utils/ajax";
import { Dispatch } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite, setUser } from "../utils/actions/users";

export interface FavoriteButtonProps {
    movie : Movie;
}

const FavoriteButton : React.FunctionComponent<FavoriteButtonProps> = ({movie}) => {

    const user : User | null = useSelector((state : AppState) => state.user);    
    const dispatch : Dispatch<any> = useDispatch();

    function postFavorite() : void {
        postData("http://localhost:8080/api/user/favorite", { movie: movie }, user?.token)
            .then(res => {
                dispatch(addFavorite(movie));
            });
    }

    function deleteFavorite() : void {
        postData("http://localhost:8080/api/user/favorite", { movie: movie }, user?.token, "DELETE")
            .then(res => {
                dispatch(removeFavorite(movie));
            });
    }

    return (
        <div className="favoriteButton">
            {user != null && user.favorites != null ? (

                (user.favorites.map(movie => movie.tconst).includes(movie.tconst)) ? (
                    <Button onClick={deleteFavorite}>
                        <FavoriteIcon color="secondary" fontSize="large"/>
                        <Typography variant="button" style={{color: "white", marginLeft: '10px'}}> Remove favorite </Typography>
                    </Button>
                ) : (
                    <Button onClick={postFavorite}>
                        <FavoriteBorderIcon color="secondary" fontSize="large"/>
                        <Typography variant="button" style={{ color: "white", marginLeft: '10px'}}> Add favorite </Typography>
                    </Button>
                )
            ) : (
                <Button href="/login">
                    <FavoriteBorderIcon color="secondary" fontSize="large"/>
                    <Typography variant="button" style={{color: "white", marginLeft: '10px'}}> Add favorite </Typography>
                </Button>
            )}
        </div>
    )
};

export default FavoriteButton;