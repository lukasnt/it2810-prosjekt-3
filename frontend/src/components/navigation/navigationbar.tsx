import React from 'react';
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RegisterIcon from '@material-ui/icons/PersonAdd';
import LoginIcon from '@material-ui/icons/ExitToApp';
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import Logout from '../user/logout';
import { AccountCircle } from '@material-ui/icons';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';

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
        <div className="navbarRoot">
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>*/}
                    <MovieIcon />
                    <Typography variant="h6" className="titleWide" noWrap>Some Movie Database</Typography>
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
                            <IconButton color="inherit">
                                <AccountCircle />
                                <Typography className="userName">
                                    {user?.firstName + " " + user?.lastName}
                                </Typography>
                            </IconButton>
                            <Logout />
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
        </div>
    );
};

export default NavigationBar;