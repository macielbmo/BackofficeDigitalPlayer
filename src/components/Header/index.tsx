import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';
import logoName from '../../assets/img/logo-name.png';
import { Avatar, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { logout } from '../../../services/auth.service';

const pages = [
    { name: 'Conteúdo', path: '/' },
    { name: 'Telas', path: '/screens' },
    { name: 'WebSites', path: '/websites' }
];

export function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const location = useLocation();

    const isSelected = (path: string) => location.pathname === path;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const goDashboard = () => {
        window.location.href = '/';
    };

    const handleLogout = () => {
        handleCloseUserMenu()
        logout();
    }

    const settings = [
        {
            name: 'Sair',
            functionName: handleLogout
        }
    ];


    return (
        <AppBar
            position="static"
            sx={{
                background: '#EDF3F4',
                width: '100%',
                padding: '0 25px',
                height: '80px',
                borderBottom: '1px solid #dbdbdb',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Container maxWidth={false} disableGutters>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignContent: 'center' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            onClick={goDashboard}
                            component='img'
                            src={logoName}
                            sx={{
                                width: '120px',
                                cursor: 'pointer'
                            }}
                        />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.path} onClick={handleCloseNavMenu}>
                                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography sx={{ textAlign: 'center', color: '#000' }}>{page.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, justifyContent: 'center', gap: 4, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    key={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: '#3b3b3b',
                                        display: 'block',
                                        textTransform: 'none',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: isSelected(page.path) ? '#000' : 'transparent',
                                            bottom: 0,
                                            left: 0,
                                        },
                                        ':hover': {
                                            '&::after': {
                                                backgroundColor: '#000', // Efeito de hover
                                            }
                                        }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir configurações">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: '#A8AEB0', width: '30px', height: '30px' }}>
                                    <PersonIcon sx={{ color: '#EDF3F4', fontSize: '22px' }} />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={setting.functionName}>
                                    <Typography textAlign="center" >{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
