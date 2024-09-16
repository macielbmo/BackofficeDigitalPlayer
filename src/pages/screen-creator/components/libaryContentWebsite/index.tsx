import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import api from "../../../../config/axiosConfig";
import { WebsiteType } from "../../types";
import { useParams } from "react-router-dom";
import { CardLibaryWebsite } from "./card";

interface PropsType {
    id?: string;
    dataContentWebsite: WebsiteType[];
    onSetDataScreen: ([]: any) => any;
}

export function LibaryContentWebsite(props: PropsType) {
    const { id } = useParams();

    useEffect(() => {
        api.get(`content-website`)
            .then((response) => {
                console.log(response)
                props.onSetDataScreen(response.data);
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
                props.onSetDataScreen([]);
            });
    }, [])

    useEffect(() => {
        console.log('DATA', props.dataContentWebsite)
    }, [props.dataContentWebsite])

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2
                }}
            >
                <Typography
                    variant="h6"
                    fontSize='16px'
                    fontWeight='bold'
                >
                    Websites
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {props.dataContentWebsite.map((item) => (
                    <CardLibaryWebsite
                        title={item.title}
                        url={item.url ? item.url : null}
                        html={item.html ? item.html : null}
                        website_id={item.id}
                        screen_id={id || ''}
                    />
                ))}
            </Box>
        </Box>
    )
}