import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 12;

interface MenuProps {
    onDelte: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

export default function MenuCardPlaylist(props: MenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        props.onDelte();
        handleClose();
    };

    const handleMoveUp = () => {
        props.onMoveUp();
        handleClose();
    };

    const handleMoveDown = () => {
        props.onMoveDown();
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            width: '25ch',
                            height: ITEM_HEIGHT * 11
                        },
                    },
                }}
            >
                <MenuItem onClick={handleDelete} >
                    Remover da Playlist
                </MenuItem>
                <MenuItem onClick={handleMoveUp} >
                    Mover ↑
                </MenuItem>
                <MenuItem onClick={handleMoveDown} >
                    Mover ↓
                </MenuItem>
            </Menu>
        </div>
    );
}