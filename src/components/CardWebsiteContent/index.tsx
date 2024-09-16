import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import LongMenu from './components/menu';
import api from '../../config/axiosConfig';
import { WebsiteMediaTypes } from './media.type';

interface CardProps {
    media: WebsiteMediaTypes;
    onUpdateContent: () => void;
}

export default function CardWebsiteCont({ media, onUpdateContent }: CardProps) {
    const handleDeleteContent = () => {
        api.delete(`content-website/${media.id}`)
            .then((response) => {
                onUpdateContent();
                console.log('Content deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error deleting content:', error);
            });
    }

    const htmlContent = media.html || '';

    return (
        <Card sx={{ maxWidth: 300, width: "100%" }}>
            <CardActionArea>
                <Box sx={{ maxHeight: '170px', overflow: 'hidden' }}>
                    {media.url !== null ? (
                        <iframe
                            src={media.url}
                            style={{
                                width: '100%',
                                height: '170px',
                                border: 'none',
                                overflow: 'hidden',
                                pointerEvents: 'none'
                            }}
                        />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                            style={{
                                height: '170px',
                                width: '100%',
                                overflow: 'hidden',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
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
                            {media.title || 'Default Title'}
                        </Typography>
                    </Box>
                    <Box>
                        <LongMenu
                            onDelte={handleDeleteContent}
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
