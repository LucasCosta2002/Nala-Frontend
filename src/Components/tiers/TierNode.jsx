import { Typography, Paper, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Handle, Position } from '@xyflow/react';
import useApp from '../../Hooks/useApp.jsx';

const TierNode = ({ data }) => {
    const { setTier, setModalTier, deleteTier } = useApp();

    const handleEditClick = () => {
        setTier(data);
        setModalTier(true);
    };

    const handleDeleteClick = () => deleteTier(data.id);

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column', // Apilar elementos verticalmente
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '550px',
                padding: '10px',
                width: '800px',
                borderRadius: '12px',
                backgroundColor: '#e4e1e1',
                border: '2px solid #CCCCCC',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative',
            }}
        >
            <Handle type="target" position={Position.Top} style={{ background: '#7C38CD' }} />

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    color: '#7C38CD',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginBottom: 'auto',
                }}
            >
                {data.label}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                    sx={{ color: '#7C38CD', '&:hover': { backgroundColor: 'rgba(124, 56, 205, 0.1)' } }}
                    onClick={handleEditClick}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    sx={{ color: '#7C38CD', '&:hover': { backgroundColor: 'rgba(124, 56, 205, 0.1)' } }}
                    onClick={handleDeleteClick}
                >
                    <ClearIcon />
                </IconButton>
            </Box>

            <Handle type="source" position={Position.Bottom} style={{ background: '#7C38CD' }} />
        </Paper>
    );
};

export default TierNode;
