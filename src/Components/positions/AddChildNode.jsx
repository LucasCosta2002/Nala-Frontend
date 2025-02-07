import React, { useState, useEffect } from 'react';
import useModals from '../../Hooks/useModals';
import useApp from '../../Hooks/useApp';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import { toast } from 'react-toastify';

export default function AddChildNode({ }) {
    const { divisions, addPosition, tiers, positions, position, setPosition } = useApp();
    const { modalAddChild, setModalAddChild } = useModals();

    const [newPositionName, setNewPositionName] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedTier, setSelectedTier] = useState('');
    const [selectedParent, setSelectedParent] = useState('');

    useEffect(() => {
        if (position?.id) {
            setSelectedParent(position.id);
            return;
        }
        setSelectedParent('');
    }, [position]);

    const handleClose = () => {
        setSelectedParent('');
        setNewPositionName('');
        setSelectedDivision('');
        setSelectedTier('');
        setPosition(null);
        setModalAddChild(false);
    };

    const handleAddChild = async () => {
        if (!newPositionName.trim()) {
            toast.error("El nombre de la posición es obligatorio.");
            return;
        }

        if (!selectedDivision) {
            toast.error("Debe seleccionar una división.");
            return;
        }

        if (!selectedTier) {
            toast.error("Debe seleccionar un tier válido.");
            return;
        }

        const newPosition = {
            name: newPositionName,
            parentId: selectedParent,
            tierId: selectedTier,
            divisionId: selectedDivision,
            employeeIds: []
        };

        try {
            const isSuccess = await addPosition(newPosition);
            if (isSuccess) handleClose();
        } catch (error) {
            toast.error("Hubo un error al agregar la posición.");
        }
    };

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <Dialog open={modalAddChild} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Agregar Nueva Posición</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nombre de la Posición"
                        variant="outlined"
                        value={newPositionName}
                        onChange={e => setNewPositionName(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Posición Padre</InputLabel>
                        <Select value={selectedParent} label="Posición Padre" disabled>
                            {positions.map(pos => (
                                <MenuItem key={pos.id} value={pos.id} disabled>
                                    {pos.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Seleccionar División</InputLabel>
                        <Select
                            value={selectedDivision}
                            onChange={e => setSelectedDivision(e.target.value)}
                            label="Seleccionar División"
                        >
                            {divisions.map(div => (
                                <MenuItem key={div.id} value={div.id}>{div.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Seleccionar Tier</InputLabel>
                        <Select
                            value={selectedTier}
                            onChange={e => setSelectedTier(e.target.value)}
                            label="Seleccionar Tier"
                        >
                            {tiers.map(tier => (
                                <MenuItem 
                                    key={tier.id} 
                                    value={tier.id} 
                                    disabled={tier.id === position?.tierId}
                                >
                                    {tier.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ mt: 2, p: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{ color: '#7C38CD', borderColor: '#7C38CD', '&:hover': { borderColor: '#6A2EB8' } }}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleAddChild} variant="contained">Agregar</Button>
                </DialogActions>
            </Dialog>

            <Handle type="source" position={Position.Bottom} />
        </>
    );
}
