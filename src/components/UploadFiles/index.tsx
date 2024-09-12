
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Button, Typography } from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LinearWithValueLabel from '../progress';
import axios from 'axios';

interface UploadProps {
    onUpdateContent: () => void;
}

export default function UploadFiles(props: UploadProps) {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectedFile(null);
        setProgress(0);
        props.onUpdateContent()
        setOpen(false)
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Abre o seletor de arquivos
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]); // Atualiza o estado com o arquivo selecionado
        }
    };

    useEffect(() => {
        console.log("file", selectedFile);
    }, [selectedFile]);

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post('http://localhost:3000/content/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (event) => {
                        if (event.lengthComputable) {
                            setTimeout(() => {
                                if (event.total) {
                                    const percentComplete = (event.loaded / event.total) * 100;
                                    setProgress(percentComplete);
                                }
                            }, 500);
                        }
                    }
                });

                if (response) {
                    console.log('Arquivo enviado com sucesso');
                } else {
                    console.error('Erro ao enviar arquivo');
                }

                setTimeout(() => {
                    handleClose();
                }, 1500);
            } catch (error) {
                console.error('Erro de rede:', error);
            }
        }
    };

    return (
        <div>
            <TriggerButton type="button" onClick={handleOpen}>
                Enviar Arquivo
            </TriggerButton>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{ width: 400 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                        }}
                    >
                        <UploadFileIcon />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >Enviar Arquivos</Typography>
                    </Box>
                    {selectedFile === null ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '30px 0'
                            }}
                        >
                            <FileUploadIcon
                                sx={{
                                    fontSize: '80px',
                                    background: '#86868615',
                                    borderRadius: '50%',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    cursor: 'pointer',
                                }}
                                onClick={handleIconClick}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '14px',
                                }}
                            >
                                Selecione os arquivos que deseja enviar. O limite é de 5MB por arquivo.
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    padding: '20px 0'
                                }}
                            >
                                <Typography>{selectedFile.name}</Typography>
                                <LinearWithValueLabel progress={progress} />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button onClick={handleUpload}>Enviar</Button>
                            </Box>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

const Backdrop = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
>((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

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

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled('button')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);