import useApp from '../../Hooks/useApp';
import AddDivisionModal from './AddDivisionModal';
import { Modal, Box, Typography, Button, List, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DivisionsModal = ({ open, setModalDivisions }) => {

    const { divisions, modalDivision, setModalDivision, setDivision, deleteDivision } = useApp();

    const handleEditClick = division => {
        setDivision(division);
        setModalDivision(true);
    }

    const handleChangeModalDivision = () => {
        setDivision(null);
        setModalDivision(true);
    }

    const handleDeleteClick = id => deleteDivision(id);

    const handleClose = () => setModalDivisions(false);

    return (
        <Modal open={open} onClose={handleClose}>
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
                <Typography variant="h6">Listado de Divisiones</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleChangeModalDivision}
                    sx={{ alignSelf: 'flex-start' }}
                >Agregar División
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
                    {divisions?.map(division => (
                        <Box
                            key={division.id}
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
                                    {division.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    {division.description}
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() => handleEditClick(division)}
                                >
                                    <EditIcon sx={{ color: '#7C38CD' }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeleteClick(division.id)}
                                >
                                    <DeleteIcon sx={{ color: '#FF6B6B' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </List>

                <AddDivisionModal
                    open={modalDivision}
                    setModalDivision={setModalDivision}
                    // onSave={divisionToEdit ? handleEditDivision : handleAddDivision}
                    // divisionToEdit={divisionToEdit}
                />
            </Box>
        </Modal>
    );
};

export default DivisionsModal;