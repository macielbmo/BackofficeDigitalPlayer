import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import AddScreens from "../../components/AddScreens";
import CardScreens from "../../components/CardScreens";

interface ScreensType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export function Screens() {
    const [dataCard, setDataCard] = useState<ScreensType[]>([]);
    const [updateContent, setUpdateContent] = useState(false);

    useEffect(() => {
        console.log('Requi')
        api.get('screens').then((res) => {
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
                        Telas
                    </Typography>
                    <AddScreens
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
                    {dataCard.map(item => (
                        <CardScreens
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            onUpdateContent={handleUpdateContent}
                        />
                    ))}
                </Box>
            </Box >
        </>
    )
}