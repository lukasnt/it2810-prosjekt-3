import React from 'react';
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom"
import { User } from '../utils/reducers/user';
import { useSelector } from 'react-redux';
import { AppState } from '../utils/store';
import Logout from '../logout';

/* Modified component supplied by https://material-ui.com/components/app-bar/ */

const NavigationBar : React.FunctionComponent = () => {
    /*
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
     */

  const user : User | null = useSelector((state : AppState) => state.user);

    return (
        <div className="root">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        A Movie Database
                    </Typography>
                    <Link className="link" to="/"><Button color="inherit">Search movies</Button></Link>
                    {user != null ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Logout />
                        </div>
                    ) : (
                        <div>
                            <Link className="link" to="/registration"><Button color="inherit">Register</Button></Link>
                            <Link className="link" to="/login"><Button color="inherit">Login</Button></Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationBar;