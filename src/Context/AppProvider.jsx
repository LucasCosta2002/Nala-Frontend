import { createContext, useEffect, useState } from "react";
import api from "../Axios/axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [tier, setTier] = useState({});
    const [tiers, setTiers] = useState([]);

    const [division, setDivision] = useState({});
    const [divisions, setDivisions] = useState([]);

    const [position, setPosition] = useState({});
    const [positions, setPositions] = useState([]);

    const [employee, setEmployee] = useState({});
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tiersResponse, divisionsResponse, positionsResponse, employeesResponse] = await Promise.all([
                    api('/tiers'),
                    api('/divisions'),
                    api('/positions'),
                    api('/employees'),
                ]);

                setTiers(tiersResponse.data);
                setDivisions(divisionsResponse.data);
                setPositions(positionsResponse.data);
                setEmployees(employeesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error al cargar los datos. Inténtalo de nuevo.");
            }
        };
        fetchData();
    }, []);

    // Agregar un nuevo tier
    const addTier = async (tierForm) => {
        try {
            // Verificar si el nombre del tier ya existe
            if (tiers.some(tier => tier.name.toLowerCase() === tierForm.name.toLowerCase())) {
                toast.error("Ya existe un Tier con este nombre.");
                return false;
            }

            const lastTier = tiers.length > 0 ? tiers[tiers.length - 1] : null;
            const newTierY = lastTier ? lastTier.y + 550 : 100;

            const { data } = await api.post('/tiers', { name: tierForm.name, y: newTierY });

            setTiers([...tiers, data]);
            toast.success("Tier agregado correctamente.");
            return true;
        } catch (error) {
            // console.error("Error adding tier:", error);
            toast.error("Error al agregar el Tier");
            return false;
        }
    };

    // Editar un tier
    const updateTier = async tierForm => {
        try {
            const {id, name} = tierForm;

            const currentTier = tiers.find(tier => tier.id === id);

            // Verificar si el nombre ha cambiado
            if (currentTier && currentTier.name.toLowerCase() !== name.toLowerCase()) {
                // Validar que el nuevo nombre no exista en otro tier
                if (tiers.some(tier => tier.id !== id && tier.name.toLowerCase() === name.toLowerCase())) {
                    toast.error("Ya existe un Tier con este nombre.");
                    return false;
                }
            }

            const { data } = await api.put(`/tiers/${id}`, {name} );

            //actualizar el estado con los nuevos datos
            setTiers(tiers.map(tiersState => tiersState.id === data.id ? data : tiersState));
            toast.success("Tier actualizado correctamente.");

            return true;
        } catch (error) {
            console.error( error);
            toast.error("Error al editar el Tier");
        }
    };

    // Eliminar un tier
    const deleteTier = async id => {
        try {
            // comprobar que no tenga posiciones asociadas
            if (positions.find(position => position.tierId.toLowerCase() === id.toLowerCase())) {
                toast.error("No puedes eliminar un tier con posiciones asociadas.");
                return false;
            }

            await api.delete(`/tiers/${id}`);

            // Actualizar el estado
            setTiers(tiers.filter(tier => tier.id !== id));
            toast.success("Tier eliminado correctamente.");
        } catch (error) {
            console.error( error);
            toast.error("Error al eliminar el Tier");
        }
    }

    // Agregar una nueva división
    const addDivision = async divisionForm => {
        try {
            // Validar si ya existe una division con el mismo nombre
            if (divisions.some(division => division.name.toLowerCase() === divisionForm.name.toLowerCase())) {
                toast.error("Ya existe una Division con este nombre.");
                return false;
            }

            const { data } = await api.post('/divisions', divisionForm);

            setDivisions([...divisions, data]);

            toast.success("Division agregadas correctamente.");
            return true;
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Error al agregar la division");
        }
    };

    // Editar una división
    const updateDivision = async divisionForm => {
        try {
            const {id, name, description} = divisionForm;

            const currentDivision = divisions.find(division => division.id === id);

            // Verificar si el nombre ha cambiado
            if (currentDivision && currentDivision.name.toLowerCase() !== name.toLowerCase()) {
                // Validar que el nuevo nombre no exista en otra división
                if (divisions.some(division => division.id !== id && division.name.toLowerCase() === name.toLowerCase())) {
                    toast.error("Ya existe una División con este nombre.");
                    return false;
                }
            }

            const { data } = await api.put(`/divisions/${id}`, {name, description} );

            setDivisions(divisions.map(divisionState => divisionState.id === data.id ? data : divisionState));
            toast.success("Division actualizada correctamente.");

            return true;
        } catch (error) {
            console.error( error);
            toast.error("Error al editar el Tier");
        }
    };

    // Eliminar una division
    const deleteDivision = async id => {
        try {
            // comprobar que no tenga posiciones asociadas
            if (positions.find(position => position.divisionId.toLowerCase() === id.toLowerCase())) {
                toast.error("No puedes eliminar una division con posiciones asociadas.");
                return false;
            }

            await api.delete(`/divisions/${id}`);

            // Actualizar el estado
            setDivisions(divisions.filter(division => division.id !== id));
            toast.success("Division eliminada correctamente.");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar la division");
        }
    }

    const addPosition = async position => {
        try {
            const { data } = await api.post('/positions', position);

            setPositions(prevPositions => {
                const updatedPositions = [...prevPositions, data]; 
                return updatedPositions;
            });

            toast.success("Posición agregada correctamente.");
            return true;
        } catch (error) {
            console.error("Error adding position:", error);
            toast.error("Error al agregar la posición. Inténtalo de nuevo.");
        }
    };

    // Actualizar una posición
    const updatePosition = async positionForm => {
        try {
            const { id, ...updatedData } = positionForm;

            // Validar que no sea su mismo superior
            if (updatedData.parentId === id) {
                toast.error("Una posicion no puede ser su mismo superior.");
                return false;
            }

            const { data } = await api.put(`/positions/${id}`, updatedData);

            setPositions(positions.map(pos => pos.id === id ? data : pos));

            toast.success("Posición actualizada correctamente.");
            return true;
        } catch (error) {
            console.error("Error updating position:", error);
            toast.error("Error al actualizar la posición. Inténtalo de nuevo.");
        }
    };

    // Eliminar una position
    const deletePosition = async id => {
        try {
            // Verificar si la posición es superior de otras (tiene hijos)
            if (positions.some(position => position.parentId?.toLowerCase() === id.toLowerCase())) {
                toast.error("No puedes eliminar una posición que es superior a otras.");
                return;
            }

            // Verificar si la posición tiene empleados
            const positionToDelete = positions.find(position => position.id.toLowerCase() === id.toLowerCase());

            if (positionToDelete?.employeeIds?.length > 0) {
                toast.error("No puedes eliminar una posición que tiene empleados asignados.");
                return;
            }

            await api.delete(`/positions/${id}`);

            setPositions(positions.filter(position => position.id !== id));
            toast.success("Posicion eliminada correctamente.");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar la Posicion");
        }
    }

    // Agregar un nuevo empleado
    const addEmployee = async employeeForm => {
        try {
            // Validar si ya existe un email
            if (employees.some(employee => employee.email.toLowerCase() === employeeForm.email.toLowerCase())) {
                toast.error("Ya existe ese email.");
                return false;
            }

            const { data } = await api.post('/employees', employeeForm);

            setEmployees([...employees, data]);

            toast.success("Empleado agregado correctamente.");
            return true;
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Error al agregar el empleado");
        }
    };

    // Editar un empleado
    const updateEmployee = async employeeForm => {
        try {
            const {id, name, email} = employeeForm;

            const employeEmail = employees.find(employee => employee.id === id);

            // Verificar si el email ha cambiado
            if (employeEmail && employeEmail.name.toLowerCase() !== name.toLowerCase()) {
                // Validar que el nuevo email no exista en otro empleado
                if (employees.some(employe => employe.id !== id && employe.email.toLowerCase() === email.toLowerCase())) {
                    toast.error("Ya existe un email con ese valor.");
                    return false;
                }
            }

            const { data } = await api.put(`/employees/${id}`, employeeForm );

            //actualizar el estado con los nuevos datos
            setEmployees(employees.map(employeeState => employeeState.id === data.id ? data : employeeState));
            toast.success("Empleado actualizado correctamente.");

            return true;
        } catch (error) {
            console.error( error);
            toast.error("Error al editar el empleado");
        }
    };

    // Eliminar un empleado
    const deleteEmployee = async id => {
        try {
            // comprobar que no sea superior de otros
            if (positions.find(position => position.parentId && position.parentId.toLowerCase() === id.toLowerCase())) {
                toast.error("No puedes eliminar una empleado cuando es superior de otros.");
                return false;
            }

            await api.delete(`/employees/${id}`);

            // Actualizar el estado
            setEmployees(employees.filter(employee => employee.id !== id));
            toast.success("Empleado eliminado correctamente.");
        } catch (error) {
            console.error( error);
            toast.error("Error al eliminar el Empleado");
        }
    }

    // asignar o eliminar un empleado de una posicion
    const handleChangePositionEmployees = async (positionId, employeeId) => {
        try {
            const currentPosition = positions.find( p => p.id === positionId);

            if (!currentPosition) return;

            const assignedEmployeeIds = new Set(currentPosition.employeeIds ?? []);

            // Si existe un employeeId en esa posicion, lo eliminamos, sino lo agregamos
            const updatedEmployeeIds = assignedEmployeeIds.has(employeeId)
                ? currentPosition.employeeIds.filter( id => id !== employeeId)
                : [...currentPosition.employeeIds, employeeId];

            await api.patch(`/positions/${positionId}`, { employeeIds: updatedEmployeeIds });

            //Actualiza el estado previo con el nuevo
            setPositions( prev => prev.map( p => (p.id === positionId ? { ...p, employeeIds: updatedEmployeeIds } : p)));
            toast.success("Actualizado correctamente.");
        } catch (error) {
            console.error("Error actualizando empleados en la posición:", error);
            toast.error("Error al realizar esta accion");
        }
    };

    return (
        <AppContext.Provider
            value={{
                tier,
                tiers,
                addTier,
                setTier,
                updateTier,
                deleteTier,
                division,
                addDivision,
                setDivision,
                updateDivision,
                deleteDivision,
                divisions,
                positions,
                setPositions,
                addPosition,
                updatePosition,
                position,
                setPosition,
                deletePosition,
                employees,
                setEmployees,
                addEmployee,
                updateEmployee,
                employee,
                setEmployee,
                deleteEmployee,
                handleChangePositionEmployees
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider };
export default AppContext;