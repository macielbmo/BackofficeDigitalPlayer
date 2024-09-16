import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import AddWebsite from "../../components/AddWebsite";
import CardWebsiteCont from "../../components/CardWebsiteContent";

export function WebSites() {
    const [dataCard, setDataCard] = useState([]);
    const [updateContent, setUpdateContent] = useState(false);

    useEffect(() => {
        console.log('Requi')
        api.get('content-website').then((res) => {
            console.log(res);
            setDataCard(res.data);
            setUpdateContent(false);
        }).catch((err) => {
            console.error(err);
            setUpdateContent(false);
        })
    }, [updateContent])

    const handleUpdateContent = () => {
        setUpdateContent(true);
    }

    useEffect(() => {
        console.log('Data Card: ', dataCard);
    }, [dataCard]);

    return (
        <>
            <Header />
            <Box
                sx={{ padding: '25px', backgroundColor: '#f8f8f8', height: '100vh' }}
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
                        Websites
                    </Typography>
                    <AddWebsite
                        onUpdateContent={handleUpdateContent}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                        marginTop: '20px',
                        paddingBottom: '50px',

                    }}
                >
                    {dataCard.map(media => (
                        <CardWebsiteCont
                            media={media}
                            onUpdateContent={handleUpdateContent}
                        />
                    ))}
                </Box>
            </Box >
        </>
    )
}