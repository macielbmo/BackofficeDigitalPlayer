import { Box, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import api from "../../config/axiosConfig";
import { ContentScreenType } from "../screen-creator/types";

export function Player() {
    const { id } = useParams();

    const [contentList, setContentList] = useState<ContentScreenType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState<ContentScreenType | null>(null);
    const [isFading, setIsFading] = useState(false);
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        GetData();
    }, [id]);

    const GetData = () => {
        api.get(`playlist/${id}`)
            .then((response) => {
                console.log(response.data);
                setContentList(response.data);
                if (response.data.length > 0) {
                    setCurrentContent(response.data[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
                setContentList([]);
            });
    }

    useEffect(() => {
        if (currentContent) {
            const duration = currentContent.duration !== null ? currentContent.duration * 1000 : 10 * 1000;

            const timer = setTimeout(() => {
                setIsFading(true);

                setTimeout(() => {
                    const nextIndex = currentIndex < contentList.length - 1 ? currentIndex + 1 : 0;
                    setCurrentIndex(nextIndex);
                    setCurrentContent(contentList[nextIndex]);
                    setIsFading(false);
                }, 500);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [currentContent, currentIndex, contentList]);

    // Função para alternar o modo de tela cheia
    const handleFullscreen = () => {
        if (!document.fullscreenElement && playerRef.current) {
            playerRef.current.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const renderContent = (content: ContentScreenType | null) => {
        if (!content) return null;

        switch (content.type_content) {
            case 'image/jpeg':
                return <img src={`http://localhost:3000/temp/${content.content.filename}`} alt="Imagem de exibição" style={{ width: "100%", height: "100%" }} />;
            case 'video/mp4':
                return <video
                    src={`http://localhost:3000/temp/${content.content.filename}`}
                    autoPlay
                    muted
                    playsInline
                    // controls
                    style={{ width: "100%", height: "100%" }}
                />;
            case 'URL':
                return <iframe
                    src={content.content_website.url}
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        border: "none",
                        pointerEvents: "none"
                    }} title="Exibição de URL" />;
            case 'HTML':
                return (
                    <div
                        dangerouslySetInnerHTML={{ __html: content.content_website.html ? content.content_website.html : '' }}
                        style={{ width: "100%", height: "100%" }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box
            ref={playerRef}
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: 'black',
                position: 'relative', // Para posicionar o botão
                opacity: isFading ? 0 : 1,
                transition: 'opacity 0.5s ease',
                overflow: 'hidden',
            }}
        >
            {/* Botão de tela cheia */}
            <IconButton
                onClick={handleFullscreen}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: 'white',
                    zIndex: 1000,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                }}
            >
                <FullscreenIcon />
            </IconButton>

            {renderContent(currentContent)}
        </Box>
    );
}
