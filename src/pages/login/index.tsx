import { Box } from "@mui/material";
import img from "../../assets/img/banner-login-page.jpg"

export function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                maxHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ width: '60%', maxHeight: '100vh' }}>
                <Box
                    component="img"
                    src={img}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0 20px 20px 0',
                        backgroundColor: '#f1f1f1',
                        boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.4)',
                    }}
                />
            </Box>

            <Box>

            </Box>
        </Box>
    )
}