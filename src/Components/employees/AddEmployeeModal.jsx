import { Modal, Box, TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApp from '../../Hooks/useApp';
import useModals from '../../Hooks/useModals';

const AddEmployeeModal = ({}) => {

    const { addEmployee, setEmployee, employee, updateEmployee } = useApp();
    const { modalEmployee, setModalEmployee } = useModals();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (employee?.id) {
            setName(employee?.name);
            setEmail(employee?.email);
            setCountry(employee?.country);
            return;
        }

        setName('');
        setEmail('');
        setCountry('');
    }, [employee]);

    const handleClose = () => {
        setEmployee(null);
        setName('');
        setEmail('');
        setCountry('');
        setModalEmployee(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("El nombre es obligatorio");
            return;
        }

        if (!email.trim() && RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(email)) {
            toast.error("El email es obligatorio");
            return;
        }

        if (! RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(email)) {
            toast.error("El email es invalido");
            return;
        }

        if (!country.trim()) {
            toast.error("El país es obligatorio");
            return;
        }

        try {
            let isSuccess = false;

            if (employee?.id) {
                const employeeUpdate = {
                    id: employee.id,
                    name,
                    email,
                    country
                };

                isSuccess = await updateEmployee(employeeUpdate);
            } else {
                isSuccess = addEmployee({name, email, country});
            }

            if (isSuccess) handleClose();
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Hubo un error");
        }
    };

    return (
        <Modal open={modalEmployee} onClose={handleClose}>
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
                    {employee ? "Editar Empleado" : "Agregar Empleado"}
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
                        label="Email"
                        variant="outlined"
                        fullWidth
                        rows={3}
                        sx={{ mt: 2 }}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="País"
                        variant="outlined"
                        fullWidth
                        rows={3}
                        sx={{ mt: 2 }}
                        value={country}
                        onChange={e => setCountry(e.target.value)}
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
                            {employee ? "Guardar cambios" : "Agregar"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;