import { Card, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import useApp from '../../Hooks/useApp';
import PositionEmployeesModal from './PositionEmployeesModal';
import { Handle, Position } from "@xyflow/react";
import useModals from '../../Hooks/useModals';
import AddChildNode from './AddChildNode';

const PositionNode = ({ data }) => {
    const position = data.position;

    const { divisions, deletePosition, setPosition, addPosition, tiers } = useApp();
    const { modalAddEmployee, setModalAddEmployee, modalAddChild, setModalAddChild } = useModals();

    const division = divisions.find(div => div.id === position?.divisionId);
    const employees = position?.employeeIds?.length;

    const handleDeleteClick = id => deletePosition(id);

    const handleChangeModalEmployee = () => {
        setPosition(position);
        setModalAddEmployee(!modalAddEmployee);
    };

    const handleChangeModalChild = (position) => {
        setPosition(position);
        setModalAddChild(!modalAddChild);
    };

    return (
        <>
            <Handle type="target" position={Position.Top} />

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

                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                    Empleados: {employees > 0 ? employees : 'Sin empleados'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton onClick={handleChangeModalEmployee} sx={{ color: '#007BFF' }}>
                        <PeopleIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleChangeModalChild(position)} sx={{ color: '#28a745' }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(position.id)} sx={{ color: '#FF6B6B' }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>

                <PositionEmployeesModal />
            </Card>

            <Handle type="source" position={Position.Bottom} />

            <AddChildNode />
        </>
    );
};

export default PositionNode;
