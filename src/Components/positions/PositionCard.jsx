import React from 'react';
import { Card, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useApp from '../../Hooks/useApp';
import AddPositionModal from './AddPositionModal';

const PositionCard = ({ position, onDelete }) => {
    const { divisions, modalPosition, setPosition, setModalPosition } = useApp();

    const division = divisions.find(division => division.id === position.divisionId);


    const handleEditClick = position => {
        setPosition(position);
        setModalPosition(true);
    };

    return (
        <Card
            sx={{
                p: 2,
                minWidth: '220px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                {position.name}
            </Typography>

            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                División: {division ? division.name : 'Sin división'}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton
                    onClick={() => handleEditClick(position)}
                    sx={{ color: '#7C38CD', '&:hover': { backgroundColor: 'rgba(124, 56, 205, 0.1)' } }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={() => onDelete(position.id)}
                    sx={{ color: '#FF6B6B', '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.1)' } }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

            <AddPositionModal
                open={modalPosition}
                setModalPosition={setModalPosition}
            />

        </Card>
    );
};

export default PositionCard;