import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import { ContentType } from "../screen-creator/types";

export function ContentDetails() {
    const { id } = useParams();

    const [dataCard, setDataCard] = useState<ContentType>({});
    const [updateContent, setUpdateContent] = useState(false);

    useEffect(() => {
        console.log('Requi')
        api.get(`content/${id}`).then((res) => {
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
                <Box>
                    <Typography>
                        {dataCard.name}
                    </Typography>
                </Box>
            </Box >
        </>
    )
}