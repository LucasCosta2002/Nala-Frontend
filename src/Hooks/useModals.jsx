import { useContext } from "react";
import ModalsContext from "../Context/ModalsProvider";

function useModals() {
    return useContext(ModalsContext);
}

export default useModals;