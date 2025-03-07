export const getToken=()=>{
    const token = localStorage.getItem("token");
    return token ? token : "";
}
export const getUserId=()=>{
    const userId = localStorage.getItem("id");
    return userId ? Number(userId)  : "";
}

export const getUserRole=()=>{
    const userRole = localStorage.getItem("role");
    return userRole ? userRole.toLowerCase() : "";
}