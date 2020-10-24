import React from "react";
import {Button, IconButton, Typography} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {User} from "../utils/reducers/user";
import {useSelector} from "react-redux";
import {AppState} from "../utils/store";

export interface FavoriteButtonProps {
    movieId : string;
}

const FavoriteButton : React.FunctionComponent<FavoriteButtonProps> = ({movieId}) => {

    const user : User | null = useSelector((state : AppState) => state.user);

    return (
        <div className="favoriteButton">
            {user != null && user.favorites != null ? (

                (user.favorites.map(movie => movie.tconst).includes(movieId)) ? (
                    <IconButton>
                        <FavoriteIcon color="secondary" fontSize="large"/>
                        <Typography style={{color: "white", marginLeft: '10px'}}>Remove favorite</Typography>
                    </IconButton>
                ) : (
                    <Button>
                        <FavoriteBorderIcon color="secondary" fontSize="large"/>
                        <Typography style={{ color: "white", marginLeft: '10px' }}>Add favorite</Typography>
                    </Button>
                )
            ) : (
                <Button href="/login">
                    <FavoriteBorderIcon color="secondary" fontSize="large"/>
                    <Typography style={{color: "white", marginLeft: '10px'}}>Add favorite</Typography>
                </Button>
            )}
        </div>
    )
};

export default FavoriteButton;