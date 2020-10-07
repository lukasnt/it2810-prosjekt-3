import React from 'react';
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Button} from "@material-ui/core";

/* Modified component supplied by https://material-ui.com/components/app-bar/ */

const NavigationBar : React.FunctionComponent = () => {
    /*
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
     */
    let auth : boolean = true;

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
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    )}
                    <Button color="inherit">Register</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationBar;