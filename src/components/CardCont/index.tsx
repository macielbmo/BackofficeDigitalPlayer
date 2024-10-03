import { useRef, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { MediaTypes } from './media.type';
import { Box } from '@mui/material';
import LongMenu from './components/menu';
import api from '../../config/axiosConfig';
import { Link } from 'react-router-dom';

interface CardProps {
    media: MediaTypes;
    onUpdateContent: () => void;
}

export default function CardCont({ media, onUpdateContent }: CardProps) {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (media.type === 'video/mp4' && videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            video.crossOrigin = 'anonymous'; // Enable CORS for the video
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.currentTime = 1; // Capture frame at 1 second
            };

            video.onseeked = () => {
                if (ctx) {
                    try {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const dataUrl = canvas.toDataURL('image/jpeg');
                        setThumbnail(dataUrl);
                        setHasError(false);
                    } catch (error) {
                        console.error('Error capturing thumbnail:', error);
                        setHasError(true);
                    }
                }
            };

            video.onerror = (e) => {
                console.error('Video error:', e);
                setHasError(true);
            };
        }
    }, [media]);

    const handleDeleteContent = () => {
        api.delete(`content/${media.id}`)
            .then((response) => {
                onUpdateContent();
                console.log('Content deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error deleting content:', error);
            });
    }

    return (
        <Card sx={{ maxWidth: 300, width: "100%" }}>
            <CardActionArea>
                <Link to={`/content/${media.id}`}>
                    {media.type === 'video/mp4' ? (
                        <>
                            <video ref={videoRef} src={`http://localhost:3000/temp/${media.filename}`} style={{ display: 'none' }} />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                            <CardMedia
                                component="img"
                                height="140"
                                image={hasError ? 'default-thumbnail.jpg' : thumbnail || 'default-thumbnail.jpg'}
                                alt={media.name || 'Video Thumbnail'}
                            />
                        </>
                    ) : (
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:3000/temp/${media.filename}`}
                            alt={media.name || 'Image'}
                        />
                    )}
                </Link>
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
                            {media.name || 'Default Title'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {media.type === 'video/mp4' ? 'Video' : 'Image'}
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
