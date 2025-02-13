import { Modal, Box, TextField, Button, Typography, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import useApp from '../../Hooks/useApp';
import { toast } from 'react-toastify';
import useModals from '../../Hooks/useModals';

const AddTierModal = () => {
    const { tiers, addTier, updateTier, tier, setTier } = useApp();
    const { modalTier, setModalTier } = useModals();

    const [tierName, setTierName] = useState('');

    useEffect(() => {
        if (tier?.id) {
            setTierName(tier.name);
            return;
        }
        setTierName('');
    }, [tier]);

    const handleClose = () => {
        setTier(null);
        setTierName('');
        setModalTier(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tierName.trim()) {
            toast.error("El nombre del Tier no puede estar vacío.");
            return;
        }

        try {
            let isSuccess = false;

            if (tier?.id) {
                isSuccess = await updateTier({ id: tier.id, name: tierName });
            } else {
                const lastTier = tiers.length > 0 ? tiers[tiers.length - 1] : null;
                const newY = lastTier ? lastTier.y + 500 : 0;

                isSuccess = await addTier({ name: tierName, y: newY });
            }

            if (isSuccess) handleClose();
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Hubo un error");
        }
    };

    return (
        <Modal open={modalTier} onClose={handleClose}>
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
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6">{tier?.id ? 'Actualizar' : 'Nuevo'} Tier</Typography>
                    <TextField
                        label="Nombre del Tier"
                        variant="outlined"
                        fullWidth
                        value={tierName}
                        onChange={(e) => setTierName(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}
                    >
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{ color: '#7C38CD', borderColor: '#7C38CD', '&:hover': { borderColor: '#6A2EB8' } }}
                        >Cancelar
                        </Button>
                        <Button variant="contained" type='submit'>
                            {tier?.id ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default AddTierModal;
