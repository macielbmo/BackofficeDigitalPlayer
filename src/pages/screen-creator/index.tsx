import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { createContext, useState, useContext } from "react";
import { PlaylistScreen } from "./components/playlistScreen";
import { useParams } from "react-router-dom";
import { ContentScreenType } from "./types";
import { LibaryContent } from "./components/libaryContent";
import { LibaryContentWebsite } from "./components/libaryContentWebsite";

const optionContent = ["content", "website"];

// Definindo o tipo do contexto
interface CreatorContextProps {
    sizePlaylist: number;
    setSizePlaylist: (size: number) => void;
    dataContentScreen: ContentScreenType[];
    setDataContentScreen: (data: ContentScreenType[]) => void;
}

const CreatorContext = createContext<CreatorContextProps | undefined>(undefined);

export const useCreatorContext = () => {
    const context = useContext(CreatorContext);
    if (context === undefined) {
        throw new Error('useCreatorContext deve ser usado dentro de um CreatorProvider');
    }
    return context;
};

export function ScreenCreator() {
    const { id } = useParams();

    const [dataContentScreen, setDataContentScreen] = useState<ContentScreenType[]>([]);
    const [dataContent, setDataContent] = useState([]);
    const [dataWebsite, setDataWebsite] = useState([]);
    const [optionCont, setOptionCont] = useState("content");
    const [sizePlaylist, setSizePlaylist] = useState(0)

    const handleContent = (option: string) => {
        setOptionCont(option);
    };

    const handleChangeUpdateDuration = (id: string, newDuration: number) => {
        setDataContentScreen(prevDurations =>
            prevDurations.map(content =>
                content.content_id === id
                    ? { ...content, duration: newDuration }
                    : content
            )
        );
    };

    return (
        <CreatorContext.Provider value={{ sizePlaylist, setSizePlaylist, dataContentScreen, setDataContentScreen }}>
            <Header />

            <Box sx={{ padding: '25px', backgroundColor: '#EDF3F4', height: '100vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="h6"
                        fontSize='20px'
                        fontWeight='bold'
                    >
                        Telas
                    </Typography>
                </Box>

                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <PlaylistScreen
                        id={id}
                        onSetDataScreen={setDataContentScreen}
                        dataContentScreen={dataContentScreen}
                        onChangeUpdateDuration={handleChangeUpdateDuration}
                    />
                    <Box sx={{ width: '47%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                marginBottom: 2,
                            }}
                        >
                            {optionContent.map((item) => (
                                <Box
                                    key={item} // Adicione uma chave única
                                    sx={{
                                        borderBottom: `2px solid ${item === optionCont ? blue[500] : '#fff'}`,
                                        padding: '0 15px'
                                    }}
                                    onClick={() => handleContent(item)}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            color: item === optionCont ? blue[500] : grey[600],
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {item === 'content' ? 'Conteúdo' : 'Website'}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {optionCont === 'content' ? (
                            <LibaryContent
                                id={id}
                                onSetDataContent={setDataContent}
                                dataContent={dataContent}
                            />
                        ) : (
                            <LibaryContentWebsite
                                id={id}
                                onSetDataScreen={setDataWebsite}
                                dataContentWebsite={dataWebsite}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </CreatorContext.Provider>
    );
}

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
