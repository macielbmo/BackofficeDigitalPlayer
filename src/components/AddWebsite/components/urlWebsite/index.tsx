import { Box, TextField, Typography } from "@mui/material";

interface PropsType {
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onChangeUrl: (event: React.ChangeEvent<HTMLInputElement>) => any;
    name: string;
    url: string;
}

export function UrlWebsite(props: PropsType) {
    return (
        <Box>
            <Typography
                sx={{
                    marginBottom: 2,
                }}
            >
                Insira o endereço do site (URL).
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 2,
                    gap: 3,
                }}
            >
                <TextField fullWidth size="small" variant="outlined" label="URL" required onChange={props.onChangeUrl} value={props.url} />
                <TextField fullWidth size="small" variant="outlined" label="Nome" required onChange={props.onChangeName} value={props.name} />
            </Box>
        </Box>
    )
}