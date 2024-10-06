import { Box, Button, TextField, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { ContentType } from "../screen-creator/types";
import OptionsMidia from "./options";
import { format, parseISO } from "date-fns";

export function ContentDetails() {
    const { id } = useParams();

    const [dataCard, setDataCard] = useState<ContentType>({
        created_at: '',
        description: '',
        durantion: 0,
        expiry_date: '',
        filename: '',
        id: '',
        name: '',
        path: '',
        size: 0,
        start_date: '',
        type: '',
        updated_at: ''
    });

    const [videoUrl, setVideoUrl] = useState('');
    const [updateContent, setUpdateContent] = useState(false);
    const [disable, setDisable] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Requi')
        api.get(`content/${id}`).then((res) => {
            console.log(res);
            setDataCard(res.data);
            setVideoUrl(`http://localhost:3000/temp/${res.data.filename}`);
            setUpdateContent(false);
        }).catch((err) => {
            console.error(err);
            setUpdateContent(false);
        })
    }, [updateContent])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataCard((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setDisable(false);
    };

    const handleDeleteContent = () => {
        api.delete(`content/${dataCard.id}`)
            .then((response) => {
                navigate('/');
                console.log('Content deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error deleting content:', error);
            });
    }

    const handleUpdate = async () => {
        api.patch(`content/${id}`, dataCard)
            .then((response) => {
                console.log('Content updated:', response.data);
                setDisable(true);
                setUpdateContent(false);
            })
            .catch((error) => {
                console.error('Error updating content:', error);
            });
    };

    useEffect(() => {
        console.log('Data Card: ', dataCard);
    }, [dataCard]);

    const renderContent = () => {
        switch (dataCard.type) {
            case 'image/jpeg':
                return <img src={videoUrl} alt="Imagem de exibição" style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
            case 'image/png':
                return <img src={videoUrl} alt="Imagem de exibição" style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
            case 'video/mp4':
                return <video
                    src={videoUrl}
                    playsInline
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            case 'video/avi':
                return <video
                    src={videoUrl}
                    playsInline
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <Box
                sx={{ padding: '25px', backgroundColor: '#f8f8f8', height: '100vh' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '58%',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                fontWeight='bold'
                                fontSize='18px'
                            >
                                {dataCard.name}
                            </Typography>

                            <OptionsMidia
                                onDelete={handleDeleteContent}
                            />
                        </Box>

                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%', // Largura total do container pai
                                paddingTop: '56.25%', // Proporção 16:9 (9 / 16 * 100 = 56.25%)
                                backgroundColor: '#e0e0e0',
                                marginTop: '15px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    padding: '20px',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                                {renderContent()}
                            </Box>
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            maxWidth: '40%',
                            width: '100%',
                            marginLeft: '30px'
                        }}
                    >
                        <Typography sx={{ fontWeight: '600' }}>
                            Detalhes
                        </Typography>

                        <Box
                            sx={{
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <TextField
                                size="small"
                                placeholder="Título"
                                variant="outlined"
                                value={dataCard.name}
                                name='name'
                                onChange={handleChange}
                            />

                            <TextField
                                size="small"
                                placeholder="Descrição"
                                variant="outlined"
                                value={dataCard.description}
                                name='description'
                                onChange={handleChange}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Typography
                                fontWeight='bold'
                            >
                                Agendamento
                            </Typography>

                            <Box sx={{ width: '100%' }}>
                                <Typography fontSize='14px'>
                                    Data e hora de inicio
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Data e hora de inicio"
                                    variant="outlined"
                                    value={dataCard.start_date ? format(parseISO(dataCard.start_date), 'yyyy-MM-dd\'T\'HH:mm') : ''}
                                    type="datetime-local"
                                    name='start_date'
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                <Typography fontSize='14px'>
                                    Data e hora de fim
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Data e hora de fim"
                                    variant="outlined"
                                    value={dataCard.expiry_date ? format(parseISO(dataCard.expiry_date), 'yyyy-MM-dd\'T\'HH:mm') : ''}
                                    type="datetime-local"
                                    name='expiry_date'
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        <Button
                            disabled={disable}
                            sx={{
                                width: '100%',
                                marginTop: '20px',
                                backgroundColor: disable ? 'gray' : '#007bff',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: disable ? 'gray' : '#0069d9',
                                    cursor: 'pointer',
                                }
                            }}
                            onClick={disable ? () => { } : handleUpdate}
                        >Salvar Alterações</Button>
                    </Box>
                </Box>
            </Box >
        </>
    )
}