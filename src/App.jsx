import { AppBar, Toolbar, Typography, Container, Box, Paper, Button, Stack } from '@mui/material';
import TierContainer from './Components/tiers/TierContainer';
import useApp from './Hooks/useApp';
import AddTierModal from './Components/tiers/AddTierModal';
import { ToastContainer } from "react-toastify";
import DivisionsModal from './Components/divisions/DivisionsModal';
import PositionsModal from './Components/positions/PositionsModal';
import { DndContext, closestCorners } from '@dnd-kit/core'; // Correct import

const App = () => {
    const {
        tiers,
        positions,
        setPositions,
        modalTier,
        setModalTier,
        modalDivisions,
        setModalDivisions,
        modalPositions,
        setModalPositions,
    } = useApp();

    const handleChangeModalTier = () => setModalTier(!modalTier);
    const handleChangeModalDivisions = () => setModalDivisions(!modalDivisions);
    const handleChangeModaPositions = () => setModalPositions(!modalPositions);

    const handleMovePosition = (id, over) => {
        const activePosition = positions.find(position => position.id === id);
        const overTierId = over ? over.id : activePosition.tierId;

        setPositions((prevPositions) => {
            return prevPositions.map((position) =>
                position.id === id ? { ...position, tierId: overTierId } : position
            );
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            handleMovePosition(active.id, over.id);
        }
    };

    return (
        <DndContext  collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <Box sx={{ flexGrow: 1, backgroundColor: '#F5F5F5', minHeight: '100vh', p: 0 }}>
                <AppBar position="static" sx={{ backgroundColor: '#7C38CD', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                            Organigrama Empresarial
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', backgroundColor: '#FFFFFF' }}>
                        <Stack direction="row" sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleChangeModalTier}
                                sx={{ mb: 2 }}
                            >
                                Nuevo Tier
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleChangeModalDivisions}
                                sx={{ mb: 2 }}
                            >
                                Divisiones
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleChangeModaPositions}
                                sx={{ mb: 2 }}
                            >
                                Nueva Posicion
                            </Button>
                        </Stack>

                        {tiers.map((tier) => {
                            const tierPositions = positions.filter(pos => pos.tierId === tier.id);
                            return (
                                <TierContainer
                                    key={tier.id}
                                    tier={tier}
                                    positions={tierPositions}
                                    onMovePosition={handleMovePosition}
                                />
                            );
                        })}

                    </Paper>
                </Container>

                <AddTierModal
                    open={modalTier}
                    setModalTier={setModalTier}
                />

                <DivisionsModal
                    open={modalDivisions}
                    setModalDivisions={setModalDivisions}
                />

                <PositionsModal
                    open={modalPositions}
                    setModalPositions={setModalPositions}
                />

                <ToastContainer
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                />
            </Box>
        </DndContext>
    );
};

export default App;