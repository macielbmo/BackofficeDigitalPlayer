import { Box, TextField, Typography } from "@mui/material";

import TvIcon from '@mui/icons-material/Tv';
import MenuCardLibary from "./menu/menu";
import api from "../../../../../config/axiosConfig";

interface CardLibaryType {
    name: string,
    type: string,
    duration: number,
    content_id: string,
    screen_id?: string,
    filename: string,
    cardContent?: boolean,
}

export function CardLibaryContent({
    content_id,
    name,
    type,
    duration,
    filename,
    cardContent,
    screen_id,
}: CardLibaryType) {

    const handlAddToPlaylist = () => {
        api.post('playlist', {
            content_id,
            screen_id,
            duration,
            type_content: type
        })
            .then(() => {
                console.log('Playlist')
                window.location.reload()
            })
            .catch(error => {
                console.error(error);
                alert("Error adding to playlist")
            })
    }

    return (
        <Box
            sx={{
                height: '70px',
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '5px',
                display: 'flex',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        >
            {type !== 'video/mp4' ? <>
                <Box
                    component="img"
                    src={`http://localhost:3000/temp/${filename}`}
                    alt="img"
                    sx={{
                        width: 124,
                        height: 70,
                        borderRadius: '5px 0 0 5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: "#bbbbbb"
                    }}
                >
                </Box>
            </> : (
                <Box
                    sx={{
                        width: 124,
                        height: 70,
                        borderRadius: '5px 0 0 5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: "#bbbbbb"
                    }}
                >
                    <TvIcon sx={{ fontSize: "38px", color: "#fff" }} />
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: "100%",
                    padding: "0 15px 0 0"
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '10px',
                    }}
                >
                    <Typography>
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: '#999',
                            marginTop: '5px'
                        }}
                    >
                        {type}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    {cardContent === false ? null : (
                        <TextField
                            label="Duração"
                            value={duration}
                            size="small"
                            type="number"
                            disabled={type !== 'video/mp4' ? false : true}
                            sx={{
                                width: "100px",
                            }}
                        />
                    )}
                    <MenuCardLibary
                        onAddPlaylist={handlAddToPlaylist}
                    />
                </Box>
            </Box>
        </Box>
    )
}