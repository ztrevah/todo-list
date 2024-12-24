import CryptoJS from "crypto-js"
import userService from "../api/user"

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export async function getCurrentUser() {
    const token = localStorage.getItem("token");
    if(!token) return null;
    const { username, password } = JSON.parse(CryptoJS.AES.decrypt(token, SECRET_KEY).toString(CryptoJS.enc.Utf8));
    try {
        const res = await userService.getAll();
        const users = res.data;
        const matchedUser = users?.find(user => user.username === username && user.password === password);
        if(!matchedUser) return null;

        return matchedUser;
    } catch(err) {
        return null;
    }

}

export async function signup(data) {
    const { username } = data;
    try {
        const res = await userService.getAll();
        const users = res.data;
        const matchedUser = users?.find(user => user.username === username);
        
        if(matchedUser) throw new Error("This username has been existed.");

        await userService.post(data);
    } catch(err) {
        throw err;
    }
}

export async function login(inputs) {
    const {username, password} = inputs;
    try {
        const res = await userService.getAll();
        const users = res.data;
        const matchedUser = users?.find(user => user.username === username);
        
        if(!matchedUser) throw new Error("This user has not been registered.");

        if(matchedUser.password !== password) throw new Error("Incorrect password.");

        const token = CryptoJS.AES.encrypt(JSON.stringify(matchedUser), SECRET_KEY);       
        localStorage.setItem("token", token);
    } catch(err) {
        throw err;
    }
}

export function logout () {
    localStorage.removeItem("token");
}

