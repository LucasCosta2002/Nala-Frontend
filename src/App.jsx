import { useEffect, useMemo } from 'react';
import { ReactFlow, Background, useNodesState, useEdgesState, Controls } from '@xyflow/react';
import { AppBar, Toolbar, Typography, Container, Box, Paper, Button, Stack } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import '@xyflow/react/dist/style.css';
import useApp from './Hooks/useApp';
import DivisionsModal from './Components/divisions/DivisionsModal';
import PositionsModal from './Components/positions/PositionsModal';
import EmployeesModal from './Components/employees/EmployeesModal';
import PositionNode from './Components/positions/PositionNode';
import useModals from './Hooks/useModals';
import AddPositionModal from './Components/positions/AddPositionModal';
import TierNode from './Components/tiers/TierNode';
import TiersModal from './Components/tiers/TiersModal';

const App = () => {
    const { tiers, positions } = useApp();

    const {
        modalTiers, setModalTiers,
        modalPositions, setModalPositions,
        modalDivisions, setModalDivisions,
        modalEmployees, setModalEmployees,
    } = useModals();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({ position: PositionNode, tier: TierNode }), []);

    useEffect(() => {
        if (tiers.length === 0 || positions.length === 0) return;

        const tierSpacingY = 565;
        const nodeSpacingX = 1;

        const tierGroups = tiers.map((tier, index) => ({
            ...tier,
            y: tier.y ?? index * tierSpacingY + 1300,
            positions: positions.filter(pos => pos.tierId === tier.id),
        }));

        const formattedNodes = [];
        const nodeMap = new Map();

        tierGroups.forEach((tierGroup) => {
            tierGroup.positions.forEach((pos, posIndex) => {
                const parentPos = positions.find(p => p.id === pos.parentId);
                let calculatedX = posIndex * nodeSpacingX + 100;
                let calculatedY = tierGroup.y + (pos.y || 0);

                if (parentPos) {
                    const parentNode = nodeMap.get(parentPos.id);
                    if (parentNode) {
                        calculatedX = parentNode.position.x + nodeSpacingX;
                        calculatedY = parentNode.position.y + 500;
                    }
                }

                const newNode = {
                    id: pos.id,
                    type: "position",
                    draggable: true,
                    position: { x: calculatedX, y: calculatedY },
                    data: { label: pos.name, position: pos },
                };

                formattedNodes.push(newNode);
                nodeMap.set(pos.id, newNode);
            });
        });

        const containerWidth = window.innerWidth - 100;

        const formattedTiers = tiers.map((tier, index) => ({
            id: `tier-${tier.id}`,
            type: "default",
            draggable: false,
            position: { x: 0, y: tier.y ?? index * tierSpacingY + 80 },
            data: { label: tier.name, width: containerWidth },
            style: {
                width: "100%",
                height: 550,
                backgroundColor: "rgba(124, 56, 205, 0.15)",
                borderRadius: 12,
                border: "2px solid rgba(124, 56, 205, 0.5)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "20px",
                padding: "20px 30px",
                textAlign: "center"
            }
        }));

        const formattedEdges = positions
            .filter(pos => pos.parentId)
            .map(pos => ({
                id: `edge-${pos.parentId}-${pos.id}`,
                source: pos.parentId,
                target: pos.id,
                type: "default",
                style: { strokeWidth: 2 },
            }));

        setNodes([...formattedTiers, ...formattedNodes]);
        setEdges(formattedEdges);
    }, [tiers, positions]);

    return (
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
                    <Stack direction="row" sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Button variant="contained" onClick={() => setModalTiers(!modalTiers)}>Tiers</Button>
                        <Button variant="contained" onClick={() => setModalDivisions(!modalDivisions)}>Divisiones</Button>
                        <Button variant="contained" onClick={() => setModalPositions(!modalPositions)}>Posiciones</Button>
                        <Button variant="contained" onClick={() => setModalEmployees(!modalEmployees)}>Empleados</Button>
                    </Stack>

                    <div style={{ height: '70vh', border: '1px solid #E0E0E0', borderRadius: '8px' }}>
                        <ReactFlow
                            nodes={nodes}
                            nodeTypes={nodeTypes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            fitView
                            connectionLineStyle={{ strokeWidth: 2 }}
                            defaultEdgeOptions={{ animated: true }}
                            snapToGrid={true}
                            snapGrid={[30, 30]}
                        >
                            <Background gap={2} size={1} color='#e1e1e1'/>
                            <Controls />
                        </ReactFlow>
                    </div>
                </Paper>
            </Container>

            <TiersModal />
            <DivisionsModal />
            <PositionsModal />
            <EmployeesModal />
            <AddPositionModal />
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </Box>
    );
};

export default App;