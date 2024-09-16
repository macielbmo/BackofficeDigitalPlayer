import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 12;

interface MenuProps {
    onDelte: () => void;
    screen_id: string;
}

export default function LongMenu(props: MenuProps) {
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

    function handleOpenNewTab() {
        const url = `/player/${props.screen_id}`;
        window.open(url, '_blank'); // Abre o link em uma nova aba
    }

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
                            // maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                            height: ITEM_HEIGHT * 9
                        },
                    },
                }}
            >
                <MenuItem onClick={handleOpenNewTab}>
                    Player
                </MenuItem>
                <MenuItem onClick={handleDelete} >
                    Excluir
                </MenuItem>
            </Menu>
        </div>
    );
}