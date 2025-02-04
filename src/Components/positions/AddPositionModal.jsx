import { Modal, Box, TextField, Button, Typography, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApp from '../../Hooks/useApp';

const AddPositionModal = ({ open, setModalPosition }) => {

    const { tiers, divisions, addPosition, updatePosition, position, setPosition } = useApp();

    const [name, setName] = useState('');
    const [selectedTier, setSelectedTier] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');

    // Prellenar los campos si estamos en modo edición
    useEffect(() => {
        if (position?.id) {
            setName(position.name);
            setSelectedTier(position.tierId);
            setSelectedDivision(position.divisionId);
            return;
        }

        setName('');
        setSelectedTier('');
        setSelectedDivision('');
    }, [position]);

    const handleClose = () => {
        setName('');
        setSelectedTier('');
        setSelectedDivision('');
        setPosition(null);
        setModalPosition(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !selectedTier || !selectedDivision) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const newPosition = {
            name,
            tierId: selectedTier,
            divisionId: selectedDivision,
        };

        try {
            let isSuccess = false;

            if (position?.id) {
                //Actualizar la posición existente
                isSuccess = await updatePosition({ ...newPosition, id: position.id });
            } else {
                isSuccess = await addPosition(newPosition);
            }

            if (isSuccess) handleClose();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error.");
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
                    {position?.id ? "Editar Posición" : "Agregar Posición"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de la posición"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Tier</InputLabel>
                        <Select
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value)}
                            label="Tier"
                        >
                            {tiers.map((tier) => (
                                <MenuItem key={tier.id} value={tier.id}>
                                    {tier.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>División</InputLabel>
                        <Select
                            value={selectedDivision}
                            onChange={(e) => setSelectedDivision(e.target.value)}
                            label="División"
                        >
                            {divisions.map((division) => (
                                <MenuItem key={division.id} value={division.id}>
                                    {division.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{ color: '#7C38CD', borderColor: '#7C38CD', '&:hover': { borderColor: '#6A2EB8' } }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            {position?.id ? "Guardar cambios" : "Agregar"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default AddPositionModal;