import React from 'react';
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RegisterIcon from '@material-ui/icons/PersonAdd';
import LoginIcon from '@material-ui/icons/ExitToApp';
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserMenuButton from "./usermenubutton";

const NavigationBar : React.FunctionComponent = () => {

    const user : User | null = useSelector((state : AppState) => state.user);

    //const gttMedium = useMediaQuery('(min-width:650px)');
    const screenMin600 = useMediaQuery('(min-width:600px');

    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <div className="navbarLeft">
                    <Typography className="navbarTitle" variant="h6" noWrap>
                        {screenMin600 ? "Some Movie Database" : "SMDb"}
                    </Typography>
                </div>
                <div className="navbarMiddle">
                    <Link className="link" to="/">
                        <Button color="inherit">
                            <SearchIcon />Search
                        </Button>
                    </Link>
                </div>
                {user != null ? (
                    <div className="navbarRight">
                        <Link className="link" to="/favorites">
                            <Button color="inherit">
                                <FavoriteBorderIcon />Favorites
                            </Button>
                        </Link>
                        <UserMenuButton />
                    </div>
                ) : (
                    <div className="navbarRight">
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