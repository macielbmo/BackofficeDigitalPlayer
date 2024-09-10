import { Box, Button, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import CardCont from "../../components/CardCont";

export function Content() {
    return (
        <>
            <Header />
            <Box
                sx={{ padding: '25px' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="h6"
                        fontSize='20px'
                        fontWeight='bold'
                    >
                        Biblioteca de Conteúdo
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                    >
                        Enviar Arquivos
                    </Button>
                </Box>
                <Box>
                    <CardCont />
                </Box>
            </Box >
        </>
    )
}