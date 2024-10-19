import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import LongMenu from './components/menu';
import api from '../../config/axiosConfig';

import wallpaperTv from '../../assets/img/tv.jpg'
import { Link } from 'react-router-dom';

interface CardProps {
    id: string;
    name: string;
    description: string;
    onUpdateContent: () => void;
}

export default function CardScreens({ id, name, onUpdateContent }: CardProps) {
    const handleDeleteContent = () => {
        api.delete(`screens/${id}`)
            .then((response) => {
                onUpdateContent();
                console.log('Screen deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error deleting screen:', error);
            });
    }

    return (
        <Card sx={{ maxWidth: 300, width: "100%", background: '#EDF3F4', border: '3px solid #fff' }}>
            <CardActionArea>
                <Box sx={{ maxHeight: '170px', overflow: 'hidden' }}>
                    <Link to={`/screens/${id}`}>
                        <Box
                            component="img"
                            src={wallpaperTv}
                            sx={{
                                width: '100%',
                                height: '170px',
                                objectFit: 'cover',
                                backgroundColor: '#f1f1f1',
                                boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.4)',
                            }}
                        />
                    </Link>
                </Box>
                <CardContent
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            width: '90%',
                        }}
                    >
                        <Typography gutterBottom component="div"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>
                    <Box sx={{ height: '100%' }}>
                        <LongMenu
                            onDelte={handleDeleteContent}
                            screen_id={id}
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
