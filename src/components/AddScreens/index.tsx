
import React, { useState } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';

import TvIcon from '@mui/icons-material/Tv';
import api from '../../config/axiosConfig';

interface UploadProps {
    onUpdateContent: () => void;
}

export default function AddScreens(props: UploadProps) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setName('');
        setDescription('');
        props.onUpdateContent()
        setOpen(false)
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleSave = () => {
        api.post('screens', {
            name,
            description,
        })
            .then(() => {
                handleClose();
                props.onUpdateContent();
            })
            .catch((err) => {
                console.error('Error adding screen', err);
            })
    }

    return (
        <div>
            <TriggerButton type="button" onClick={handleOpen}>
                Adicionar Tela
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
                        <TvIcon />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >Adicionar Nova Tela</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        <TextField size="small" label="Nome" fullWidth onChange={handleNameChange} value={name} required />
                        <TextField size="small" label="Descrição" fullWidth onChange={handleDescriptionChange} value={description} />
                    </Box>

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
                            disabled={name === '' ? true : false}
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