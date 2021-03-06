import http from "./httpService";

import jwtDecode from 'jwt-decode'



const apiEndpoint = "/auth";
const tokenKey = 'token'
http.setJwt(getJwt())

export async function login(user) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email: user.email,
        password: user.password
    })
    localStorage.setItem(tokenKey, jwt)
    http.setJwt(getJwt())
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}


export async function logout() {
    localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return  jwtDecode(jwt)
      }
      catch (ex) { return null}
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}


const exportedObject = { 
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}
export default exportedObject