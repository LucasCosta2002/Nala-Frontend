import { createContext, useState } from "react";

const ModalsContext = createContext();

const ModalsProvider = ({ children }) => {

    const [modalTier, setModalTier] = useState(false);
    const [modalTiers, setModalTiers] = useState(false);

    const [modalDivisions, setModalDivisions] = useState(false);
    const [modalDivision, setModalDivision] = useState(false);

    const [modalPositions, setModalPositions] = useState(false);
    const [modalPosition, setModalPosition] = useState(false);

    const [modalEmployees, setModalEmployees] = useState(false);
    const [modalEmployee, setModalEmployee] = useState(false);

    const [modalAddEmployee, setModalAddEmployee] = useState(false);

    const [modalAddChild, setModalAddChild] = useState(false);

    return (
        <ModalsContext.Provider
            value={{
                modalTier,
                setModalTier,
                modalTiers,
                setModalTiers,
                modalDivision,
                setModalDivision,
                modalDivisions,
                setModalDivisions,
                modalPositions,
                setModalPositions,
                modalPosition,
                setModalPosition,
                modalEmployees,
                setModalEmployees,
                modalEmployee,
                setModalEmployee,
                modalAddEmployee,
                setModalAddEmployee,
                modalAddChild,
                setModalAddChild
            }}
        >
            {children}
        </ModalsContext.Provider>
    )
};

export { ModalsProvider };
export default ModalsContext;