import { Modal, Box, TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApp from '../../Hooks/useApp';

const AddDivisionModal = ({ open, setModalDivision}) => {

    const { addDivision, setDivision, division, updateDivision } = useApp();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (division?.id) {
            setName(division.name);
            setDescription(division.description);
            return;
        }

        setName('');
        setDescription('');
    }, [division]);

    const handleClose = () => {
        setDivision(null);
        setName('');
        setDescription('');
        setModalDivision(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("El nombre es obligatorio");
            return;
        }

        if (!description.trim()) {
            toast.error("La descripcion es obligatoria");
            return;
        }

        try {
            let isSuccess = false;

            if (division?.id) {
                const divisionUpdate = {
                    id: division.id,
                    name,
                    description
                };

                isSuccess = await updateDivision(divisionUpdate);
            } else {
                isSuccess = addDivision({name, description});
            }

            if (isSuccess) handleClose();
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Hubo un error");
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'white',
                p: 3,
                borderRadius: 2,
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Typography variant="h6">
                    {division ? "Editar División" : "Agregar División"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        sx={{ mt: 2 }}
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{ color: '#7C38CD', borderColor: '#7C38CD', '&:hover': { borderColor: '#6A2EB8' } }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            {division ? "Guardar cambios" : "Agregar"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default AddDivisionModal;