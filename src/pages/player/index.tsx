import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axiosConfig";
import { ContentScreenType } from "../screen-creator/types";

export function Player() {
    const { id } = useParams();

    const [contentList, setContentList] = useState<ContentScreenType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState<ContentScreenType | null>(null);

    // Fetch da playlist quando o componente é montado
    useEffect(() => {
        api.get(`playlist/${id}`)
            .then((response) => {
                console.log(response.data);
                setContentList(response.data);
                if (response.data.length > 0) {
                    setCurrentContent(response.data[0]); // Inicia com o primeiro conteúdo
                }
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
                setContentList([]);
            });
    }, [id]);

    // Função que gerencia a troca de conteúdo
    useEffect(() => {
        if (currentContent) {
            // Define a duração padrão de 10 segundos caso não exista
            const duration = currentContent.duration !== null ? currentContent.duration * 1000 : 10 * 1000;

            // Inicia o temporizador para trocar o conteúdo
            const timer = setTimeout(() => {
                // Define o próximo conteúdo a ser exibido
                const nextIndex = currentIndex < contentList.length - 1 ? currentIndex + 1 : 0;
                setCurrentIndex(nextIndex);
                setCurrentContent(contentList[nextIndex]);
            }, duration);

            // Limpa o temporizador quando o conteúdo é atualizado ou quando o componente desmonta
            return () => clearTimeout(timer);
        }
    }, [currentContent, currentIndex, contentList]);

    // Renderização do conteúdo com base no tipo
    const renderContent = (content: ContentScreenType | null) => {
        if (!content) return null;

        switch (content.type_content) {
            case 'image/jpeg':
                console.log('IMG', content.content.filename);
                return <img src={`http://localhost:3000/temp/${content.content.filename}`} alt="Imagem de exibição" style={{ width: "100%", height: "100%" }} />;
            case 'video/mp4':
                console.log('VIDEO', content.content.filename);
                return <video
                    src={`http://localhost:3000/temp/${content.content.filename}`}
                    autoPlay
                    muted
                    playsInline
                    controls
                    style={{ width: "100%", height: "100%" }}
                />;
            case 'URL':
                console.log('URL', content.content_website.url);
                return <iframe src={content.content_website.url} style={{ width: "100%", height: "100%" }} title="Exibição de URL" />;
            case 'HTML':
                console.log('HTML', content.content_website.html);
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
        <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'black' }}>
            {renderContent(currentContent)}
        </Box>
    );
}
