import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import api from "../../../../config/axiosConfig";
import { ContentType } from "../../types";
import { CardLibaryContent } from "./card";
import { useParams } from "react-router-dom";

interface PropsType {
    id?: string;
    dataContent: ContentType[];
    onSetDataContent: ([]: any) => any;
}

export function LibaryContent(props: PropsType) {
    const { id } = useParams();

    useEffect(() => {
        api.get(`content`)
            .then((response) => {
                props.onSetDataContent(response.data);
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
            });
    }, [])

    useEffect(() => {
        console.log('CONTENT', props.dataContent)
    }, [props.dataContent])

    return (
        <Box sx={{ width: '100%s' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                }}
            >
                <Typography
                    variant="h6"
                    fontSize='16px'
                    fontWeight='bold'
                >
                    Biblioteca de Conteúdo
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {props.dataContent.map((item) => (
                    <CardLibaryContent
                        content_id={item.id}
                        name={item.name}
                        type={item.type}
                        duration={item.durantion}
                        filename={item.filename}
                        cardContent={false}
                        screen_id={id}
                    />
                ))}
            </Box>
        </Box>
    )
}