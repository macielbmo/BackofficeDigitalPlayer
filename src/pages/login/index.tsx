import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../services/firebase.config'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                maxHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        fontWeight='bold'
                        fontSize='32px'
                        color="primary"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* <Box
                            component='img'
                            src={logo}
                            alt="Logo"
                            width="75px"
                            height="75px"
                        /> */}
                        DigitalPlayer
                    </Typography>

                    <Typography
                        fontWeight='bold'
                        fontSize='14px'
                        color="#494949"
                    >
                        Por favor, digite suas informações de login.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '25%',
                        marginTop: '35px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px',
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="E-mail"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Button
                    sx={{
                        marginTop: '25px',
                        width: '25%',
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
            </Box>
        </Box>
    )
}