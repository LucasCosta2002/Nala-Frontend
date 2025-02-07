import useApp from '../../Hooks/useApp';
import { Modal, Box, Typography, Button, List, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useModals from '../../Hooks/useModals';

const PositionsModal = ({ }) => {

    const { positions, setPosition, deletePosition } = useApp();
    const { modalPositions, setModalPosition, setModalPositions } = useModals();

    const handleEditClick = position => {
        setPosition(position);
        setModalPosition(true);
    }

    const handleChangeModalPosition = () => {
        setPosition(null);
        setModalPosition(true);
    }

    const handleClose = () => setModalPositions(false);

    const handleDeleteClick = id => deletePosition(id);

    return (
        <Modal open={modalPositions} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
            }}>
                <Typography variant="h6">Listado de Posiciones</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleChangeModalPosition}
                    sx={{ alignSelf: 'flex-start' }}
                >Agregar Posición
                </Button>

                <List
                    sx={{
                        width: '100%',
                        maxHeight: 300,
                        overflowY: 'auto',
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { width: "4px" },
                        scrollbarColor: "#7C38CD #f1f1f1"
                    }}
                >
                    {positions?.map(position => (
                        <Box
                            key={position.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 2,
                                borderBottom: '1px solid #E0E0E0',
                            }}
                        >
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {position.name}
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={() => handleEditClick(position)}>
                                    <EditIcon sx={{ color: '#7C38CD' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteClick(position.id)} >
                                    <DeleteIcon sx={{ color: '#FF6B6B' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </List>

            </Box>
        </Modal>
    );
};

export default PositionsModal;