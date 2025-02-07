import { useContext } from "react";
import AppContext from "../Context/AppProvider";

function useApp() {
    return useContext(AppContext);
}

export default useApp;