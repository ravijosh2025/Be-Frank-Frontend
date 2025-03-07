import { getUserRole,getToken } from "./authHelpers";

const Protectroute=({children})=>{
    const token = getToken();
    const role = getUserRole();
    if (token && role.toLowerCase() === "admin") {
        return children;
    }
}

export default Protectroute