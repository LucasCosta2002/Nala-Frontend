import useApp from '../../Hooks/useApp';
import { Modal, Box, Typography, Button, List, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useModals from '../../Hooks/useModals';
import AddTierModal from './AddTierModal';


export default function TiersModal() {
    const { tiers, setTier, deleteTier } = useApp();
    const { modalTiers, setModalTiers, setModalTier } = useModals();

    const handleEditClick = tier => {
        setTier(tier);
        setModalTier(true);
    }

    const handleChangeModalTier = () => {
        setTier(null);
        setModalTier(true);
    }

    const handleDeleteClick = id => deleteTier(id);

    const handleClose = () => setModalTiers(false);

    return (
        <Modal open={modalTiers} onClose={handleClose}>
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
                <Typography variant="h6">Listado de Tiers</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleChangeModalTier}
                    sx={{ alignSelf: 'flex-start' }}
                >Agregar Tier
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
                    {tiers?.map(tier => (
                        <Box
                            key={tier.id}
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
                                    {tier.name}
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={() => handleEditClick(tier)}><EditIcon sx={{ color: '#7C38CD' }} /></IconButton>
                                <IconButton onClick={() => handleDeleteClick(tier.id)} ><DeleteIcon sx={{ color: '#FF6B6B' }} /> </IconButton>
                            </Box>
                        </Box>
                    ))}
                </List>

                <AddTierModal />
            </Box>
        </Modal>
    );
}
