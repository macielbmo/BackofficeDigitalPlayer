import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import logoName from '../../assets/img/logo.png';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Indica que a requisição está em andamento

        const success = await login(email, password);

        setLoading(false); // Reseta o estado de loading
        if (success) {
            navigate('/');
        } else {
            alert("E-mail ou senha inválidos");
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                maxHeight: '100vh',
                overflow: 'hidden',
                backgroundColor: '#EDF3F4',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '120px'
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
                        fontWeight='regular'
                        fontFamily='Ubuntu'
                        fontSize='42px'
                        color="#000"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            letterSpacing: '-1.9px',
                        }}
                    >
                        <Box
                            component='img'
                            src={logoName}
                            sx={{
                                width: '75px',
                                marginRight: '8px', // Ajusta o espaço entre a imagem e o texto
                            }}
                        />
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
                    component='form'
                    onSubmit={handleLogin}
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
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Adiciona validação para o campo
                        autoComplete="email" // Adiciona atributo autocomplete
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
                        required // Adiciona validação para o campo
                        autoComplete="current-password" // Adiciona atributo autocomplete
                    />
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            marginTop: '25px',
                            backgroundColor: '#212121',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            "&:hover": {
                                border: '2px solid #fff'
                            }
                        }}
                        variant="contained"
                        size="small"
                        disabled={loading} // Desabilita o botão durante o loading
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
