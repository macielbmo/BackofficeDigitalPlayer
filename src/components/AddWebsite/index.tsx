
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Button, Typography } from '@mui/material';

import PublicIcon from '@mui/icons-material/Public';
import { UrlWebsite } from './components/urlWebsite';
import { HtmlWebsite } from './components/htmlWebsite';
import api from '../../config/axiosConfig';

const options = ['URL', 'HTML']

interface UploadProps {
    onUpdateContent: () => void;
}

export default function AddWebsite(props: UploadProps) {
    const [open, setOpen] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);

    const [url, setUrl] = useState('');
    const [html, setHtml] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('URL');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setUrl('');
        setHtml('');
        setName('');
        setType('URL');
        props.onUpdateContent()
        setOpen(false)
    };

    useEffect(() => {
        if (url === '' && name === '') {
            setDisableBtn(true);
        } else if (html === '' && name === '') {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }, [url, name, html])

    const handleOptionChange = (option: string) => {
        setType(option);
        setUrl('');
        setHtml('');
        setName('');
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const handleHtmlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHtml(event.target.value);
    }

    const handleSave = () => {
        if (type === 'URL') {
            api.post('content-website', {
                url,
                title: name,
            })
                .then((response) => {
                    console.log('Website added:', response.data);
                    handleClose();
                    props.onUpdateContent();
                })
                .catch((error) => {
                    console.error('Error adding website:', error);
                });
        } else {
            api.post('content-website', {
                html,
                title: name,
            })
                .then((response) => {
                    console.log('Website added:', response.data);
                    handleClose();
                    props.onUpdateContent();
                })
                .catch((error) => {
                    console.error('Error adding website:', error);
                });
        }
    }

    return (
        <div>
            <TriggerButton type="button" onClick={handleOpen}>
                Adicionar Site
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
                        <PublicIcon />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >Adicionar Site</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        {options.map((item) => (
                            <Box
                                sx={{
                                    borderBottom: `2px solid ${item === type ? blue[500] : '#fff'}`,
                                    padding: '0 15px'
                                }}
                                onClick={() => handleOptionChange(item)}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        color: item === type ? blue[500] : grey[600],
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {item === 'URL' ? 'Url do Siste' : 'Widget HTML'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {type === 'URL' ? (
                        <UrlWebsite
                            onChangeUrl={handleUrlChange}
                            onChangeName={handleNameChange}
                            name={name}
                            url={url}
                        />
                    ) : (
                        <HtmlWebsite
                            onChangeName={handleNameChange}
                            onChangeHtml={handleHtmlChange}
                            name={name}
                            html={html}
                        />
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            onClick={handleSave}
                            variant='contained'
                            size='small'
                            disabled={disableBtn}
                        >Cadastrar</Button>
                    </Box>
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