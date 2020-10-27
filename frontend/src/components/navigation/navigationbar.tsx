import React from 'react';
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RegisterIcon from '@material-ui/icons/PersonAdd';
import LoginIcon from '@material-ui/icons/ExitToApp';
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';
import UserMenuButton from "./UserMenuButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

/* Modified component supplied by https://material-ui.com/components/app-bar/ */

const NavigationBar : React.FunctionComponent = () => {
    /*
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
     */
    const user : User | null = useSelector((state : AppState) => state.user);

    //const gttMedium = useMediaQuery('(min-width:650px)');
    const shortTitle = useMediaQuery('(min-width:600px');

    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                {shortTitle ?
                    <Typography variant="h6" noWrap>Some Movie Database</Typography>
                    :
                    <Typography variant="h6">SMDb</Typography>
                }
                <Link className="link" to="/">
                    <Button color="inherit">
                        <SearchIcon />Search movies
                    </Button>
                </Link>
                {user != null ? (
                    <div className="userOptions">
                        <Link className="link" to="/favorites">
                            <Button color="inherit">
                                <FavoriteBorderIcon />Favorites
                            </Button>
                        </Link>
                        <UserMenuButton />
                    </div>
                ) : (
                    <div className="userOptions">
                        <Link className="link" to="/registration">
                            <Button color="inherit">
                                <RegisterIcon />Register
                            </Button>
                        </Link>
                        <Link className="link" to="/login">
                            <Button color="inherit">
                                <LoginIcon />Login
                            </Button>
                        </Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;