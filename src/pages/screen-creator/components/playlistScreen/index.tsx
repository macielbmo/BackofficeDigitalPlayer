import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../../config/axiosConfig";
import { Card } from "./card";
import { ContentScreenType } from "../../types";

interface PropsType {
    id?: string;
    dataContentScreen: ContentScreenType[];
    onSetDataScreen: ([]: any) => any;
    onChangeUpdateDuration: (id: string, newDuration: number) => any;
}

export interface DurationTypes {
    content_id: string;
    duration: number;
}

export function PlaylistScreen(props: PropsType) {
    const [update, setUpdate] = useState(false)
    const [duration, setDuration] = useState<DurationTypes[]>([])

    const handleUpdate = () => {
        setUpdate(!update)
    }

    const submitChanges = () => {
        duration.map((item) => {
            api.patch(`playlist/${props.id}`, {
                content_id: item.content_id,
                duration: item.duration
            })
                .then(() => {
                    setDuration([])
                })
                .catch((error) => {
                    console.error('Error updating duration:', error);
                });
        })
    }

    useEffect(() => {
        api.get(`playlist/${props.id}`)
            .then((response) => {
                props.onSetDataScreen(response.data);
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
                props.onSetDataScreen([]);
            });
    }, [update])

    useEffect(() => {
        console.log('DATA', props.dataContentScreen)
    }, [props.dataContentScreen])

    const handleDurationChange = (content_id: string, newDuration: number) => {
        props.onChangeUpdateDuration(content_id, newDuration);

        setDuration(prevDurations => {
            const existingDuration = prevDurations.find(duration => duration.content_id === content_id);

            if (existingDuration) {
                return prevDurations.map(duration =>
                    duration.content_id === content_id
                        ? { ...duration, duration: newDuration }
                        : duration
                );
            } else {
                return [...prevDurations, { content_id, duration: newDuration }];
            }
        });
    };

    useEffect(() => {
        console.log('Duration', duration)
    }, [duration])

    return (
        <Box sx={{ width: '48%' }}>
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
                    Playlist Atual
                </Typography>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={duration.length == 0 ? true : false}
                    onClick={submitChanges}
                >Salvar Altereção</Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {props.dataContentScreen.map((item) => (
                    <Card
                        content_id={item.content_id}
                        name={item.content?.name || item.content_website?.title || 'Sem título'}
                        type={item.type_content}
                        screen_id={item.screen_id}
                        duration={item.duration}
                        onUpdate={handleUpdate}
                        filename={item.content?.filename || item.content_website?.title || 'Sem arquivo'}
                        cardContent={true}
                        onSetDuration={handleDurationChange}
                    />
                ))}
            </Box>
        </Box>
    )
}