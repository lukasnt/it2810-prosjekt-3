import React from "react";
import {Button, Typography} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {Movie} from "../../redux/reducers/searchresult";
import {AppState} from "../../redux/store";
import {User} from "../../redux/reducers/user";
import {postData} from "../../utils/ajax";
import {addFavorite, removeFavorite} from "../../redux/actions/users";

export interface FavoriteButtonProps {
    movie : Movie;
}

const FavoriteButton : React.FunctionComponent<FavoriteButtonProps> = ({movie}) => {

    const user : User | null = useSelector((state : AppState) => state.user);    
    const dispatch : Dispatch<any> = useDispatch();

    // Post the movie from the props to the databse
    function postFavorite() : void {
        postData("http://localhost:8080/api/user/favorite", { movie: movie }, user?.token)
            .then(() => {
                dispatch(addFavorite(movie));
            });
    }

    // Delete the movie from the props in the databse
    function deleteFavorite() : void {
        postData("http://localhost:8080/api/user/favorite", { movie: movie }, user?.token, "DELETE")
            .then(() => {
                dispatch(removeFavorite(movie));
            });
    }

    return (
        <div className="favoriteButton">
            {user != null && user.favorites != null ? (

                (user.favorites.map(movie => movie.tconst).includes(movie.tconst)) ? (
                    <Button data-cy='remove_favorite_button' onClick={deleteFavorite}>
                        <FavoriteIcon color="secondary" fontSize="large"/>
                        <Typography variant="button" style={{color: "white", marginLeft: '10px'}}> Remove favorite </Typography>
                    </Button>
                ) : (
                    <Button data-cy='add_favorite_button' onClick={postFavorite}>
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