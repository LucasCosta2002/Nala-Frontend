import { Box, Typography, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import PositionCard from '../positions/PositionCard.jsx';
import useApp from '../../Hooks/useApp.jsx';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import DraggablePosition from '../positions/DraggablePosition.jsx';


const TierContainer = ({ tier, positions, onMovePosition }) => {
    const { modalTier, setModalTier, setTier, deleteTier } = useApp();

    const { setNodeRef, isOver } = useDroppable({
        id: tier.id,
    });

    const handleEditClick = () => {
        setTier(tier);
        setModalTier(!modalTier);
    };

    const handleDeleteClick = () => deleteTier(tier.id);

    return (
        <Paper
            elevation={0}
            ref={setNodeRef}  // Ref for Droppable
            style={{ border: isOver ? '2px dashed blue' : '1px solid #E0E0E0', padding: '10px', margin: '10px', borderRadius: '12px', backgroundColor: '#FFFFFF', display: 'flex', gap: 3 }} // Added styling
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '2px solid #7C38CD',
                    pr: 1,
                }}
            >
                <IconButton
                    sx={{
                        mb: 2,
                        color: '#7C38CD',
                        '&:hover': { backgroundColor: 'rgba(124, 56, 205, 0.1)' },
                    }}
                    onClick={handleEditClick}
                >
                    <EditIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: '#7C38CD',
                        textTransform: 'uppercase',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                    }}
                >
                    {tier.name}
                </Typography>

                <IconButton
                    sx={{
                        mt: 2,
                        color: '#7C38CD',
                        '&:hover': { backgroundColor: 'rgba(124, 56, 205, 0.1)' },
                    }}
                    onClick={handleDeleteClick}
                >
                    <ClearIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                {positions.map((position) => (
                    <DraggablePosition key={position.id} position={position} onMovePosition={onMovePosition} />
                ))}
            </Box>
        </Paper>
    );
};

export default TierContainer;