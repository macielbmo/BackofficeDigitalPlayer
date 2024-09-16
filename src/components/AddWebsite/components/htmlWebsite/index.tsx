import { Box, TextField, Typography } from "@mui/material";

interface PropsType {
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onChangeHtml: (event: React.ChangeEvent<HTMLInputElement>) => any;
    name: string;
    html: string;
}

export function HtmlWebsite(props: PropsType) {
    return (
        <Box>
            <Typography
                sx={{
                    marginBottom: 2,
                }}
            >
                Se você tiver um trecho de código para um widget HTML5, insira-o aqui.
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
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Código HTML"
                    required
                    multiline
                    rows={5}
                    maxRows={10}
                    onChange={props.onChangeHtml}
                    value={props.html}
                />
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Nome"
                    required
                    onChange={props.onChangeName}
                    value={props.name}
                />
            </Box>
        </Box>
    )
}