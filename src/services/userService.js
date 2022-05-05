import http from "./httpService";


const apiEndpoint = "/users";

export async function register (user) {
    return await http.post(apiEndpoint,{
        name : user.name,
        departmentId : user.departmentId,
        email : user.email,
        password : user.password
    })
}

export async function getUser (userId) {
    return await http.get(`${apiEndpoint}/${userId}`)
}