import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import {Menu} from "@material-ui/core";
import Logout from "../logout";
import React from "react";
import {User} from "../utils/reducers/user";
import {useSelector} from "react-redux";
import {AppState} from "../utils/store";

export default function UserMenuButton() {

    const user: User | null = useSelector((state: AppState) => state.user);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="menuButton">
            <IconButton color="inherit" aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircle/>
                <Typography className="userName">
                    {user?.firstName + " " + user?.lastName}
                </Typography>
            </IconButton>
        <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <Logout />
        </Menu>
        </div>
    )
    }
