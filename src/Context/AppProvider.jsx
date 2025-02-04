import { createContext, useEffect, useState } from "react";
import api from "../Axios/axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [tiers, setTiers] = useState([]);
    const [tier, setTier] = useState({});
    const [modalTier, setModalTier] = useState(false);

    const [divisions, setDivisions] = useState([]);
    const [division, setDivision] = useState({});
    const [modalDivisions, setModalDivisions] = useState(false);
    const [modalDivision, setModalDivision] = useState(false);

    const [positions, setPositions] = useState([]);
    const [position, setPosition] = useState([]);
    const [modalPositions, setModalPositions] = useState(false);
    const [modalPosition, setModalPosition] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tiersResponse, divisionsResponse, positionsResponse] = await Promise.all([
                    api.get('/tiers'),
                    api.get('/divisions'),
                    api.get('/positions'),
                ]);

                setTiers(tiersResponse.data);
                setDivisions(divisionsResponse.data);
                setPositions(positionsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error al cargar los datos. Inténtalo de nuevo.");
            }
        };
        fetchData();
    }, []);


    // Agregar un nuevo tier
    const addTier = async tierForm => {
        try {
            // Validar si ya existe un tier con el mismo nombre
            if (tiers.some(tier => tier.name.toLowerCase() === tierForm.toLowerCase())) {
                toast.error("Ya existe un Tier con este nombre.");
                return false;
            }

            const { data } = await api.post('/tiers', {name: tierForm});

            setTiers([...tiers, data]);

            toast.success("Tier agregado correctamente.");
            return true;
        } catch (error) {
            console.error("Error adding tier:", error);
            toast.error("Error al agregar el Tier");
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

    // Agregar una nueva posición
    const addPosition = async position => {
        try {
            const { data } = await api.post('/positions', position);

            // Actualizar el estado
            setPositions([...positions, data]);

            // Mostrar mensaje de éxito
            toast.success("Posición agregada correctamente.");
            return true;
        } catch (error) {
            console.error("Error adding position:", error);
            toast.error("Error al agregar la posición. Inténtalo de nuevo.");
        }
    };

    // Actualizar una posición
    const updatePosition = async divisionForm => {
        try {
            const { id, ...updatedData } = divisionForm;

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
            await api.delete(`/positions/${id}`);

            setPositions(positions.filter(position => position.id !== id));
            toast.success("Posicion eliminada correctamente.");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar la Posicion");
        }
    }

    return (
        <AppContext.Provider
            value={{
                tier,
                tiers,
                addTier,
                setTier,
                modalTier,
                setModalTier,
                updateTier,
                deleteTier,
                division,
                addDivision,
                setDivision,
                updateDivision,
                deleteDivision,
                modalDivision,
                setModalDivision,
                divisions,
                modalDivisions,
                setModalDivisions,
                positions,
                setPositions,
                addPosition,
                updatePosition,
                modalPositions,
                setModalPositions,
                position,
                setPosition,
                deletePosition,
                modalPosition,
                setModalPosition,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider };
export default AppContext;