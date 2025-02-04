import { useContext } from "react";
import TiersContext from "../Context/AppProvider";

function useApp() {
    return useContext(TiersContext);
}

export default useApp;