import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Checkbox } from "@mui/material";
import useApp from "../../Hooks/useApp";
import useModals from "../../Hooks/useModals";

const PositionEmployeesModal = () => {
    const { employees, positions, handleChangePositionEmployees, position } = useApp();
    const { modalAddEmployee, setModalAddEmployee } = useModals();

    // Estado para manejar los empleados asignados a la posición actual
    const [assignedEmployeeIds, setAssignedEmployeeIds] = useState(new Set(position?.employeeIds ?? []));

    useEffect(() => {
        setAssignedEmployeeIds(new Set(position?.employeeIds ?? []));
    }, [position]);

    // Verificar si el empleado está asignado a otra posición
    const isAssignedToOtherPosition = (employeeId) => {
        return positions?.some(p => p.id !== position?.id && p.employeeIds?.includes(employeeId));
    };

    // Alternar la asignación del empleado a esta posición
    const handleToggleEmployee = (employeeId) => {
        // No permitir cambios si está en otra posición
        if (isAssignedToOtherPosition(employeeId)) return;

        const newAssignedIds = new Set(assignedEmployeeIds);
        if (newAssignedIds.has(employeeId)) {
            newAssignedIds.delete(employeeId);
        } else {
            newAssignedIds.add(employeeId);
        }

        setAssignedEmployeeIds(newAssignedIds);
        handleChangePositionEmployees(position.id, employeeId);
    };

    const handleClose = () => setModalAddEmployee(false);

    return (
        <Dialog open={modalAddEmployee} onClose={handleClose} fullWidth disableEnforceFocus>
            <DialogTitle>Asignar Empleados a {position?.name}</DialogTitle>
            <DialogContent>
                <List>
                    {employees.length > 0 ? (
                        employees.map((employee) => {
                            const assignedElsewhere = isAssignedToOtherPosition(employee.id);

                            return (
                                <ListItem
                                    key={employee.id}
                                    sx={{
                                        cursor: assignedElsewhere ? "not-allowed" : "pointer",
                                        opacity: assignedElsewhere ? 0.5 : 1,
                                    }}
                                    onClick={() => handleToggleEmployee(employee.id)}
                                >
                                    <Checkbox checked={assignedEmployeeIds.has(employee.id)} disabled={assignedElsewhere} />
                                    <ListItemText primary={employee.name} secondary={employee.email} />
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem>
                            <ListItemText primary="No hay empleados disponibles" />
                        </ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ color: '#7C38CD', borderColor: '#7C38CD', '&:hover': { borderColor: '#6A2EB8' } }}
                >Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PositionEmployeesModal;
