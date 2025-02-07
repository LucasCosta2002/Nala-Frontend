import useApp from '../../Hooks/useApp';
import { Modal, Box, Typography, Button, List, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEmployeeModal from './AddEmployeeModal';
import useModals from '../../Hooks/useModals';

const EmployeesModal = ({}) => {

    const { employees, setEmployee, deleteEmployee } = useApp();
    const { modalEmployees, setModalEmployee, setModalEmployees } = useModals();

    const handleEditClick = employee => {
        setEmployee(employee);
        setModalEmployee(true);
    }

    const handleChangeModalEmployee = () => {
        setEmployee(null);
        setModalEmployee(true);
    }

    const handleDeleteClick = id => deleteEmployee(id);

    const handleClose = () => setModalEmployees(false);

    return (
        <Modal open={modalEmployees} onClose={handleClose}>
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
                <Typography variant="h6">Listado de Empleados</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleChangeModalEmployee}
                    sx={{ alignSelf: 'flex-start' }}
                >Agregar Empleado
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
                    {employees?.map(employee => (
                        <Box
                            key={employee.id}
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
                                    {employee.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    {employee.email}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    {employee.country}
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={() => handleEditClick(employee)}>
                                    <EditIcon sx={{ color: '#7C38CD' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteClick(employee.id)} >
                                    <DeleteIcon sx={{ color: '#FF6B6B' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </List>

               <AddEmployeeModal />
            </Box>
        </Modal>
    );
};

export default EmployeesModal;