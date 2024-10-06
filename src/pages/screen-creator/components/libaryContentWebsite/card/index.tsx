import { Box, Typography } from "@mui/material";

import TvIcon from '@mui/icons-material/Tv';
import api from "../../../../../config/axiosConfig";
import MenuCardWebsiteLibary from "./MenuCardWebsiteLibary/menu";
import { useCreatorContext } from "../../..";

interface CardLibaryType {
    website_id: string;
    title: string;
    url?: string | null;
    html?: string | null;
    cardContent?: boolean,
    screen_id: string;
}

export function CardLibaryWebsite({
    website_id,
    title,
    url,
    screen_id,
}: CardLibaryType) {
    const { sizePlaylist } = useCreatorContext();

    const handlAddToPlaylist = () => {
        api.post('playlist', {
            content_id: website_id,
            screen_id,
            duration: 15,
            type_content: url !== null ? 'URL' : 'HTML',
            order: sizePlaylist + 1
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
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: '#999',
                            marginTop: '5px'
                        }}
                    >
                        {url !== null ? 'URL' : 'HTML'}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <MenuCardWebsiteLibary
                        onAddPlaylist={handlAddToPlaylist}
                    />
                </Box>
            </Box>
        </Box>
    )
}